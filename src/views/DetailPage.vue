<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import BackButton from '../components/backButton.vue';
    import { onMounted, ref, Ref } from 'vue';

    const clothingId = window.location.pathname.split("/")[2];

    const item:Ref = ref('');
    const sizes:Ref = ref([]);
    const colors:Ref = ref([]);
    const stock = ref('');

    const productID = ref('');
    const storeID = localStorage.getItem("storeID");


    onMounted(() => {

        fetch(`${import.meta.env.VITE_API_URL}/clothing/${clothingId}`, {
            
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
                //console.log(data.data._id);
                item.value = data.data;
                sizes.value = item.value.sizes;
                colors.value = item.value.colors;
                stock.value = item.value.stock;
                productID.value = data.data._id;
                //console.log(productID.value);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    const selectColor = (e: Event) => {
        const color = e.target as HTMLInputElement;
        const colorValue = color.value;
        //console.log(colorValue);

        localStorage.setItem("colorValue", colorValue);
    }

    const selectSize = (e: Event) => {
        const size = e.target as HTMLInputElement;
        const sizeValue = size.value;
        //console.log(sizeValue);

        localStorage.setItem("sizeValue", sizeValue);
    }

    const orderColor = localStorage.getItem("colorValue");
    const orderSize = localStorage.getItem("sizeValue");

    const addToCart = () => {

        const data = {
            productId: productID.value,
            storeId: storeID,
            clientNumber: "1",
            color: orderColor,
            size: orderSize
        }

        fetch(`${import.meta.env.VITE_API_URL}/orders`, {
            
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors",
            body: JSON.stringify(data)
            
        }
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                localStorage.removeItem("colorValue");
                localStorage.removeItem("sizeValue");

            })
            .catch((error) => {
                console.log(error);
            });
    }


</script>

<template>
    <Navigation/>

    <div class="container">

        <BackButton/>

        <div class="images">
            <div class="sub_images">
                <img class="sub_img" src="../assets/green_dress_model.jpg" alt="Clothing item image">
                <img class="sub_img" src="../assets/green_dress_side.jpg" alt="Clothing item image">
            </div>
            <img class="head_img" :src="item.headImage" alt="Clothing item image">
        </div>

        <div class="details">

            <div class="item_info">
                <div class="top_info">
                    <p class="item_name">{{item.name}}</p>
                    <p class="item_name">&euro;{{item.price}}</p>
                </div>

                <div class="stock">
                    <li v-if="stock >= '1'"  class="stock-green"> In stock</li>
                    <li v-else-if="stock <= '0'"  class="stock-red"> Out of stock</li>
                </div>

                <div>
                    <p class="description">
                        {{item.description}}
                    </p>
                </div>

                <div class="item_preference">
                    <div class="dropdown">
                        <p class="label">Color</p>
                        <select id="color" name="color" @change="selectColor" >
                            <option v-for="(color, key) in colors" :key="key" :value="color">{{ color }}</option>
                        </select>
                    </div>

                    <div class="dropdown">
                        <p class="label">Size</p>
                        <select id="size" name="size" @change="selectSize" >
                            <option v-for="(size, key) in sizes" :key="key" :value="size">{{ size }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="item_desc">
                <div class="map">
                    <router-link excat to="/">
                        <a class="white_btn">Try On Virtually</a>
                    </router-link>
                </div>

                <a class="black_btn" @click="addToCart" >Add to Cart</a>

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
    .container {
        margin-top: 10rem;
    }

    /*BUTTONS*/

    .black_btn {
        display: block;
        width: 100%;
        border: solid 1px white;
        background-color: transparent;
        padding: 14px 0px;
        font-size: 1.2rem;
        cursor: pointer;
        text-align: center;
        margin: 2rem 0;
        text-transform: uppercase;
    }
    .white_btn{
        display: block;
        background-color: white;
        color: black;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.2rem;
        font-weight: 400;
        cursor: pointer;
        text-align: center;
        text-transform: uppercase;
    }

    .images{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 3rem;
        padding-top: 1rem;
    }

    .head_img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        padding-bottom: 2rem;
        grid-column: 2/span 2;
    }

    .sub_images{
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 2rem;
    }

    .sub_img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .top_info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .item_name {
        font-size: 1.5rem;
        font-weight: 400;
        text-transform: capitalize;
    }

    /*li::marker {
        font-size: 2rem;
    }*/
    .stock{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .stock-green {
        color: #62E457;
        font-weight: 300;
        font-size: 1.2rem;
        text-transform: uppercase;
        font-family: Arial, Helvetica, sans-serif;
    }

    .stock-red {
        color: #E45757;
        font-weight: 300;
        font-size: 1.2rem;
        text-transform: uppercase;
        font-family: Arial, Helvetica, sans-serif;
    }

    .item_preference{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4rem;

    }

    .dropdown {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 2.5rem;
        border: solid 1px white;
        padding: 0rem 2rem;
    }

    .label{
        font-size: 1.5rem;
        font-weight: 400;
        color: slategrey;
        text-transform: uppercase;
    }

    select {
        /*Hide default dropdown arrow */
        appearance: none;
        -moz-appearance: none; /* Firefox */
        -webkit-appearance: none; /* Safari and Chrome */
        background-image: url(../assets/dropdown_arrow.svg);
        background-repeat: no-repeat;
        background-position-x: 95%;
        background-position-y: 50%;
        background-size: 1.5rem;
        color: white;
        background-color: transparent;
        border: none;
        font-size: 1.5rem;
        padding: 0 3em 0 0;
        outline: none;
        text-transform: uppercase;
    }

    option {
        color: white;
        background-color: black;
        border: none;
        font-size: 1.5rem;
        margin-right: 2rem;
        text-transform: uppercase;
    }

    .description{
        font-size: 1.5rem;
        font-weight: 300;
        padding: 2rem 0;
        line-height: normal;
    }
</style>