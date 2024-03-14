<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid'

import {useGlobalStore} from "./stores/global.js";
import {storeToRefs} from "pinia";
import {ref, watch} from "vue";
import AssetList from "./components/AssetList.vue";
import FilterBar from "./components/FilterBar.vue";

const globalStore = useGlobalStore()
const {errorMsg, loading} = storeToRefs(globalStore)

const {token} = storeToRefs(globalStore)
const apiToken = ref("")
</script>

<template>
  <div class="h-screen overflow-hidden">
<!--    <header class="p-4 flex justify-between items-center">-->
<!--      <img src="/logo.png" style="height: 50px">-->
<!--    </header>-->

    <div class="flex items-center justify-center min-h-screen bg-gray-100" v-if="!token">
      <div class="text-center">
        <h2 class="mb-4">Enter your Bitpanda API Token</h2>
        <div class="inline-flex flex-col gap-2 items-center">
          <input v-model="apiToken" type="text" name="token" id="token" placeholder="Bitpanda API Token"
                 class="rounded border-gray-300 shadow-sm p-2 w-full max-w-xs"/>
          <button class="rounded bg-red-900 text-white p-2 w-full max-w-xs" @click="globalStore.setToken(apiToken)"
                  name="submit" id="submit">Set
          </button>
        </div>
      </div>
    </div>
    <div class="h-screen" v-else>
      <div class="flex flex-wrap items-center gap-2 p-2 bg-gray-200 justify-between">
        <div class="flex items-center gap-2">
          <h1>Your Token: {{ token.substring(0, 6) }}...</h1>
          <button class="rounded p-2" @click="globalStore.clearToken()" name="submit" id="submit">
            <XMarkIcon class="h-6 w-6"></XMarkIcon>
          </button>
        </div>
        <div v-if="loading">lodl</div>
      </div>
      <div v-if="errorMsg">{{ errorMsg }}</div>
      <div class="flex flex-row h-screen">
        <AssetList class="basis-2/3 overflow-scroll h-full"></AssetList>
        <FilterBar class="basis-1/3 bg-gray-100"></FilterBar>
      </div>
    </div>
  </div>
</template>

