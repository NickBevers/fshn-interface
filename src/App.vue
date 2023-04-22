<script lang="ts" setup>
import Navigation from './components/navMapping.vue'
// Import the component MappingCanvas
import MappingCanvas from "./components/mappingCanvas.vue";
</script>

<template>
    <Navigation/>
    <!-- To implement it in any page, use the component and give it 1 prop (the path to the image it has to map.) -->
    <MappingCanvas :img-src="'/src/assets/tshitTest.png'" />
</template>

<style scoped></style>
