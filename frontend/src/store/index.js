import { createStore } from 'vuex';
import  toyStore  from './toy.store.js';
import userStore from './user.store.js'
import { reviewStore } from './review.store.js'

const store = createStore({
    strict: true,
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        toyStore,
        userStore,
        reviewStore
    },
});

export default store;
