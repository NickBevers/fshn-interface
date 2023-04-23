<script lang="ts" setup>

</script>

<template>
    <div class="container">
        <div class="images">
            <img class="head_img" src="../assets/black_top_model.jpg" alt="clothing image">
            <div class="sub_images">
                <img class="sub_img" src="../assets/black_top_model_back.jpg" alt="">
                <img class="sub_img" src="../assets/black_top_model_front.jpg" alt="">
                <img class="sub_img" src="../assets/black_top.jpg" alt="">
            </div>
        </div>
    </div>

</template>

<style scoped>
    .container{
        padding: 0 40px;
    }

    .images{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .head_img{
        width: 77%;
        height: 100%;
        object-fit: cover;
        padding-bottom: 20px;
    }

    .sub_images{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    .sub_img{
        width: 25%;
        height: 100%;
        object-fit: cover;
    }

</style>