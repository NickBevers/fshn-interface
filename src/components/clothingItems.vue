<script lang="ts" setup>

</script>

<template>
    <div class="container">
        <div class="clothing-item">
            <img class="clothing-item-img" src="../assets/red_blouse.jpg" alt="">
        </div>
        <div class="clothing-item">
            <img class="clothing-item-img" src="../assets/glitter_blouse.jpg" alt="">
        </div>
        <div class="clothing-item">
            <img class="clothing-item-img" src="../assets/pink_top.jpg" alt="">
        </div>
        <div class="clothing-item">
            <img class="clothing-item-img" src="../assets/black_top.jpg" alt="">
        </div>
        <div class="clothing-item">
            <img class="clothing-item-img" src="../assets/flower_top.jpg" alt="">
        </div>
        <div class="clothing-item">
            <img class="clothing-item-img" src="../assets/snake_top.jpg" alt="">
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
    .container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding-left: 100px;
    }

    .clothing-item {
        padding-bottom: 90px;
    }
    .clothing-item-img {
        width: 90%;
    }
</style>