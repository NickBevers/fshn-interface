<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import BackButton from '../components/backButton.vue';

    import { onMounted, ref, Ref } from 'vue';
    import router from '../router';

    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        router.push("/login");
    }
    
    const collectionClothes:Ref = ref([]);

    const collectionID = window.location.pathname.split("/")[2];
    console.log(collectionID);

    onMounted(() => {

        fetch(`${import.meta.env.VITE_API_URL}/clothing/collection/${collectionID}`, {
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
                collectionClothes.value = data.data;
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
        <BackButton/>
        <div class="content">
            <h2 class="content_title">Shop by Collection</h2>

            <div class="items">

                <div v-for="clothing in collectionClothes" :key="clothing._id" class="item">
                    <a @click="detailPage(clothing._id)">
                        <img class="clothing_img" :src="clothing.headImage" alt="">
                        <h3 class="clothing_title">{{ clothing.name }}</h3>
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

    .content_title{
        margin-bottom: 1.5625rem;
        text-transform: capitalize;
    }
    .items{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 2rem;
        overflow-y: scroll;
        max-height: 40rem;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    ::-webkit-scrollbar {
        display: none;  /*Chrome, Safari, Opera*/
    }

    .clothing_img{
        width: 100%;
    }

    .clothing_title {
        font-size: 1rem;
        text-transform: capitalize;
    }

</style>