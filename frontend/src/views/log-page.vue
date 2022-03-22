<template>
    <section class="log-page">
        <h1>LOGIN/SIGNUP Page</h1>
        <section v-if="loggedinUser">
            <h2>Welcome {{ loggedinUser.fullname }}</h2>
            <button @click="logout">Logout</button>
        </section>
        <form v-else @submit.prevent="login">
            <input type="text" v-model="loginCred.username" placeholder="Enter username" />
            <input type="text" v-model="loginCred.password" placeholder="Enter password" />
            <button>Login</button>
        </form>
        <hr />
        <h4>Signup</h4>
        <form @submit.prevent="signup">
            <input type="text" v-model="signupCred.fullname" placeholder="Enter full name" />
            <input type="text" v-model="signupCred.username" placeholder="Enter username" />
            <input type="password" v-model="signupCred.password" placeholder="Enter password" />
            <button>Signup Now!</button>
        </form>
    </section>
</template>
 
<script>
// import { userService } from '../services/user.service.js';

export default {


    name: 'Login Page',
    data() {
        return {
            loginCred: {username: 'user1', password: '123'},
            signupCred: {username: '', password: '', fullname: ''},
        };
    },
    methods: {
        async login() {
            try {
                await this.$store.dispatch({ type: 'login', userCred: this.loginCred });
                this.$router.push('/');
            } catch (err) {
                console.log(err);
            }
        },
        async logout() {
            try {
                await this.$store.dispatch('logout');
                this.$router.push('/');
                this.username = null;
                this.password = null;
            }
            catch (err) {
                console.log(err);
            }
        },
        async signup() {
            try {
                await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
                this.$router.push('/');
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    created() {

    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedinUser;
        }
    },
    components: {
    }
};
</script>
 
<style>
</style>