import {defineStore} from "pinia";

export const useGlobalStore = defineStore('global', {
    state: () => ({
        _token: "",
        _error: "",
        _loading: false,
    }),
    getters: {
        errorMsg(state) {
          return state._error
        },
        loading(state) {
          return this._loading
        },
        token(state) {
            if (!state._token && window.localStorage.getItem("API_TOKEN")) {
                state._token = window.localStorage.getItem("API_TOKEN")
            }

            return state._token
        }
    },
    actions: {
        setToken(token) {
            this._token = token
            window.localStorage.setItem("API_TOKEN", token)
        },

        clearToken() {
            this._token = ""
            window.localStorage.removeItem("API_TOKEN")
        }
    }
})