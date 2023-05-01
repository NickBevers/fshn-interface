<script lang="ts" setup>

</script>

<template>

    <div class="categories">

        <div class="category">
            <img class="thumbnail" src="../assets/category_women.png" alt="">
            <h1 class="title">Women</h1>
            <p class="items">380 items</p>
        </div>

        <div class="category">
            <img class="thumbnail" src="../assets/category_men.png" alt="">
            <h1 class="title">Men</h1>
            <p class="items">215 items</p>
        </div>

        <div class="category">
            <img class="thumbnail" src="../assets/category_unisex.png" alt="">
            <h1 class="title">Unisex</h1>
            <p class="items">127 items</p>
        </div>

    </div>

</template>

<style scoped>
    h1 {
        color: white;
        font-size: 5rem;
        font-family: 'Helvetica', sans-serif;
        font-weight: 300;
        left: 0;
        position: absolute;
        text-align: center;
        top: 200px;
        width: 100%
    }

    p {
        color: white;
        font-size: 2rem;
        font-family: 'Helvetica', sans-serif;
        font-weight: 300;
        left: 0;
        position: absolute;
        text-align: center;
        top: 350px;
        width: 100%
    }
    .categories{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .category {
        position: relative;
        text-align: center;
        margin-bottom: 3rem;
    }

    .thumbnail {
        width: 100%;
    }

</style>