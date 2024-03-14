<script setup>
  import {storeToRefs} from "pinia";
  import {useCryptoStore} from "../stores/crypto.ts.js";
  const cryptoStore = useCryptoStore()
  const {txList, cryptoSum, fiatSum} = storeToRefs(cryptoStore)
</script>

<template>
<div class="h-full">
  <div v-if="txList && txList.length > 0" class="px-4 py-8">
      <table class="w-full table-auto border-collapse border border-slate-700">
        <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>€</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="tx in txList" class="border-t border-slate-700">
          <td>{{ tx.attributes.time.date_iso8601 }}</td>
          <td>{{ tx.attributes.amount }}</td>
          <td>{{ tx.attributes.current_fiat_amount }}</td>
        </tr>
        </tbody>
      </table>
  </div>

  <div v-if="txList && txList.length > 0">
    <div class="flex items-center justify-between">
      <p>Items: {{txList.length}}</p>
      <p>Total Amount: {{cryptoSum}}</p>
      <p>Total Value: {{fiatSum}}€</p>
    </div>
  </div>
</div>
</template>

<style scoped>
/* Ensure th and td are aligned */
.table-auto th, .table-auto td {
  text-align: left;
  padding: 8px;
}

/* Right align for amount and currency */
.table-auto th:nth-child(2), .table-auto th:nth-child(3),
.table-auto td:nth-child(2), .table-auto td:nth-child(3) {
  text-align: right;
}
</style>