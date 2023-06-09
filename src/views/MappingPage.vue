<script lang="ts" setup>
import Navigation from '../components/navComponent.vue'
import backButton from '../components/backButton.vue'
import MappingCanvas from "../components/mappingCanvas.vue";
import cartOverlay from '../components/cartOverlay.vue';
import router from '../router'
import { reactive, Ref, onBeforeMount, ref } from 'vue';
import generateClientNumber from '../functions/generateClientNumber';

const jwtToken = localStorage.getItem("jwtToken");
if (!jwtToken) {
    router.push("/login");
}

const clothingItems: Ref = ref([]);

generateClientNumber();

interface Reactive {
    mappingImage: string,
    clothingType: string,
    verticalOffset: number,
    horizontalOffset: number
}

const clothingToMap: Reactive = reactive({
    mappingImage: "",
    clothingType: "",
    verticalOffset: 0,
    horizontalOffset: 0
});

onBeforeMount(() => {
    const clothingId = window.location.pathname.split("/")[2];
    
    fetch(`${import.meta.env.VITE_API_URL}/clothing/${clothingId}`, {
            
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors"
            
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                clothingToMap.mappingImage = data.data.mappingImage;
                clothingToMap.clothingType = data.data.clothingType;
                clothingToMap.verticalOffset = data.data.verticalOffset;
                clothingToMap.horizontalOffset = data.data.horizontalOffset;

                console.log(clothingToMap);
            })
            .catch((error) => {
                console.log(error);
            });

        const clientNumber = localStorage.getItem("clientNumber");
        fetch(`${import.meta.env.VITE_API_URL}/carts/client/${clientNumber}`, {
            
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors"
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log('clothingItems',data.data);
                clothingItems.value = data.data;             

            })
            .catch((error) => {
                console.log(error);
            });
});

function toggleCartOverlay() {
    const cartOverlay = document.querySelector(".cart__overlay");
    cartOverlay!.classList.toggle("active");
}

// const sweater: {type: string, verticalOffset: number, horizontalOffset: number} = {type: "top" ,verticalOffset: 65, horizontalOffset: 100};
// const pants: {type: string, verticalOffset: number, horizontalOffset: number} = {type: "bottom" ,verticalOffset: 40, horizontalOffset: 50};

</script>

<template>
    <Navigation/>
    <div class="content">
        <div class="links">
            <backButton/>
            <div class="menu">
                <a class="white_btn" @click="toggleCartOverlay">Try on the items in your cart</a>
            </div>
        </div>

        <!-- To implement it in any page, use the component and give it 4 props (the path to the image it has to map, the type of image (top or bottom), the verticalOfsset to the left shoulder and the horizontalOffset to the left shoulder) -->
        <!-- <MappingCanvas :img-src="'https://files.nickbevers.be/pull.png'" :place="sweater.type" :vertical-offset="sweater.verticalOffset" :horizontal-offset="sweater.horizontalOffset" /> -->
        <!-- <MappingCanvas :img-src="'https://files.nickbevers.be/pull-S.png'" :place="sweater.type" :vertical-offset="sweater.verticalOffset" :horizontal-offset="sweater.horizontalOffset" /> -->


        <!-- Shirts -->
        <!-- Men -->
        <!-- <MappingCanvas :img-src="'/src/assets/mapping/men-shirt.png'" :place="'top'" :vertical-offset="30" :horizontal-offset="130" /> -->
        
        <!-- Women -->
        <!-- <MappingCanvas :img-src="'/src/assets/mapping/cropTop.png'" :place="'top'" :vertical-offset="100" :horizontal-offset="15" /> -->
        
        
        
        
        
        <!-- Pants -->
        <!-- <MappingCanvas :img-src="'https://files.nickbevers.be/pants.png'" :place="pants.type" :vertical-offset="pants.verticalOffset" :horizontal-offset="pants.horizontalOffset" /> -->
        <!-- Men -->
        <!-- <MappingCanvas :img-src="'/src/assets/mapping/man-pants.png'" :place="'bottom'" :vertical-offset="20" :horizontal-offset="70" /> -->
        
        <!-- Women -->
        <!-- <MappingCanvas :img-src="'/src/assets/mapping/woman-pants.png'" :place="'bottom'" :vertical-offset="45" :horizontal-offset="100" /> -->
        
        <MappingCanvas :img-src="clothingToMap.mappingImage" :place="clothingToMap.clothingType" :vertical-offset="clothingToMap.verticalOffset" :horizontal-offset="clothingToMap.horizontalOffset" />
        
        <cartOverlay class="cart__overlay" :items="clothingItems" @switch-clothing="toggleCartOverlay"/>
    </div>

</template>

<style scoped>
    .content {
        margin-top: 8rem;
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

    .cart__overlay{
        position: absolute;
        top: 120px;
        left: 0;
        display: none;
        width: 100%;
        height: 100%;
        background-color: #000000;
    }

    .cart__overlay.active {
        display: block;
    }
</style>