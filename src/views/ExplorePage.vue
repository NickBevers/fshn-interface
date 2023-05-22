<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';

    import { onMounted, ref, Ref } from 'vue';
    import router from '../router';

    const categories:Ref = ref([]);

    onMounted(() => {

    fetch(`${import.meta.env.VITE_API_URL}/categories/store/COS`, {
        
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
            categories.value = data.data;
        })
        .catch((error) => {
            console.log(error);
        });
    });

    const categoryPage = (name: string) => {
        console.log(name);
        router.push({ name: "Category", params: { name: name } });
    }
</script>

<template>
    <Navigation/>

    <div class="content">

        <div class="primary_category">

            <div v-for="category in categories" :key="category._id" class="category">
                <img class="category_img" :src="category.image" alt="">
                <a class="black_btn" @click="categoryPage(category.name)" > {{category.name}}</a>
            </div>

        </div>

        <div class="collection_section">
            <h2>Summer 2023 collection</h2>

            <div class="collections">
                <div class="collection">
                    <img class="collection_img" src="../assets/collection_1.jpg" alt="">
                    <h3 class="collection_title">Women's linen edit</h3>
                    <a class="cta" href="/">Shop now</a>
                </div>

                <div class="collection">
                    <img class="collection_img" src="../assets/collection_1.jpg" alt="">
                    <h3 class="collection_title">Men's tailoring</h3>
                    <a class="cta" href="/">Shop now</a>
                </div>

                <div class="collection">
                    <img class="collection_img" src="../assets/collection_1.jpg" alt="">
                    <h3 class="collection_title">Summer in the city</h3>
                    <a class="cta" href="/">Shop now</a>
                </div>
            </div>
            
        </div>

        <div class="secondary_category">
            <h2>More to explore</h2>
            <div class="categories">
                <a class="black_btn category_btn" href="*">Women's tops</a>
                <a class="black_btn category_btn" href="*">Women's trousers</a>
                <a class="black_btn category_btn" href="*">Men's shirts</a>
            </div>
        </div>

    </div>


</template>

<style scoped>
    a {
        color: white;
    }
    .content {
        margin-top: 12rem;

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

    .primary_category {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
    }

    .category_img {
        max-width: 100%;
    }

    /*COLLECTION SECTION*/
    .collection_section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
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

    /*SECONDARY CATEGORY*/
    .secondary_category {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
    }

    .categories{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }

    .category_btn {
        padding: 14px 5px;
    }
</style>