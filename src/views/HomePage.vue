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
        <img src="/src/assets/home_image.jpg" alt="Homescreen Image" class="homescreen__image">
        <p class="homecreen__text">Virtually experience any product by <br> standing in front of the mirror</p>
        <router-link exact to="/explore" class="router__container">
            <a class="btn--white">Start shopping</a>
        </router-link>
    </div>

</template>

<style scoped>
    .content {
        margin-top: 8rem;
        height: 100%;
        min-height: 85vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .homescreen__image {
        width: 100%;
        max-width: 700px;
        height: 100%;
        object-fit: cover;
    }

    .homecreen__text {
        font-size: 2rem;
        font-weight: 600;
        margin: 4rem 0;
        line-height: 1.2;
    }

    .router__container{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .btn--white {
        display: block;
        background-color: #fff;
        font-family: 'Helvetica';
        color: #000;
        padding: 1rem 0;
        width: clamp(500px, 100%, 600px);
        text-align: center;
        font-size: 1.5rem;
        font-weight: 500;
        text-transform: uppercase;
    }

   
</style>