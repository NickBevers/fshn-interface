<script lang="ts" setup>
import Navigation from '../components/navComponent.vue'
// Import the component MappingCanvas
// import MappingCanvas from "../components/mappingCanvas.vue";

import router from '../router'
import generateClientNumber from '../functions/generateClientNumber';

const jwtToken = localStorage.getItem("jwtToken");
if (!jwtToken) {
    router.push("/login");
}

generateClientNumber();

</script>

<template>
    <Navigation/>
    <div class="content">
       
    </div>

</template>

<style scoped>
    .content {
        margin-top: 8rem;
    }

   
</style>