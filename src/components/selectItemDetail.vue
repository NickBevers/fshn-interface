<script lang="ts" setup>
    import { onMounted, ref, Ref } from 'vue';
    import { useOrderStore } from '../stores/order';

    const orderStore = useOrderStore();
    const clothingId = window.location.pathname.split("/")[2];

    const item:Ref = ref('');
    const sizes:Ref = ref([]);
    const colors:Ref = ref([]);
    const colorValue:Ref = ref('');
    const sizeValue:Ref = ref('');

    onMounted(() => {

        fetch(`${import.meta.env.VITE_API_URL}/clothing/${clothingId}`, {
            
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
                //console.log(data.data._id);
                item.value = data.data;
                sizes.value = item.value.sizes;
                colors.value = item.value.colors;
                colorValue.value = item.value.colors[0];
                sizeValue.value = item.value.sizes[0];
            })
            .catch((error) => {
                console.log(error);
            });
    });

    const selectColor = (e: Event) => {
        const color = e.target as HTMLInputElement;
        colorValue.value = color.value;

        orderStore.setColor(colorValue.value);
    }

    const selectSize = (e: Event) => {
        const size = e.target as HTMLInputElement;
        sizeValue.value = size.value;

        orderStore.setSize(sizeValue.value);
    }

</script>

<template>

    <div class="item_preference">
        <div class="dropdown">
            <p class="label">Color</p>
            <select id="color" name="color" @click="selectColor" >
                <option v-for="(color, key) in colors" :key="key" :value="color">{{ color }}</option>
            </select>
        </div>

        <div class="dropdown">
            <p class="label">Size</p>
            <select id="size" name="size" @click="selectSize" >
                <option v-for="(size, key) in sizes" :key="key" :value="size">{{ size }}</option>
            </select>
        </div>
    </div>

</template>

<style scoped>
    .item_preference{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4rem;

    }

    .dropdown {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 2.5rem;
        border: solid 1px white;
        padding: 0rem 2rem;
    }

    .label{
        font-size: 1.5rem;
        font-weight: 400;
        color: slategrey;
        text-transform: uppercase;
    }

    select {
        /*Hide default dropdown arrow */
        appearance: none;
        -moz-appearance: none; /* Firefox */
        -webkit-appearance: none; /* Safari and Chrome */
        background-image: url(../assets/dropdown_arrow.svg);
        background-repeat: no-repeat;
        background-position-x: 95%;
        background-position-y: 50%;
        background-size: 1.5rem;
        color: white;
        background-color: transparent;
        border: none;
        font-size: 1.5rem;
        padding: 0 3em 0 0;
        outline: none;
        text-transform: uppercase;
    }

    option {
        color: white;
        background-color: black;
        border: none;
        font-size: 1.5rem;
        margin-right: 2rem;
        text-transform: uppercase;
    }

</style>