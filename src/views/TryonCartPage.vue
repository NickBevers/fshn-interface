<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import BackButton from '../components/backButton.vue';

</script>

<template>
    <Navigation/>
        <div class="container">
            <div class="links">
                <BackButton/>
                <div class="menu">
                    <a class="white_btn" @click="$router.back()"> 
                        <img class="close" src="../assets/cross.svg" alt="Cross icon">
                        <a>Close</a>
                    </a>
                </div>
            </div>

            <div class="content">
            </div>
        </div>
</template>

<style scoped>
    a {
        color: black;
    }

    .container {
        margin-top: 8rem;
    }   

    .links {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .white_btn{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
        background-color: white;
        color: black;
        border: none;
        padding: 1rem;
        font-size: 1.2rem;
        font-weight: 400;
        cursor: pointer;
        text-align: center;
        text-transform: uppercase;
    }

    .close {
        width: 20%;
    }

</style>