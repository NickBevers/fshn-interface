<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import BackButton from '../components/backButton.vue';

    import { onMounted, ref, Ref } from 'vue';
    import router from '../router';

    const subcategories:Ref = ref([]);

    const categoryID = window.location.pathname.split("/")[2];

    onMounted(() => {

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
                //console.log(data);
                subcategories.value = data.data;
            })
            .catch((error) => {
                console.log(error);
            });
    });

    const catalogPage = (name: string) => {
        //console.log(name);
        router.push({ name: "Catalog", params: { name: name } });
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
                    <a @click="catalogPage(subcategory.name)">
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

    /*.content {
        margin: 0 auto;
        width: 90%;
    }*/

    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .content_title{
        margin-bottom: 1.5625rem;
    }
    .categories{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 2rem;
    }

    .category_img{
        width: 100%;
    }

    .category_title {
        font-size: 1rem;
        text-transform: capitalize;
    }
</style>