<script lang="ts" setup>
import Navigation from '../components/navComponent.vue'
import backButton from '../components/backButton.vue'
// Import the component MappingCanvas
import MappingCanvas from "../components/mappingCanvas.vue";

const sweater: {type: string, verticalOffset: number, horizontalOffset: number} = {type: "top" ,verticalOffset: 60, horizontalOffset: 220};
// const pants: {type: string, verticalOffset: number, horizontalOffset: number} = {type: "bottom" ,verticalOffset: 40, horizontalOffset: 50};

</script>

<template>
    <Navigation/>
    <div class="content">
        <div class="links">
            <backButton/>
            <div class="menu">
                <router-link exact to="/cart">
                    <a class="white_btn">Try on the items in your cart</a>
                </router-link>
            </div>
        </div>

        <!-- To implement it in any page, use the component and give it 4 props (the path to the image it has to map, the type of image (top or bottom), the verticalOfsset to the left shoulder and the horizontalOffset to the left shoulder) -->
        <MappingCanvas :img-src="'https://files.nickbevers.be/pull.png'" :place="sweater.type" :vertical-offset="sweater.verticalOffset" :horizontal-offset="sweater.horizontalOffset" />
        <!-- <MappingCanvas :img-src="'https://files.nickbevers.be/pull-S.png'" :place="sweater.type" :vertical-offset="sweater.verticalOffset" :horizontal-offset="sweater.horizontalOffset" /> -->

        <!-- Pants -->
        <!-- <MappingCanvas :img-src="'https://files.nickbevers.be/pants.png'" :place="pants.type" :vertical-offset="pants.verticalOffset" :horizontal-offset="pants.horizontalOffset" /> -->
    </div>

</template>

<style scoped>
    .content {
        margin-top: 10rem;
    }

    .links {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .white_btn{
        display: block;
        background-color: white;
        color: black;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.2rem;
        font-weight: 400;
        cursor: pointer;
        text-align: center;
        text-transform: uppercase;
    }
</style>