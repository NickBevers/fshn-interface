<script lang="ts" setup>
// import the necessary functions and packages
import { onMounted, ref } from "vue";
import router from "../router";


const categories:any = ref([]);


onMounted(async () => {

    fetch(`${import.meta.env.VITE_API_URL}/categories/store/COS`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors"            
        }
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                categories.value = data.data;
            })
            .catch((error) => {
                console.log(error);
            });

    const wrapper = document.querySelector('.wrapper') as HTMLElement;

    let pressed = false;
    let startx = 0;

    wrapper.addEventListener('mousedown', (e) => {
        pressed = true;
        startx = e.clientX - wrapper.offsetLeft;
        wrapper.style.cursor = 'grabbing';

        //console.log(startx);
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

function categoryPage(name:any) {
        console.log(name);
        //split name
        name = name.split(" &");
        console.log(name);
        router.push({ name: "Category", params: { name: name[0] } });
}

</script>

<template>
    <div class="wrapper">
        <div v-for="category in categories" :key="category._id" class="slider">
            <a class="slider" @click="categoryPage(category.name)">  
                <img class="sub" :src="category.image" alt="">
                <p class="title">{{category.name}}</p>
            </a>
        </div>
        <div class="slider">
            <img class="sub" src="../assets/dresses.png" alt="">
            <p class="title">Dresses & jumpsuits</p>
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