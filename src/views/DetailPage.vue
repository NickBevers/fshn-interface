<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import BackButton from '../components/backButton.vue';
    import selectItemDetail from '../components/selectItemDetail.vue';
    import { ref, Ref, watch, onBeforeMount } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useOrderStore } from '../stores/order';
    import router from '../router';
    import generateClientNumber from '../functions/generateClientNumber';

    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
        router.push("/login");
    }

    generateClientNumber();

    const clothingId = window.location.pathname.split("/")[2];
    
    const orderStore = useOrderStore();
    const { color, size } = storeToRefs(orderStore);

    const emit = defineEmits([ "getDetails" ]);

    const item:Ref = ref('');
    const stock: Ref = ref('');
    const productID: Ref = ref('');

    const productIDs:Ref = ref([ '' ]);
    const storeID = localStorage.getItem("storeID");
    const clientNumber = localStorage.getItem("clientNumber");
    const tempColor: Ref = ref('');
    const tempSize: Ref = ref('');


    onBeforeMount(() => {

        fetch(`${import.meta.env.VITE_API_URL}/clothing/${clothingId}`, {
            
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors"
            
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //console.log(data.data._id);
                item.value = data.data;
                stock.value = item.value.stock;
                productID.value = data.data._id;
                productIDs.value.push(data.data._id);
                orderStore.setProductId({...productIDs.value});
                console.log(productIDs.value);
                tempColor.value = item.value.colors[0];
                tempSize.value = item.value.sizes[0];
            })
            .catch((error) => {
                console.log(error);
            });
    });


    const addToCart = () => {

        emit("getDetails", {
            color: tempColor.value,
            size: tempSize.value
        });

        const data = {
            productId: productID.value,
            storeId: storeID,
            clientNumber: clientNumber,
            color: tempColor.value,
            size: tempSize.value,
            name: item.value.name,
            price: item.value.price,
            image: item.value.headImage
            
        }

        fetch(`${import.meta.env.VITE_API_URL}/carts`, {
            
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
                router.push({ name: "Cart", params: { clientNumber: clientNumber } });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    watch(color, (value) => {
        tempColor.value = value;
    });

    watch(size, (value) => {
        tempSize.value = value;
    });

    function handleClick() {
        router.push({ name: "Mapping", params: { id: clothingId } });
    }


</script>

<template>
    <Navigation/>

    <div class="container">

        <BackButton/>

        <div class="images">
            <div class="sub_images">
                <img class="sub_img" :src="item.modelImage2" alt="Clothing item image">
                <img class="sub_img" :src="item.headImage" alt="Clothing item image">
            </div>
            <img class="head_img" :src="item.modelImage" alt="Clothing item image">
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

                <div>
                    <selectItemDetail/>
                </div>
                    
            </div>

            <div class="item_desc">
                <div class="map">
                    <a @click="handleClick">
                        <a class="white_btn">Try On Virtually</a>
                    </a>
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
        margin-top: 8rem;
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
        margin: 1.5rem 0 0 0;
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
        max-height: 500px;
    }

    .head_img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        padding-bottom: 2rem;
        grid-column: 2/span 2;
        max-height: 500px;
    }

    /* .sub_images{
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 2rem;
        width: 80%;
        height: 100%;
        max-height: 500px;
    } */

    .sub_images{
        display: flex;
        flex-direction: column;
        overflow: hidden;
        gap: 2rem;
        width: 80%;
        height: 100%;
        max-height: 500px;
    }

    .sub_img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        max-height: 250px;
    }

    .details{
        margin-top: 2rem;
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
        margin-bottom: 0.5rem;
        text-transform: capitalize;
    }

    /*li::marker {
        font-size: 2rem;
    }*/
    .stock{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-left: 1rem;
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

    .description{
        font-size: 1.5rem;
        font-weight: 400;
        padding: 1rem 0 1rem 0;
        margin: 0;
        line-height: normal;
    }
</style>