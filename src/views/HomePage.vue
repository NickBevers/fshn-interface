<script lang="ts" setup>
import Navigation from '../components/navComponent.vue'
// Import the component MappingCanvas
import MappingCanvas from "../components/mappingCanvas.vue";
</script>

<template>
    <Navigation/>
    <div class="content">
        <!-- To implement it in any page, use the component and give it 1 prop (the path to the image it has to map.) -->
        <MappingCanvas :img-src="'/src/assets/mapping/tshirt-black.png'" />
    </div>

</template>

<style scoped>
    .content {
        margin-top: 10rem;
    }
</style>