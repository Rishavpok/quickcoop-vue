

<template>
  <div
      @click="goToJatak"
      style="max-width: 200px;margin: auto;cursor: pointer"
      class="login-btn btn-black-login" >
     Create Jatak
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";

const router = useRouter();

 function goToJatak() {
   router.push("/ja-tak/create");
 }

</script>