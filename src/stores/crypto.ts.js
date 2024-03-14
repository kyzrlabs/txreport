import {defineStore, storeToRefs} from "pinia";
import {BitpandaTXApi} from "../api/bitpanda.js";
import {useGlobalStore} from "./global.js";

export const useCryptoStore = defineStore('crypto', {
    state: () => ({
        _txList: [],
        _filteredList: [],
        _filter: {
            coinSymbol: "",
            savings: null,
            from: null,
            to: null,
            type: null,
            status: null,
        }
    }),
    getters: {
        txList(state) {
            return state._filteredList;
        },

        cryptoSum(state) {
            return state._filteredList.reduce( (acc, tx) => acc + parseFloat(tx.attributes.amount), 0).toFixed(2)
        },

        fiatSum(state) {
            return state._filteredList.reduce( (acc, tx) => acc + parseFloat(tx.attributes.amount_eur), 0).toFixed(2)
        },

        errMsg(state) {
            return state._errorMessage
        },
    },
    actions: {
        async fetchAll() {
            const {token} = storeToRefs(useGlobalStore())
            const globalStore = useGlobalStore()
            globalStore._loading = true
            try {
                const response = await BitpandaTXApi.transaction(token.value)
                    .withCoinSymbol(this._filter.coinSymbol)
                    .withStatus(this._filter.status)
                    .withType(this._filter.type)
                    .withIsSavings(this._filter.savings)
                    .withDateRange(this._filter.from, this._filter.to)
                    .fetch()
                if('status' in response && 'code' in response){
                    globalStore._error = response;
                    return
                }
                let data = response.data
                this._filteredList = data
                this._txList = data
            } catch (e) {
                globalStore._error = e;
            } finally {
                globalStore._loading = false
            }
        },

    }
})