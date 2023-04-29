<script lang="ts" setup>

</script>

<template>
    <div class="container">

        <div class="links">
            <div class="menu">
                <a @click="$router.back()">
                    <img class="arrow" src="../assets/arrow.svg" alt="Arrow icon">
                </a>
            </div>
            <div class="map">
                <router-link excat to="/">
                    <a class="yellow_btn">Try On Virtually</a>
                </router-link>
            </div>
        </div>

        <div class="images">
            <img class="head_img" src="../assets/green_dress.jpg" alt="Clothing item image">
            <div class="sub_images">
                <img class="sub_img" src="../assets/green_dress_model.jpg" alt="Clothing item image">
                <img class="sub_img" src="../assets/green_dress_side.jpg" alt="Clothing item image">
                <img class="sub_img" src="../assets/green_dress_shoulder.jpg" alt="Clothing item image">
                <img class="sub_img" src="../assets/green_dress_hip.jpg" alt="Clothing item image">
            </div>
        </div>

        <div class="details">

            <div class="item_info">
                <div class="top_info">
                    <p class="item_name">Short silky dress</p>
                    <p class="item_name">&euro;39,95</p>
                </div>

                <div class="stock">
                    <li class="stock-green">Stock</li>
                </div>

                <div>
                    <p class="description">
                        Short dress with high neck and pleated detail with wrap. Long sleeves with cuff.
                    </p>
                </div>

                <div class="item_preference">
                    <div class="dropdown">
                        <p class="label">Color</p>
                        <select id="color" name="color" >
                            <option value="black">Green</option>
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
                <router-link exact to="/">
                    <a class="black_btn">Add to Cart</a>
                </router-link>
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

    .links {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 5rem;
    }
    
    .arrow {
        width: 100%;
        height: 2rem;
        object-fit: cover;
    }

    .images{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .head_img{
        width: 50%;
        height: 100%;
        object-fit: cover;
        padding-bottom: 2rem;
        padding-right: 1.5rem;
    }

    .sub_images{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }

    .sub_img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .details{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 2rem;
    }
    .top_info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 550px;
    }

    .item_name {
        font-size: 2rem;
        font-weight: 400;
        padding-bottom: 2rem;
        text-transform: uppercase;
    }
    .stock{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .stock-green {
        color: #62E457;
        font-weight: 300;
        font-size: 1.2rem
    }

    .yellow_btn{
        background-color: #FBC67A;
        color: black;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.5rem;
        font-weight: 400;
        cursor: pointer;
    }

    .item_preference{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px slategrey;

    }

    .dropdown {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 5rem;
    }

    .label{
        font-size: 1.5rem;
        font-weight: 400;
        padding-bottom: 1rem;
        color: slategrey;
    }

    select {
        color: white;
        background-color: transparent;
        border: none;
        font-size: 1.5rem;
        padding: 0 3em 0 0;
        outline: none;
        padding-bottom: 1rem;
    }

    option {
        color: white;
        background-color: black;
        border: none;
        font-size: 1.5rem;
        margin-right: 2rem;
    }

    .description{
        font-size: 2rem;
        font-weight: 300;
        padding: 2rem 0;
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
        margin: 5rem 0;
    }

</style>