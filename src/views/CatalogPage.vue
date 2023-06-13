<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import BackButton from '../components/backButton.vue';
    import filterComponent from '../components/filterComponent.vue';

    import { ref, Ref, onBeforeMount } from 'vue';
    import router from '../router';

    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        router.push("/login");
    }

    const clothes:Ref = ref([]);
    const name = ref("");
    const minPrice: Ref<number> = ref(0);
    const maxPrice: Ref<number> = ref(0);
    const subcategoryID = window.location.pathname.split("/")[2];
    const filter: Ref = ref({});

    onBeforeMount(() => {
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
                // console.log(data);
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
            
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                clothes.value = data.data;

                // calculate the min and max price
                const prices = clothes.value.map((clothing: { price: number; }) => clothing.price);
                minPrice.value = Math.min(...prices);
                maxPrice.value = Math.max(...prices);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    function detailPage(id: string) {
        //console.log(id);
        router.push({ name: "Detail", params: { id: id } });
    }

    function toggleFiltering() {
        // show filtering options to user
        document.querySelector(".filtering__overlay")!.classList.toggle("active");
    }

    function handleFilterChange(data: Array<string|number|Array<string|number>>) {
        // let temp;
        if (data[0] === "price") {
            // temp = data[1] as Array<number>;
        }

        switch(data[0]) {
            // case "price":
            //     filter.value = {
            //         ...filter.value,
            //         price: {
            //             min: temp![0],
            //             max: temp![1]
            //         }
            //     }
            //     break;
            case "size":
                if (filter.value.sizes) {
                    if (filter.value.sizes.includes(data[1])) {
                        filter.value.sizes = filter.value.sizes.filter((size: string) => size !== data[1]);
                        if (filter.value.sizes.length === 0) {
                            delete filter.value.sizes;
                        }
                    } else {
                        filter.value.sizes.push(data[1]);
                    }
                } else {
                    filter.value.sizes = [ data[1] ];
                }

                break;
            case "color":
                if (filter.value.colors) {
                    if (filter.value.colors.includes(data[1])) {
                        filter.value.colors = filter.value.colors.filter((color: string) => color !== data[1]);
                        if (filter.value.colors.length === 0) {
                            delete filter.value.colors;
                        }

                    } else {
                        filter.value.color.push(data[1]);
                    }
                } else {
                    filter.value.colors = [ data[1] ];
                }
                break;
                
            case "sort":
                filter.value = {
                    ...filter.value,
                    sort: data[1]
                }
                break;
        }

        console.log(filter.value);
        console.log(JSON.stringify(filter.value));

        // fetch new data based on filter
        // fetch(`${import.meta.env.VITE_API_URL}/clothing/subcategory/${subcategoryID}`, {
        fetch(`localhost:3000/api/v1/clothing/subcategory/${subcategoryID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            },
            mode: "cors",
            body: JSON.stringify(filter.value)
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                clothes.value = data.data;

                // calculate the min and max price
                const prices = clothes.value.map((clothing: { price: number; }) => clothing.price);
                minPrice.value = Math.min(...prices);
                maxPrice.value = Math.max(...prices);
            })
            .catch((error) => {
                console.log(error);
            });
    }
</script>

<template>
    <Navigation/>

    <div class="container">
        <div class="links">
            <BackButton/>

            <div class="filtering__container black_btn back_btn pointer" @click="toggleFiltering">
                <img class="filter" src="../assets/filter_icon.svg" alt="Filtering icon">
                <p>Filters</p>
            </div>
        </div>

        <div class="content">
            <h2 class="content_title">{{ name }}</h2>
            <div class="categories">
                 <div v-for="clothing in clothes" :key="clothing._id" class="category">
                    <a class="pointer" @click="detailPage(clothing._id)">  
                        <img class="category_img" :src="clothing.headImage" alt="">
                        <h3 class="category_title">{{ clothing.name }}</h3>
                    </a>
                 </div>
            </div>

            <filterComponent class="filtering__overlay" :price="[minPrice, maxPrice]" :sort="filter.sort" :color="filter.color" :size="filter.size" @change-filter="handleFilterChange"/>
        </div>
    </div>


</template>

<style scoped>
    .container {
        margin-top: 8rem;
        height: calc(90vh - 120px);
    }

    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        height: 100%;
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
        padding: 0em 1rem;
        border: solid 1px white;
        background-color: transparent;
        text-transform: uppercase;
    }

    .filtering__overlay{
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        width: 100%;
        height: 100%;
    }

    .filtering__overlay.active {
        display: block;
    }

    .filter{
        width: 1.8rem;
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
        max-height: 40rem;
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