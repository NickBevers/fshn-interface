<script lang="ts" setup>
    import { ref, Ref, onBeforeMount } from 'vue';
    import router from '../router';

    const store = ref('');
    const categories:Ref = ref([]);

    onBeforeMount(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
            router.push("/login");
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors" 
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            if (data.status === "success") {
                const storeID = store.value = data.data.storeId;

                getStore(storeID);
            } else {
                console.log(data);
                
            }
        })
        .catch((error) => {
            console.log(error);
        });
    });

    const getStore = (value:Ref) => {
        fetch(`${import.meta.env.VITE_API_URL}/categories/store/${value}`, {
            
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
                //console.log(data);
                categories.value = data.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const categoryPage = (id: string) => {
        //console.log(name);
        router.push({ name: "Category", params: { id: id } });
    }
</script>

<template>

    <div v-for="category in categories" :key="category._id" class="category">
        <a class="pointer" @click="categoryPage(category._id)">
            <img class="category_img" :src="category.image" alt="">
            <p class="black_btn"> {{category.name}} </p>
        </a>
    </div>

</template>

<style scoped>
    a {
        color: white;
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

    .category_img {
        max-width: 100%;
    }
</style>