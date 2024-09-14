import { defineStore } from "pinia"
import { computed, reactive, ref } from "vue"

const useStore = defineStore("auth", () => {
    const email = ref(null)
    const password = ref(null)
    const user = reactive({})
    const token = ref(null)

    function login() {
        let loginSuccess = false

        if (email.value === "aaa" && password.value === "123") {
            const userData = {
                firstName: "Iqbal",
                lastName: "Mahdi",
                age: 30
            }
            Object.assign(user, userData)
            token.value = "auth-token123"

            loginSuccess = true
        }
        password.value = null

        return loginSuccess
    }
    function logout() {
        try {
            email.value = null
            user.value = null
            token.value = null

            return true
        } catch (error) {
            return false
        }
    }
    const isAuthenticated = computed(() => token.value ? true : false)
    const name = computed(() => isAuthenticated.value ? `${user.firstName} ${user.lastName}` : undefined)

    return { email, password, user, token, login, logout, name, isAuthenticated }
},
{
    persist: true
})

// const useStore = defineStore("auth", {
//     state: () => ({
//         email: null,
//         password: null,
//         user: null,
//         token: null
//     }),
//     actions: {
//         login() {
//             let loginSuccess = false

//             if (this.email === "aaa" && this.password === "123") {
//                 this.user = {
//                     firstName: "Iqbal",
//                     lastName: "Mahdi",
//                     age: 30
//                 }
//                 this.token = "auth-token123"

//                 loginSuccess = true
//             }
//             this.password = null

//             return loginSuccess
//         },
//         logout() {
//             try {
//                 this.email = null
//                 this.user = null
//                 this.token = null
    
//                 return true
//             } catch (error) {
//                 return false
//             }
//         }
//     },
//     getters: {
//         name: state => state.user ? `${state.user.firstName} ${state.user.lastName}` : undefined,
//         isAuthenticated: state => state.token ? true : false
//     }
// })

export default useStore