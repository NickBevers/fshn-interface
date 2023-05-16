<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import router from '../router';

    const clothes:any = ref([]);

    const categoryName = window.location.pathname.split("/")[2];

    onMounted(() => {

        fetch(`${import.meta.env.VITE_API_URL}/clothing/category/${categoryName}`, {
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
                console.log(data);
                clothes.value = data.data;
            })
            .catch((error) => {
                console.log(error);
            });
    });

    function detailPage(id: string) {
        console.log(id);
        router.push({ name: "Detail", params: { id: id } });
    }


</script>

<template>
    <div class="links">
        <div class="menu">
            <a class="black_btn back_btn" @click="$router.back()">
                <img class="arrow" src="../assets/arrow.svg" alt="Arrow icon">
                <p>Go Back</p>
            </a>            
        </div>

        <div class="menu">
            <a class="black_btn back_btn" @click="$router.back()">
                <img class="filter" src="../assets/filter_icon.svg" alt="Arrow icon">
                <p>Filters</p>
            </a>
        </div>
    </div>

    <div class="container">

        <div v-for="clothing in clothes" :key="clothing._id" class="clothing-item">
            <a @click="detailPage(clothing._id)">  
                <img class="clothing-item-img" :src="clothing.headImage" alt="">
            </a>
        </div> 
    </div>
</template>

<style scoped>
    a {
        color: white;
    }

    .links {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
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
        margin: 2rem 0;

    }
    .back_btn {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
        padding: 0em 0.5rem;
    }

    .link {
        display: flex;
        justify-content: flex-start;
    }

    .arrow {
        width: 20%;
    }
    .filter {
        width: 100%;
    }
    .container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding-left: 100px;
        overflow-y: scroll;
        height: 150rem;
    }

    ::-webkit-scrollbar {
        width: 1rem;
    }

    ::-webkit-scrollbar-track {
        background: slategray;
        border-radius: 1rem;
    }

    ::-webkit-scrollbar-thumb {
        background: #cccccc;
        border-radius: 1rem;
    }

    .clothing-item {
        padding-bottom: 90px;
    }
    .clothing-item-img {
        width: 90%;
    }
</style>