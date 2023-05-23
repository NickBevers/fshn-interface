<script lang="ts" setup>
    import { onMounted, ref, Ref } from 'vue';

    const collections:Ref = ref([]);

    onMounted(() => {

        fetch(`${import.meta.env.VITE_API_URL}/collections/store/646366bd6f26cb68777f8210`, {

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
    });
</script>

<template>
    <h2>Summer 2023 collection</h2>

    <div class="collections">
        <div  v-for="collection in collections" :key="collection._id" class="collection">
            <img class="collection_img" :src="collection.image" alt="">
            <h3 class="collection_title">{{collection.name}}</h3>
            <a class="cta" href="/">Shop now</a>
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