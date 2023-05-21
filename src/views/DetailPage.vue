<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import BackButton from '../components/backButton.vue';
    import { onMounted, ref } from 'vue';

    const clothingId = window.location.pathname.split("/")[2];

    const item:any = ref('');
    const sizes:any = ref([]);
    const colors:any = ref([]);
    const stock = ref('');


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
            //console.log(data);
            item.value = data.data;
            sizes.value = item.value.sizes;
            colors.value = item.value.colors;
            stock.value = item.value.stock;
            console.log(stock.value);
        })
        .catch((error) => {
            console.log(error);
        });
});


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
                        <select id="color" name="color" >
                            <option v-for="(color, key) in colors" :key="key" :value="key">{{ color }}</option>
                        </select>
                    </div>

                    <div class="dropdown">
                        <p class="label">Size</p>
                        <select id="size" name="size" >
                            <option v-for="(size, key) in sizes" :key="key" :value="key">{{ size }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="item_desc">
                <div class="map">
                    <router-link excat to="/">
                        <a class="yellow_btn">Try On Virtually</a>
                    </router-link>
                </div>
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
    }
    .yellow_btn{
        display: block;
        background-color: #FBC67A;
        color: black;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.5rem;
        font-weight: 400;
        cursor: pointer;
        text-align: center;
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
    }

    .stock-red {
        color: #E45757;
        font-weight: 300;
        font-size: 1.2rem;
        text-transform: capitalize;
    }

    .item_preference{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px slategrey;
        margin-bottom: 4rem;

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
        text-transform: capitalize;
    }

    option {
        color: white;
        background-color: black;
        border: none;
        font-size: 1.5rem;
        margin-right: 2rem;
        text-transform: capitalize;
    }

    .description{
        font-size: 1.5rem;
        font-weight: 300;
        padding: 2rem 0;
        line-height: normal;
    }
</style>