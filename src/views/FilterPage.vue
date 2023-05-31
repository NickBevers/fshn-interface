<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import backButton from '../components/backButton.vue'
</script>

<template>
    <Navigation/>
    <div class="container">
        <backButton/>
        
    </div>

</template>

<style scoped>
    .container {
        margin-top: 8rem;
    }

</style>