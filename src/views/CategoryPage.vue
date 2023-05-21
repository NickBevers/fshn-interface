<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import BackButton from '../components/backButton.vue';

</script>

<template>
    <Navigation/>

    <div class="container">
        <BackButton/>

        <div class="content">
            <h2 class="content_title">Shop by Category</h2>

            <div class="categories">

                 <div class="category">
                    <img class="category_img" src="../assets/collection_1.jpg" alt="">
                    <h3 class="category_title">New arrivals</h3>
                 </div>
                 <div class="category">
                    <img class="category_img" src="../assets/collection_1.jpg" alt="">
                    <h3 class="category_title">Dresses & jumpsuits</h3>
                 </div>
                 <div class="category">
                    <img class="category_img" src="../assets/collection_1.jpg" alt="">
                    <h3 class="category_title">Tops & t-shirts</h3>
                 </div>
                 <div class="category">
                    <img class="category_img" src="../assets/collection_1.jpg" alt="">
                    <h3 class="category_title">Trousers & shorts</h3>
                 </div>
                 <div class="category">
                    <img class="category_img" src="../assets/collection_1.jpg" alt="">
                    <h3 class="category_title">Shirts & blouses</h3>
                 </div>
                 <div class="category">
                    <img class="category_img" src="../assets/collection_1.jpg" alt="">
                    <h3 class="category_title">Skirts</h3>
                 </div>
                 <div class="category">
                    <img class="category_img" src="../assets/collection_1.jpg" alt="">
                    <h3 class="category_title">Knitwear</h3>
                 </div>
                 <div class="category">
                    <img class="category_img" src="../assets/collection_1.jpg" alt="">
                    <h3 class="category_title">Coats & jackets</h3>
                 </div>
                 <div class="category">
                    <img class="category_img" src="../assets/collection_1.jpg" alt="">
                    <h3 class="category_title">Suits & tailoring</h3>
                 </div>

            </div>

        </div>

    </div>


</template>

<style scoped>
    .container {
        margin-top: 8rem;
    }

    /*.content {
        margin: 0 auto;
        width: 90%;
    }*/

    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .content_title{
        margin-bottom: 1.5625rem;
    }
    .categories{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 2rem;
    }

    .category_img{
        width: 100%;
    }

    .category_title {
        font-size: 1rem;
        text-transform: capitalize;
    }
</style>