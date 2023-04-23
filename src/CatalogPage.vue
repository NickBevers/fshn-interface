<script lang="ts" setup>
    // import components
    import Navigation from './components/navComponent.vue';
    import SubCategory from './components/subCategory.vue';
    import Items from './components/clothingItems.vue';
</script>

<template>
    <Navigation/>

    <div class="content">
        <SubCategory/>
        <div class="items">
            <Items/>
        </div> 
    </div>


</template>

<style scoped>
    .content {
        margin-top: 250px;
    }

    .items {
        margin-top: 100px;
    }
</style>