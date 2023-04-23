<script lang="ts" setup>

</script>

<template>
    <div class="highlight">
        <h1>NEW</h1>
    </div>

    <div class="collections">
        <h2>Discover our collections</h2>
        <div class="container">
            <div class="collection-item">
                <img class="collection-item-img" src="../assets/explore_collection_1.jpg" alt="">
            </div>
            <div class="collection-item">
                <img class="collection-item-img" src="../assets/explore_collection_2.jpg" alt="">
            </div>
            <div class="collection-item">
                <img class="collection-item-img" src="../assets/explore_collection_3.jpg" alt="">
            </div>
            <div class="collection-item">
                <img class="collection-item-img" src="../assets/explore_collection_4.jpg" alt="">
            </div>      
        </div>
    </div>

</template>

<style scoped>
    @font-face {
        font-family: 'DX-Rigraf';
        src: url('./fonts/DXRigraf-SemiBold.otf') format('truetype');
    }

    h1 {
        font-family: 'DX-Rigraf';
        font-size: 10rem;
        color: white;
        margin-top: 20px;
        margin-right: 150px;
    }

    h2 {
        font-family: 'Helvetica', sans-serif;
        font-size: 3rem;
        color: white;
        font-weight: 300;
        text-transform: capitalize;
    }
    .highlight {
        background-image: url('../assets/new_collection.png');
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 1000px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 200px;
    }

    .collections {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding-left: 100px;
    }

    .collection-item {
        padding-bottom: 90px;
    }
    .collection-item-img {
        width: 90%;
    }
</style>