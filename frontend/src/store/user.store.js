import { userService } from '../services/user.service.js'
import { socketService } from '../services/socket.service'

export default {
    state: {
        loggedinUser: userService.getLoggedinUser(),
        userMsg: ''
    },
    getters: {
        loggedinUser({ loggedinUser }) {
            return loggedinUser
        },
        getUserMsg({ userMsg }) {
            console.log('userMsg', userMsg);
            return userMsg
        }
    },
    mutations: {
        setLoggedinUser(state, { user }) {
            // Yaron: needed this workaround as for score not reactive from birth
            state.loggedinUser = (user) ? { ...user } : null;
        },
        setUserMsg(state, { msg }) {
            state.userMsg = msg
        },
    },
    actions: {
        setUserMsg({ commit }, { msg }) {
            commit({ type: 'setUserMsg', msg })
            setTimeout(() => {
                console.log('3 secs since');
                commit({ type: 'setUserMsg', msg: '' })
            }, 3000)
        },
        async login({ commit, dispatch }, { userCred }) {
            try {
                const user = await userService.login(userCred)
                commit({ type: 'setLoggedinUser', user })
                socketService.emit('watch user', user._id)
                socketService.off('shop changed')
                socketService.on('shop changed', (msg) => {
                    console.log('shop changed', msg);
                    dispatch({ type: 'setUserMsg', msg })
                })
                return user;
            }
            catch (err) {
                console.log('cannot set user', err)
            }
        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'setLoggedinUser', user: null })
            }
            catch (err) {
                console.log('logout failed', err)
            }
        },
        async signup({ commit }, { userCred }) {
            try {
                const user = await userService.signup(userCred)
                commit({ type: 'setLoggedinUser', user })
            }
            catch (err) {
                console.log('signup failed', err)
            }

        }
    }
}