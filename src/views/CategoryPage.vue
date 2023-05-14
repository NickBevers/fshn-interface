<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import Category from '../components/categoryComponent.vue';
</script>

<template>
    <Navigation/>

    <div class="content">
        <Category/>
    </div>


</template>

<style scoped>
    .content {
        margin-top: 10rem;
    }
</style>