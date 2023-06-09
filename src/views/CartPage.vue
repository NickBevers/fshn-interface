<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import BackButton from '../components/backButton.vue';
    import Items from '../components/cartItems.vue';

    import generateClientNumber from '../functions/generateClientNumber';

    import { storeToRefs } from "pinia";
    import { useOrderStore } from '../stores/order';

    import {ref, Ref, watch } from 'vue';
    import router from '../router';

    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
        router.push("/login");
    }
    
    generateClientNumber();
    const orderStore = useOrderStore();
    const { productId, amount } = storeToRefs(orderStore);

    const emit = defineEmits([ "getProductID" ]);


    const storeID = localStorage.getItem("storeID");
    const clientNumber = JSON.parse(localStorage.getItem("clientNumber")!)??"";

    const placeOrder = () => {
        emit ("getProductID", tempProductIds.value);

        const data = {
            storeId: storeID,
            productIds: tempProductIds.value,
            clientNumber: clientNumber,
            amount: tempAmount           
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
                if (data.status === "success") {
                    orderPage(clientNumber);
                } else {
                    console.log("error");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const tempProductIds:Ref = ref([]);
    let tempAmount = 0;

    watch(productId, (value) => {
        tempProductIds.value = value;
    });

    watch(amount, (value) => {
        tempAmount = value;
    });

    const orderPage = (clientNumber: number) => {
        router.push({ name: "Order", params: { clientNumber: clientNumber } });
    }

</script>

<template>
    <Navigation/>
    <div class="container">
        <BackButton/>
        <div class="content">
            <div class="title">
                <h2 class="content_title"> Your cart</h2>
            </div>

            <div class="items">
                <Items/>
            </div>

            <div v-if="productId[0].length !> 0" class="warning"> 
                <h3 class="error">Attention!</h3>
                <p class="warning-text">Your order is placed online, checkout happens at the register</p>
            </div>
            <div  v-if="productId[0].length !> 0">
                <a class="black_btn pointer" @click="placeOrder">Place order</a>
            </div>
        </div>
    </div>

</template>

<style scoped>
    a {
        color: white;
    }

    .container {
        margin-top: 8rem;
    }

    .title {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .content_title{
        margin-bottom: 1.5625rem;
        text-transform: capitalize;
        margin-bottom: 4rem;
    }
    .items {
        overflow-y: auto;
        max-height: 70vh;
        min-height: 50vh;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    ::-webkit-scrollbar {
        display: none;  /*Chrome, Safari, Opera*/
    }

    .error {
        color: #E45757;
        font-weight: 400;
        font-size: 1.5rem;
        line-height: 2rem;
        text-transform: uppercase;
        margin: 0;
    }

    .warning-text {
        font-size: 1.2rem;
        line-height: 2rem;
    }

    .black_btn {
        display: block;
        width: 100%;
        border: solid 1px white;
        background-color: transparent;
        padding: 14px 0px;
        font-size: 1.2rem;
        text-align: center;
        margin: 2rem 0;
        text-transform: uppercase;
    }

</style>