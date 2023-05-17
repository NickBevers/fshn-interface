<script lang="ts" setup>
import Navigation from '../components/navMapping.vue'
// Import the component MappingCanvas
import MappingCanvas from "../components/mappingCanvas.vue";

const sweater: {type: string, verticalOffset: number, horizontalOffset: number} = {type: "top" ,verticalOffset: 80, horizontalOffset: 220};
// const pants: {type: string, verticalOffset: number, horizontalOffset: number} = {type: "bottom" ,verticalOffset: 60, horizontalOffset: 50};

</script>

<template>
    <Navigation/>
    <div class="content">
        <!-- To implement it in any page, use the component and give it 4 props (the path to the image it has to map, the type of image (top or bottom), the verticalOfsset to the left shoulder and the horizontalOffset to the left shoulder) -->
        <MappingCanvas :img-src="'/src/assets/mapping/pull.png'" :place="sweater.type" :vertical-offset="sweater.verticalOffset" :horizontal-offset="sweater.horizontalOffset" />
        <!-- <MappingCanvas :img-src="'/src/assets/mapping/pull-S.png'" :place="sweater.type" :vertical-offset="sweater.verticalOffset" :horizontal-offset="sweater.horizontalOffset" /> -->

        <!-- Pants -->
        <!-- <MappingCanvas :img-src="'/src/assets/mapping/pants.png'" :place="pants.type" :vertical-offset="pants.verticalOffset" :horizontal-offset="pants.horizontalOffset" /> -->
    </div>

</template>

<style scoped>
    .content {
        margin-top: 250px;
    }
</style>