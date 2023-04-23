<script lang="ts" setup>
// import the necessary functions and packages
import { onMounted } from "vue";


onMounted(async () => {
    const wrapper = document.querySelector('.wrapper') as HTMLElement;

    let pressed = false;
    let startx = 0;

    wrapper.addEventListener('mousedown', (e) => {
        pressed = true;
        startx = e.clientX - wrapper.offsetLeft;
        wrapper.style.cursor = 'grabbing';

        console.log(startx);
    });

    window.addEventListener('mouseup', (e) => {
        pressed = false;
        startx = e.clientX - wrapper.offsetLeft;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mousemove', (e) => {
        if(!pressed) return;

        wrapper.scrollLeft += startx - e.clientX;
    });
});
</script>

<template>
    <div class="wrapper">
        <div class="slider">
            <img class="sub" src="../assets/tops.jpg" alt="">
            <p class="title">Tops</p>
        </div>
        <div class="slider">
            <img class="sub" src="../assets/hoodies.png" alt="">
            <p class="title">Sweatshirts & hoodies</p>
        </div>
        <div class="slider">
            <img class="sub" src="../assets/tops.jpg" alt="">
            <p class="title">Tops</p>
        </div>
        <div class="slider">
            <img class="sub" src="../assets/hoodies.png" alt="">
            <p class="title">Sweatshirts & hoodies</p>
        </div>
        <div class="slider">
            <img class="sub" src="../assets/tops.jpg" alt="">
            <p class="title">Tops</p>
        </div>
        <div class="slider">
            <img class="sub" src="../assets/hoodies.png" alt="">
            <p class="title">Sweatshirts & hoodies</p>
        </div>
        <div class="slider">
            <img class="sub" src="../assets/tops.jpg" alt="">
            <p class="title">Tops</p>
        </div>
        <div class="slider">
            <img class="sub" src="../assets/hoodies.png" alt="">
            <p class="title">Sweatshirts & hoodies</p>
        </div>
    </div>

</template>

<style scoped>
.wrapper{
    width: 100%;
    height: 320px;
    display: flex;
    grid-gap: 1rem;
    flex-wrap: nowrap;
    overflow: auto;
    overflow-y: hidden;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    overflow-x: auto;
    scroll-snap-type: x;
    scroll-behavior: smooth;
}

.wrapper::-webkit-scrollbar {
    display: none; /*Chrome, Safari, Opera*/
}

.slider {
    min-width: calc(25% - 0.5rem);
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center; 
    scroll-snap-align: start;
    overflow: hidden;
    user-select: none;
}

.sub {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 4px;
}

.title {
    color: white;
    text-transform: capitalize;
    font-size: 1.2rem;
}


</style>