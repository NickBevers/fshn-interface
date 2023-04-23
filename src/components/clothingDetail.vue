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

            <div class="item_info">
                <div class="top_info">
                    <p class="item_name">Top with bare shoulders</p>
                    <a class="yellow_btn" href="index.html">
                        Try On 
                        <img class="icon" src="../assets/AR_icon.svg" alt="AR icon">
                    </a>
                </div>

                <div class="item_preference">
                    <div class="dropdown">
                        <p class="label">Color</p>
                        <select id="color" name="color" >
                            <option value="black">Black</option>
                            <option value="white">White</option>
                            <option value="red">Red</option>
                        </select>
                    </div>

                    <div class="dropdown">
                        <p class="label">Size</p>
                        <select id="size" name="size" >
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="item_desc">
                <p class="description">
                    Lorem ipsum dolor sit amet, consectetur odio adipiscing elit.
                    Nunc vulputate libero et velit elit interdum, ac aliquet odio mattis.
                </p>
                <a class="black_btn" href="cart.html">Add to Cart</a>
            </div>
        </div>
    </div>

</template>

<style scoped>
    p {
        color: white;
    }

    a {
        color: white;
    }
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

    .details{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 20px;
        /*padding: 20px 150px;*/
    }
    .top_info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 550px;
    }

    .item_name {
        font-size: 3rem;
        font-weight: 400;
        padding-bottom: 20px;
        text-transform: uppercase;
    }

    .yellow_btn{
        background-color: #FBC67A;
        color: black;
        border: none;
        padding: 10px 20px;
        font-size: 1.5rem;
        font-weight: 400;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    .icon {
        width: 40px;
        height: 40px;
    }

    .item_preference{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-top: 20px;
    }

    .dropdown {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 50px;
    }

    .label{
        font-size: 1.5rem;
        font-weight: 400;
        padding-bottom: 10px;
        color: slategrey;
    }

    select {
        color: white;
        background-color: transparent;
        border: none;
        font-size: 1.5rem;
        padding: 0 3em 0 0;
        outline: none;
        padding-bottom: 10px;
    }

    option {
        color: white;
        background-color: black;
        border: none;
        font-size: 1.5rem;
        margin-right: 20px;
    }

    .item_desc{
        border-top: solid 1px slategrey;
        margin: 0 200px;
    }

    .description{
        font-size: 2rem;
        font-weight: 300;
        padding: 20px 0;
        line-height: normal;
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
        margin-bottom: 50px;
    }

</style>