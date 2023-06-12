<script lang="ts" setup>
import Navigation from '../components/navComponent.vue'
import backButton from '../components/backButton.vue'
import MappingCanvas from "../components/mappingCanvas.vue";
import router from '../router'
import { onMounted, ref, Ref } from 'vue';

const jwtToken = localStorage.getItem("jwtToken");

if (!jwtToken) {
    router.push("/login");
}

const clothingToMap:Ref = ref({});

onMounted(() => {
    const clothingId = window.location.pathname.split("/")[2];
    
    fetch(`${import.meta.env.VITE_API_URL}/clothing/${clothingId}`, {
            
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
                console.log(data);
                clothingToMap.value = data.data;
            })
            .catch((error) => {
                console.log(error);
            });
});

// const sweater: {type: string, verticalOffset: number, horizontalOffset: number} = {type: "top" ,verticalOffset: 65, horizontalOffset: 100};
// const pants: {type: string, verticalOffset: number, horizontalOffset: number} = {type: "bottom" ,verticalOffset: 40, horizontalOffset: 50};

</script>

<template>
    <Navigation/>
    <div class="content">
        <div class="links">
            <backButton/>
            <div class="menu">
                <router-link exact to="/tryoncart"> <!--if van maken items in cart show button-->
                    <a class="white_btn">Try on the items in your cart</a>
                </router-link>
            </div>
        </div>

        <!-- To implement it in any page, use the component and give it 4 props (the path to the image it has to map, the type of image (top or bottom), the verticalOfsset to the left shoulder and the horizontalOffset to the left shoulder) -->
        <!-- <MappingCanvas :img-src="'/src/assets/mapping/cropTop.png'" :place="'top'" :vertical-offset="50" :horizontal-offset="15" /> -->
        <!-- <MappingCanvas :img-src="'https://files.nickbevers.be/pull.png'" :place="sweater.type" :vertical-offset="sweater.verticalOffset" :horizontal-offset="sweater.horizontalOffset" /> -->
        <!-- <MappingCanvas :img-src="'https://files.nickbevers.be/pull-S.png'" :place="sweater.type" :vertical-offset="sweater.verticalOffset" :horizontal-offset="sweater.horizontalOffset" /> -->

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
</style>