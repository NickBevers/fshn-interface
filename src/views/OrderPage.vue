<script lang="ts" setup>
    import Navigation from '../components/navComponent.vue'
    import { onMounted, ref, Ref } from 'vue';
    import router from '../router';
    import generateClientNumber from '../functions/generateClientNumber';

    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        router.push("/login");
    }

    const order:Ref = ref("");
    const clientNumber = generateClientNumber();

    onMounted(() => {

        fetch(`${import.meta.env.VITE_API_URL}/orders/client/${clientNumber}`, {
            
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
                //console.log(data.data);
                order.value = data.data;
                //console.log(order.value);

                setTimeout(() => {
                    newClient();
                }, 10000);

            })
            .catch((error) => {
                console.log(error);
            });
    });

    const newClient = () => {
        //generate new client number
        const newClientNumber:number = Math.floor(Math.random() * 1000000000);
        localStorage.setItem("clientNumber", JSON.stringify(newClientNumber));
        router.push("/explore");
    }

</script>

<template>
    <Navigation/>
    <div class="content">
        <div class="order_message">
            <h2 class="order_title">Your order has been placed</h2>

            <div class="order_info">
                <p class="order_text">Thank you for your order</p>
                <p class="order_text">Your order number is 
                    <span class="order_number">{{order.orderNumber}}</span>
                </p>
            </div>

            <div class="order_checkout">
                <p class="order_text">Please go to the register to checkout</p>
            </div>

            <div class="back">
                <a class="home-button" @click="newClient">Go back to home</a>
            </div>
        </div>

    </div>
</template>

<style scoped>
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100vh;

    }

    .order_message {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .order_title {
        margin-bottom: 2rem;
    }

    .order_info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
    }

    .order_text {
        margin: 0px
    }

    .order_number{
        font-weight: 700;
    }

    .back {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-top: 2rem;
    }

    .home-button {
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
        border-radius: 0;
        width: 100%;
    }
</style>