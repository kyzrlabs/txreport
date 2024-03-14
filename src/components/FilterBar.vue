<script setup>
import {ref, watch} from "vue";
import {useCryptoStore} from "../stores/crypto.ts.js";
import {useGlobalStore} from "../stores/global.js";
import {storeToRefs} from "pinia";

const cryptoStore = useCryptoStore()
const {loading} = storeToRefs(useGlobalStore())
const filter = ref({coinSymbol: "All", savings: null, from: "", to: "", type: "All"})

const txTypes = ref(['buy', 'sell', 'deposit', 'withdrawal', 'transfer', 'refund', 'ico'])
const coins = ref(['BTC', 'ETH'])

watch(filter, (newValue, oldValue) => {
  cryptoStore._filter = newValue
}, {deep: true});
</script>

<template>
  <div class="p-5">
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/12">
        <label class="block text-gray-700 text-sm font-bold" for="username">From:</label>
      </div>
      <div class="md:w-11/12">
        <input type="date" v-model="filter.from" class="rounded border-gray-300 shadow-sm">
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/12"><label class="block text-gray-700 text-sm font-bold" for="username">To:</label></div>
      <div class="md:w-11/12"><input type="date" v-model="filter.to" class="rounded border-gray-300 shadow-sm"></div>
    </div>

    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/12">
        <label class="block text-gray-700 text-sm font-bold" for="username">Coin</label>
      </div>
      <div class="md:w-5/12">
        <select v-model="filter.coinSymbol" id="currency" name="currency"
                class="rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <option>All</option>
          <option v-for="type in coins">{{type}}</option>
        </select>
      </div>
      <div class="md:w-1/12">
        <label class="block text-gray-700 text-sm font-bold" for="username">Type</label>
      </div>
      <div class="md:w-5/12">
        <select v-model="filter.type" id="type" name="type"
                class="rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <option>All</option>
          <option v-for="type in txTypes">{{type}}</option>
        </select>
      </div>
    </div>


    <label class="flex items-center space-x-2">
      <input type="checkbox" v-model="filter.savings" class="rounded text-indigo-600 focus:ring-indigo-500">
      <span>Savings Plan</span>
    </label>
    <button :disabled="loading" class="rounded bg-green-700 text-white p-2 bottom-4 absolute right-4"
            @click="cryptoStore.fetchAll()">Fetch Report
    </button>
  </div>
</template>

<style scoped>

</style>