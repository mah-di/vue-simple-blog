import { createStore } from "vuex"
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
    plugins: [ 
        createPersistedState()
    ],
    state: {
        email: null,
        password: null,
        user: null,
        token: null
    },
    mutations: {
        setEmail(state, value) {
            state.email = value
        },
        setPassword(state, value) {
            state.password = value
        },
        setUser(state, payload) {
            state.user =  payload
        },
        setToken(state, value) {
            state.token = value
        }
    },
    actions: {
        setEmail({ commit }, value) {
            commit("setEmail", value)
        },
        setPassword({ commit }, value) {
            commit("setPassword", value)
        },
        setUser({ commit }, payload) {
            commit("setUser", payload)
        },
        setToken({ commit }, value) {
            commit("setToken", value)
        },
        login() {
            if (this.state.email === "aaa" && this.state.password === "123") {
                const payload = {
                    firstName: "Iqbal",
                    lastName: "Mahdi",
                    age: 30
                }
                const token = "auth-token123"
                
                this.dispatch("setUser", payload)
                this.dispatch("setToken", token)
            }

            this.dispatch("setPassword", null)
        },
        logout() {
            this.dispatch("setEmail", null)
            this.dispatch("setUser", null)
            this.dispatch("setToken", null)
        },
    },
    getters: {
        name(state) {
            return state.user ? `${state.user.firstName} ${state.user.lastName}` : undefined
        },
        isAuthenticated(state) {
            return state.token ? true : false
        }
    }
})

export default store