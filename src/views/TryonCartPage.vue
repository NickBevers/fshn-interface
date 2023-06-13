<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import BackButton from '../components/backButton.vue';

    import router from '../router'

    import { onMounted, ref, Ref } from 'vue';

    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        router.push("/login");
    }

    const items:Ref = ref([]);

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
                console.log(data.data);
                items.value = data.data;             

            })
            .catch((error) => {
                console.log(error);
            });
    });

    const tryOn = () => {
        router.push("/");
    }

</script>

<template>
    <Navigation/>
        <div class="container">
            <div class="links">
                <BackButton/>
                <div class="menu">
                    <a class="white_btn" @click="$router.back()"> 
                        <img class="close" src="../assets/cross.svg" alt="Cross icon">
                        <a>Close</a>
                    </a>
                </div>
            </div>

            <div class="content">
                <div class="items">
                    <div v-for="item in items" :key="item._id" class="item">
                        <div>
                            <img class="item-img" :src="item.image" alt="">
                        </div>

                        <div class="item-info">
                            <div>
                                <h3 class="item-title">{{ item.name }}</h3>
                                <p class="preference">Color: {{item.color}}</p>
                            </div>

                            <div class="item-preferences">
                                <a class="black_btn" @click="tryOn">
                                    <p>Try on this item</p>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
</template>

<style scoped>
    a {
        color: black;
    }

    .container {
        margin-top: 8rem;
    }   

    .links {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .white_btn{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
        background-color: white;
        color: black;
        border: none;
        padding: 1rem;
        font-size: 1.2rem;
        font-weight: 400;
        cursor: pointer;
        text-align: center;
        text-transform: uppercase;
    }

    .close {
        width: 20%;
    }

    .content {
        margin-top: 4rem;
    }

    .items {
        overflow-y: scroll;
        /* max-height: 40rem; */
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    ::-webkit-scrollbar {
        display: none;  /*Chrome, Safari, Opera*/
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

    .black_btn {
        display: block;
        width: 100%;
        border: solid 1px white;
        background-color: transparent;
        padding: 0.5rem 2rem;
        font-size: 1.2rem;
        cursor: pointer;
        text-align: center;
        margin: 2rem 0;
        text-transform: uppercase;
    }

</style>