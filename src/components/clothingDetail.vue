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

        <div class="details">

            <div class="">
                <p>Top with bare shoulders</p>
                <a href="">
                    Try On <span>AR</span>
                </a>
            </div>

            <div>
                <div>
                    <p>Color</p>
                    <select id="color" name="color" >
                        <option value="black">Black</option>
                        <option value="white">White</option>
                        <option value="red">red</option>
                    </select>

                    <p>Size</p>
                    <select id="size" name="size" >
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                    </select>
                </div>
            </div>

            <hr>

            <div>
                <p class="description">
                    Lorem ipsum dolor sit amet, consectetur odio adipiscing elit.
                    Nunc vulputate libero et velit elit interdum, ac aliquet odio mattis.
                </p>
                <a href="cart.html">Add to Cart</a>
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