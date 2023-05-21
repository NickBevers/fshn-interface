<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import BackButton from '../components/backButton.vue';

</script>

<template>
    <Navigation/>

    <div class="content">
        <BackButton/>
    </div>


</template>

<style scoped>
    .content {
        margin-top: 10rem;
    }
</style>