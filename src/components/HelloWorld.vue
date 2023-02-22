<script lang="ts" setup>
    import { defineComponent, ref } from 'vue'
    const props = defineProps<{ name: string }>()
</script>

<template>
    <h1>{{ props.name }}</h1>

</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
