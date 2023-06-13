<script lang="ts" setup>

</script>

<template>
    <div class="links">
        <div class="menu">
            <a class="black_btn back_btn pointer" @click="$router.back()">
                <img class="arrow" src="../assets/arrow.svg" alt="Arrow icon">
                <p>Go Back</p>
            </a>
        </div>
    </div>
</template>


<style scoped>
    a {
        text-decoration: none;
        color: white;
    }
    .links {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .black_btn {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
        padding: 0em 0.5rem;
        width: 100%;
        border: solid 1px white;
        background-color: transparent;
        text-transform: uppercase;
    }

    .arrow {
        width: 20%;
    }
</style>