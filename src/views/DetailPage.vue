<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import ClothingDetail from '../components/clothingDetail.vue';
</script>

<template>
    <Navigation/>

    <div class="content">
        <ClothingDetail/>
    </div>


</template>

<style scoped>
    .content {
        margin-top: 250px;
    }
</style>