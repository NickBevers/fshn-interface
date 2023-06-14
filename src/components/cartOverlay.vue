<script setup lang="ts">

    import router from '../router';
    const emit = defineEmits([ "switchClothing" ]);

    interface ClothingObject {
        name: string,
        image: string,
        color: string,
        productId: string,
        size: string,
        amount: number,
        horizontalOffset: number
    }


    const props = defineProps({
        items: Array<ClothingObject>
    });

    function switchClothing(clothingId: string) {
        router.push({ name: "Mapping", params: { id: clothingId } });
        emit("switchClothing")
    }


</script>

<template>
    <div class="content">
        <div class="items">
            <div v-for="item in props.items" :key="item.productId" class="item">
                <div>
                    <img class="item-img" :src="item.image" alt="">
                </div>

                <div class="item-info">
                    <div>
                        <h3 class="item-title">{{ item.name }}</h3>
                        <p class="preference">Color: {{item.color}}</p>
                    </div>

                    <div class="item-preferences">
                        <a class="black_btn" @click="switchClothing(item.productId)">
                            <p>Try on this item</p>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
    .item {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 4rem;
        margin-bottom: 4rem;
        border-bottom: solid 1px white;
    }

    .item-img{
        width: 80%;
        padding-bottom: 2rem;
    }

    .item-info {
        display: flex;
        height: fit-content;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        margin-left: 2rem;
        padding-bottom: 1rem;
    }

    .item-title {
        text-transform: capitalize;
        font-size: 1.5625rem;
        font-weight: 700;
        margin-bottom: 1rem;
        line-height: 150%;
        margin-top: 0px;
    }

    .preference {
        text-transform: uppercase;
        font-size: 1.2rem;
    }

    .black_btn {
        display: block;
        width: 100%;
        border: solid 1px white;
        background-color: transparent;
        padding: 0rem 2rem;
        font-size: 1.2rem;
        cursor: pointer;
        text-align: center;
        margin: 2rem 0;
        text-transform: uppercase;
    }

</style>