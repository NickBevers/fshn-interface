<script lang="ts" setup>
    import { onMounted, ref, Ref } from 'vue';
    import router from '../router';

    const store = ref('');
    const collections:Ref = ref([]);

    onMounted(() => {
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

                localStorage.setItem("storeID", storeID);

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
        fetch(`${import.meta.env.VITE_API_URL}/collections/store/${value}`, {
        
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
            collections.value = data.data;
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const collectionPage = (id: string) => {
        router.push({ name: "Collection", params: { id: id } });
    }
</script>

<template>
    <h2>Summer 2023 collection</h2>

    <div class="collections">
        <div v-for="collection in collections" :key="collection._id" class="collection">
            <a class="pointer" @click="collectionPage(collection._id)">
                <img class="collection_img" :src="collection.image" alt="">
                <h3 class="collection_title">{{collection.name}}</h3>
                <p class="cta">Shop now</p>
            </a>
        </div>
    </div>

</template>

<style scoped>
    a {
        color: white;
    }

    .collections {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;

    }

    .collection_img {
        width: 100%;
    }

    .cta {
        text-decoration: underline;
    }
</style>