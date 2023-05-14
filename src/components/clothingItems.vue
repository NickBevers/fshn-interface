<script lang="ts" setup>
    import { onMounted, ref } from 'vue';

    const clothes:any = ref([]);

    onMounted(() => {

        fetch("https://fshn-backend.onrender.com/api/v1/clothing/category/ dresses", {
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
                clothes.value = data.data;
                //console.log(clothingData.clothingItems);
            })
            .catch((error) => {
                console.log(error);
            });
    });


</script>

<template>
    <div class="links">
        <div class="menu">
            <a class="black_btn back_btn" @click="$router.back()">
                <img class="arrow" src="../assets/arrow.svg" alt="Arrow icon">
                <p>Go Back</p>
            </a>            
        </div>

        <div class="menu">
            <a class="black_btn back_btn" @click="$router.back()">
                <img class="filter" src="../assets/filter_icon.svg" alt="Arrow icon">
                <p>Filters</p>
            </a>
        </div>
    </div>

    <div class="container">

        <div v-for="clothing in clothes" :key="clothing._id" class="clothing-item">
            <router-link exact to="/Detail">  
                <img class="clothing-item-img" v-bind:src="clothing.headImage" alt="">
            </router-link>
            <p class="clothing-item-name">{{ clothing.name }}</p>
        </div>
        <!--<div class="clothing-item">
            <img class="clothing-item-img" src="../assets/red_dress.png" alt="">
        </div>
        <div class="clothing-item">
            <img class="clothing-item-img" src="../assets/water_dress.png" alt="">
        </div>
        <div class="clothing-item">
            <img class="clothing-item-img" src="../assets/black_dress.png" alt="">
        </div>
        <div class="clothing-item">
            <img class="clothing-item-img" src="../assets/color_dress.png" alt="">
        </div>
        <div class="clothing-item">
            <img class="clothing-item-img" src="../assets/pink_dress.png" alt="">
        </div>
        <div class="clothing-item">
            <img class="clothing-item-img" src="../assets/black_piece.jpg" alt="">
        </div>
        <div class="clothing-item">
            <img class="clothing-item-img" src="../assets/white_top.jpg" alt="">
        </div>   -->  
    </div>
</template>

<style scoped>
    a {
        color: white;
    }

    .links {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .black_btn {
        display: block;
        width: 100%;
        border: solid 1px white;
        background-color: transparent;
        padding: 14px 5px;
        font-size: 1.2rem;
        cursor: pointer;
        text-align: center;
        margin: 2rem 0;

    }
    .back_btn {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
        padding: 0em 0.5rem;
    }

    .link {
        display: flex;
        justify-content: flex-start;
    }

    .arrow {
        width: 20%;
    }
    .filter {
        width: 100%;
    }
    .container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding-left: 100px;
        overflow-y: scroll;
        height: 150rem;
    }

    ::-webkit-scrollbar {
        width: 1rem;
    }

    ::-webkit-scrollbar-track {
        background: slategray;
        border-radius: 1rem;
    }

    ::-webkit-scrollbar-thumb {
        background: #cccccc;
        border-radius: 1rem;
    }

    .clothing-item {
        padding-bottom: 90px;
    }
    .clothing-item-img {
        width: 90%;
    }
</style>