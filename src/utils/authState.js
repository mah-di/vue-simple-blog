import { reactive } from "vue"

const authState = reactive({
    email: null,
    password: null,
    user: null,
    isAuthenticated: false,

    login() {
        if (this.email === "aaa" && this.password === "123") {
            this.password = null
            this.user = {
                username: "_iqbal",
                name: "Iqbal Mahdi",
                age: 30,
            }
            this.isAuthenticated = true
            this.saveState()

            return true
        } else {
            this.password = null
            return false
        }
    },

    logout() {
        try {
            this.email = null
            this.password = null
            this.user = null
            this.isAuthenticated = false
            this.saveState()
            
            return true
        } catch (error) {
            return false
        }
    },

    saveState() {
        localStorage.setItem("auth", JSON.stringify(this))
    },

    loadState() {
        const state = JSON.parse(localStorage.getItem("auth"))
        Object.assign(this, state)
    }
})

authState.loadState()

export default authState