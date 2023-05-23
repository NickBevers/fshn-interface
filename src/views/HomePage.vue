<script lang="ts" setup>
import Navigation from '../components/navComponent.vue'
import backButton from '../components/backButton.vue'
// Import the component MappingCanvas
import MappingCanvas from "../components/mappingCanvas.vue";

</script>

<template>
    <Navigation/>
    <div class="content">
        <div class="links">
            <backButton/>
            <div class="menu">
                <a class="white_btn">Try on the items in your cart</a>
            </div>
        </div>

        <!-- To implement it in any page, use the component and give it 1 prop (the path to the image it has to map.) -->
        <MappingCanvas :img-src="'/src/assets/mapping/tshirt-black.png'" />
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