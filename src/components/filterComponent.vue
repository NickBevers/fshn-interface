<script setup lang="ts">
    import { ref, Ref, watch } from 'vue';
    import VueSimpleRangeSlider from "vue-simple-range-slider";
    import "vue-simple-range-slider/css";

    const props = defineProps({
        price: {
            type: Array<number>,
            required: true
        },
        sort: {
            type: String,
            required: false,
            default: "New"
        },
        size: {
            type: Array<string>,
            required: false
        },
        color: {
            type: Array<string>,
            required: false
        }
    });
    const emits = defineEmits([ "changeFilter" ]);
    const possibleSorts: Ref = ref([ "New", "Lowest price", "Highest price", "Promo" ]); // "Most popular",
    const sizes: Ref = ref([ "Extra small", "Small", "Medium", "Large", "Extra large", "2X large", "3X large" ]);
    const colors: Ref = ref([ "White", "Black", "Grey", "Red", "Blue", "Green" ]);
    const value: Ref = ref([ props.price[0], props.price[1] ]);

    watch(value, (newValue) => {
        emits("changeFilter", [ "price", [ newValue[0], newValue[1] ] ]);
    });

    function handleSorting(sorting: string) {
        emits("changeFilter", [ "sort", sorting ]);
    }

    function handleSize(size: string) {
        emits("changeFilter", [ "size", size ]);
    }

    function handleColor(color: string) {
        emits("changeFilter", [ "color", color ]);
    }

</script>

<template>
    <div class="content">
            <h2 class="content_title">Filter</h2>

            <div class="filters">
                <div class="filter">
                    <h3 class="filter_name">Sort by</h3>
                    <div class="filter_items">
                        <a v-for="sortItem in possibleSorts" :key="sortItem" class="black_btn filter_btn filter_btn--sort" :class="props.sort === sortItem?'sort--active':''" @click="handleSorting(sortItem)">{{ sortItem }}</a>
                    </div>
                </div>

                <div class="filter">
                    <h3 class="filter_name">Size</h3>
                    <div class="filter_items filter_items_size">
                        <a v-for="sizeItem in sizes" :key="sizeItem" class="black_btn filter_btn filter_btn--size" :class="props.size?.includes(sizeItem)?'size--active':''" @click="handleSize(sizeItem)">{{ sizeItem }}</a>
                    </div>
                </div>

                <!-- <div class="filter filter_price">
                    <div class="price">
                        <h3 class="filter_name">Price</h3>
                        <div class="range_values">
                            <p class="range">&euro;{{ props.price[0] }} - &euro;{{ props.price[1] }}</p>
                        </div>
                    </div>

                    <div class="slider">
                        <input oninput type="range" class="min-price" value="5" min="5" max="500" step="5">
                        <input oninputmax type="range" class="max-price" value="100" min="5" max="500" step="5">
                    </div>

                    <div class="slider">
                        <VueSimpleRangeSlider
                            v-model="value"
                            style="width: 100%"
                            :min="props.price[0]"
                            :max="props.price[1]"
                            bar-color="#5C5F66"
                            active-bar-color="#CCCCCC"
                        />
                    </div>

                </div> -->

                <div class="filter">
                    <h3 class="filter_name">Color</h3>
                    <div class="filter_items filter_items_size">
                        <div v-for="colorItem in colors" :key="colorItem" class="color" @click="handleColor(colorItem)">
                            <div class="square" :class="colorItem.toLowerCase()"></div>
                            <span class="color_name" :class="props.color?.includes(colorItem)?'color_name--active':''">{{ colorItem }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<style scoped>
    a {
        color: white;
    }
    .container {
        margin-top: 8rem;
    }

    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #000;
    }

    .content_title{
        color: white;
        margin-bottom: 2rem;
        width: 100%;
        text-align: center;
    }

    .black_btn {
        display: block;
        width: 100%;
        border: solid 1px white;
        background-color: transparent;
        padding: 14px 10px;
        font-size: 1.2rem;
        cursor: pointer;
        text-align: center;
        text-transform: uppercase;
    }

    .filters {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
    }

    .filter {
        width: 100%;
        margin-bottom: 2rem;
    }

    .filter_btn{
        width: fit-content;
    }

    .filter_name {
        font-size: 1.5rem;
        font-weight: 700;
    }

    .filter_items{
        display: flex;
        flex-direction: row;
        justify-content: left;
        flex-wrap: wrap;
    }

    .filter_btn--sort, .filter_btn--size{
        margin: 0 2.5rem 0.8rem 0;
    }

    .filter_btn--size{
        margin-right: 1rem;
    }

    .filter_price{
        width: 100%;
    }

    .sort--active, .size--active{
        background-color: white;
        color: black;
    }

    .price {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    .slider {
        width: 100%;
        height: 10px;
        position: relative;
        margin: 15px 0 1.5rem 0;
    }

    .range_values {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
    }

    input[type=range] {
        appearance: none;
        -webkit-appearance: none;
        width: 100%;
        background: transparent; 
        position: absolute;
        left: 0;
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 15px;
        width: 15px;
        background: white;
        cursor: pointer;
        margin-top: -5px;
        position: relative;
        z-index: 1;
    }

    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        background: #5C5F66;
        border: none;
    }
    .color {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-right: 1rem;
    }

    .color_name {
        width: 100%;
        border: solid 1px white;
        background-color: transparent;
        padding: 14px 0px;
        font-size: 1.2rem;
        cursor: pointer;
        text-align: center;
        text-transform: uppercase;
        color: white;
    }

    .color_name--active {
        background-color: white;
        color: black;
    }

    .square {
        width: 80px;
        height: 52px;
        border: solid 1px white;
        margin: 0 auto;
    }

    .white {
        background-color: white;
    }

    .black {
        background-color: black;
    }

    .grey {
        background-color: #9F9F9F;
    }

    .red {
        background-color: #E21818;
    }

    .blue {
        background-color: #1875E2;
    }

    .green {
        background-color: #0AB91C;
    }
</style>