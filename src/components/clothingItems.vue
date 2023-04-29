<script lang="ts" setup>

</script>

<template>
    <div class="link">
        <a @click="$router.back()">
            <img class="arrow" src="../assets/arrow.svg" alt="Arrow icon">
        </a>
    </div>

    <div class="container">

        <div class="clothing-item">
            <router-link exact to="/Detail">  
                <img class="clothing-item-img" src="../assets/green_dress.png" alt="">
            </router-link>
        </div>
        <div class="clothing-item">
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
        </div>     
    </div>
</template>

<style scoped>

    .link {
        display: flex;
        justify-content: flex-start;
    }

    .arrow {
        width: 100%;
        height: 2rem;
        object-fit: cover;
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