<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import BackButton from '../components/backButton.vue';

    import { onMounted, ref, Ref } from 'vue';
    import router from '../router';

    const clothes:Ref = ref([]);
    const name = ref("");

    const subcategoryID = window.location.pathname.split("/")[2];

    onMounted(() => {

        fetch(`${import.meta.env.VITE_API_URL}/subCategories/${subcategoryID}`, {
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
                name.value = data.data.name;
            })
            .catch((error) => {
                console.log(error);
            });

        fetch(`${import.meta.env.VITE_API_URL}/clothing/subcategory/${subcategoryID}`, {
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
                clothes.value = data.data;
            })
            .catch((error) => {
                console.log(error);
            });
    });

    function detailPage(id: string) {
        //console.log(id);
        router.push({ name: "Detail", params: { id: id } });
    }
</script>

<template>
    <Navigation/>

    <div class="container">
        <div class="links">
            <BackButton/>

            <div class="menu">
                <a class="black_btn back_btn">
                    <img class="filter" src="../assets/filter_icon.svg" alt="Arrow icon">
                    <p>Filters</p>
                </a>
            </div>
        </div>


        <div class="content">
            <h2 class="content_title">{{ name }}</h2>

            <div class="categories">

                 <div v-for="clothing in clothes" :key="clothing._id" class="category">
                    <a @click="detailPage(clothing._id)">  
                        <img class="category_img" :src="clothing.headImage" alt="">
                        <h3 class="category_title">{{ clothing.name }}</h3>
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
    }

    .links {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .black_btn {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
        padding: 0em 0.5rem;
        width: 100%;
        border: solid 1px white;
        background-color: transparent;
        text-transform: uppercase;
    }

    .filter {
        width: 20%;
    }

    .content_title{
        margin-bottom: 1.5625rem;
        text-transform: capitalize;
    }
    .categories{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 2rem;
        overflow-y: scroll;
        max-height: 60rem;
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