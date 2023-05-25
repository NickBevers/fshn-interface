<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import BackButton from '../components/backButton.vue';

    import { onMounted, ref, Ref } from 'vue';
    import router from '../router';

    const items:Ref = ref([]);
    const productIds:Ref = ref([]);
    const clientNumber = ref("");

    localStorage.removeItem("colorValue");
    localStorage.removeItem("sizeValue");

    const storeID = localStorage.getItem("storeID");

    /*const products:Ref = ref([]);
    const names:Ref = ref([]);*/

    onMounted(() => {

        fetch(`${import.meta.env.VITE_API_URL}/carts/client/1`, {
            
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
                items.value = data.data;
                productIds.value = data.data.map((order:any) => order.productId);
                clientNumber.value = data.data[0].clientNumber;
                //console.log(clientNumber.value);
                

                getProductID(productIds.value);

            })
            .catch((error) => {
                console.log(error);
            });
    });

    const getProductID = (productIds: string | any[]) => {
        //loop over productIds
        for (let i = 0; i < productIds.length; i++) {
            const productId = productIds[i];
            console.log(productId);

            let test = [];
            test = JSON.parse(localStorage.getItem("productIds") || "[]");
            test.push(productId);
            localStorage.setItem("productIds", JSON.stringify(test));
        }
    }
    /*const getProductInfo = (productId: Ref) => {

        fetch(`${import.meta.env.VITE_API_URL}/clothing/${productId}`, {
            
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
                products.value = (data.data);
                names.value = products.value.name;
                console.log(names.value);
            })
            .catch((error) => {
                console.log(error);
            });
    }*/

    const placeOrder = () => {

        const ids = productIds.value = JSON.parse(localStorage.getItem("productIds") || "[]");

        const data = {
            productIds: ids,
            storeId: storeID,
            clientNumber: "1"            
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
                
                orderPage(clientNumber.value);


            })
            .catch((error) => {
                console.log(error);
            });
    }

    const orderPage = (clientNumber: string) => {
        //console.log(name);
        localStorage.removeItem("productIds");
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
                <div v-for="item in items" :key="item._id" class="item">
                    <img class="item-img" :src="item.image" alt="">
                    <div  class="item-info">
                        <div>
                            <h3 class="item-title">{{ item.name }}</h3>
                            <p class="preference">&euro;{{ item.price }}</p>
                        </div>

                        <div class="item-preferences">
                            <p class="preference">Color: {{item.color}}</p>
                            <p class="preference">Size: {{item.size}}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div class="warning"> 
                <h3 class="error">Attention!</h3>
                <p class="warning-text">Your order is placed online, checkout happens at the register</p>
            </div>


                <a class="black_btn" @click="placeOrder">Place order</a>


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

    .item {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 4rem;
        margin-bottom: 4rem;
        border-bottom: solid 1px white;
    }

    .item-img{
        width: 80%;
        padding-bottom: 2rem;
    }

    .item-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        margin-left: 2rem;
        padding-bottom: 1rem;
    }

    .item-title {
        text-transform: capitalize;
        font-size: 1.5625rem;
        font-weight: 700;
        margin-bottom: 1rem;
        line-height: 150%;
        margin-top: 0px;
    }

    .preference {
        text-transform: uppercase;
        font-size: 1.2rem;
    }

    .error {
        color: #E45757;
        font-weight: 400;
        font-size: 1.5rem;
        line-height: 2rem;
        text-transform: uppercase;
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
        cursor: pointer;
        text-align: center;
        margin: 2rem 0;
        text-transform: uppercase;
    }

</style>