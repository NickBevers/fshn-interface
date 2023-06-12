<script lang="ts" setup>
    import { useOrderStore } from '../stores/order';
    import EmptyCart from '../components/emptyCart.vue';

    import { onMounted, ref, Ref } from 'vue';
    import router from '../router';

    const orderStore = useOrderStore();

    const items:Ref = ref([]);
    const productIds:Ref = ref([]);
    const amount:Ref = ref([]); 
    const empty = ref(false);

    const clientNumber:number = JSON.parse(localStorage.getItem("clientNumber")!)??"";

    onMounted(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
            router.push("/login");
            return;
        }
        fetch(`${import.meta.env.VITE_API_URL}/carts/client/${clientNumber}`, {
            
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
                items.value.forEach((element: { productId: string;}) => {
                    productIds.value.push(element.productId);

                });
                //get prices
                items.value.forEach((element: { price: number;}) => {
                    amount.value.push(element.price);
                });    

                //check if cart is empty
                if (items.value.length === 0) {
                    empty.value = true;
                } else {
                    empty.value = false;
                }

                getProductID(productIds.value);
                getPrices(amount.value);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    const getProductID = (productIds: Array<string>) => {
        //loop over productIds
        for (let i = 0; i < productIds.length; i++) {
            orderStore.setProductId(productIds);
        }
    }

    const getPrices = (amount: Array<number>) => {
        let total = 0;
        for (let i = 0; i < amount.length; i++) {
            total += amount[i];
            orderStore.setAmount(total);
        }
    }

    const removeItem = (id: string) => {
        fetch(`${import.meta.env.VITE_API_URL}/carts/${id}`, {
            
            method: "DELETE",
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
                console.log(data);
                router.go(0);
                /*Fixen zodat er geen reload is.  */
            })
            .catch((error) => {
                console.log(error);
            });
    }
</script>

<template>
    <div v-if="empty === true">
        <EmptyCart/>
    </div>
    <div v-for="item in items" v-else-if="empty === false" :key="item._id" class="item">
        <div>
            <img class="item-img" :src="item.image" alt="">
        </div>

        <div class="item-info">
            <div>
                <h3 class="item-title">{{ item.name }}</h3>
                <p class="preference">&euro;{{ item.price }}</p>
            </div>

            <div class="item-preferences">
                <p class="preference">Color: {{item.color}}</p>
                <p class="preference">Size: {{item.size}}</p>
            </div>
        </div>
        <a class="black_btn remove" @click="removeItem(item._id)">
            <p>Delete item</p>
        </a>
    </div>

</template>

<style scoped>
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

    .remove {
        width: 80%;
        margin-top: 0;
    }

</style>