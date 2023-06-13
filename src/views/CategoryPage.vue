<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import BackButton from '../components/backButton.vue';
    import generateClientNumber from '../functions/generateClientNumber';
    import { ref, Ref, onBeforeMount } from 'vue';
    import router from '../router';

    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
        router.push("/login");
    }

    generateClientNumber();

    const subcategories:Ref = ref([]);
    const categoryID = window.location.pathname.split("/")[2];

    onBeforeMount(() => {

        fetch(`${import.meta.env.VITE_API_URL}/subCategories/category/${categoryID}`, {
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
                subcategories.value = data.data;
            })
            .catch((error) => {
                console.log(error);
            });
    });

    const catalogPage = (id: string) => {
        //console.log(name);
        router.push({ name: "Catalog", params: { id: id } });
    }


</script>

<template>
    <Navigation/>

    <div class="container">
        <BackButton/>

        <div class="content">
            <h2 class="content_title">Shop by Category</h2>

            <div class="categories">

                <div v-for="subcategory in subcategories" :key="subcategory._id" class="category">
                    <a class="pointer" @click="catalogPage(subcategory._id)">
                        <img class="category_img" :src="subcategory.image" alt="">
                        <h3 class="category_title">{{ subcategory.name }}</h3>
                    </a>
                </div>

            </div>

        </div>

    </div>


</template>

<style scoped>
    .container {
        margin-top: 8rem;
    }

    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;
    }

    .content_title{
        margin-bottom: 1.5625rem;
    }
    .categories{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 2rem;
        overflow-y: scroll;
        /* max-height: 40rem; */
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    ::-webkit-scrollbar {
        display: none;  /*Chrome, Safari, Opera*/
    }

    .category_img{
        width: 100%;
    }

    .category_title {
        font-size: 1rem;
        text-transform: capitalize;
    }
</style>