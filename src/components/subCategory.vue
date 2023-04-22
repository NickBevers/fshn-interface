<script lang="ts" setup>
import {ref, onMounted} from 'vue'

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
        </div>
        <div class="slider">
            <img class="sub" src="../assets/hoodies2.png" alt="">
        </div>
        <div class="slider">
            <img class="sub" src="../assets/tops.jpg" alt="">
        </div>
        <div class="slider">
            <img class="sub" src="../assets/hoodies2.png" alt="">
        </div>
    </div>
</template>

<style scoped>
.wrapper{
    display: flex;
    grid-gap: 1rem;
    max-width: 768px;
    width: 100%;
    overflow-x: auto;
    scroll-snap-type: x;
    scroll-behavior: smooth;
    padding: 1rem;
    margin: 0 auto;
    cursor: grab;
    scrollbar-width: none;
}

.wrapper::-webkit-scrollbar {
    display: none;
}

.slider {
    min-width: calc(50% - .5rem);
    aspect-ratio: 1/1;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center; /*Moet start zijn*/
    scroll-snap-align: start;
    overflow: hidden;
    user-select: none;
}
.sub{
    width: 50%;
    object-fit: fill;
}

</style>