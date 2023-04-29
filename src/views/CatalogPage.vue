<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import Items from '../components/clothingItems.vue';
</script>

<template>
    <Navigation/>

    <div class="content">
        <Items/> 
    </div>


</template>

<style scoped>
    .content {
        margin-top: 250px;
    }
</style>