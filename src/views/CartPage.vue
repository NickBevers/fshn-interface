<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
</script>

<template>
    <Navigation/>

    <div class="content">
        <h1>Your cart</h1>

        <div class="items">
            <div class="item">
                <img class="item-img" src="../assets/green_dress.png" alt="">
                <div class="item-info">
                    <h2 class="item-title">Short silky dress</h2>
                    <div class="item-preferences">
                        <p class="preference">Color: green</p>
                        <p class="preference">Size: M</p>
                    </div>
                </div>
            </div>

            <div class="item">
                <img class="item-img" src="../assets/water_dress.png" alt="">
                <div class="item-info">
                    <h2 class="item-title">Top with bare shoulders</h2>
                    <div class="item-preferences">
                        <p class="preference">Color: black</p>
                        <p class="preference">Size: M</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="warning"> 
            <h3 class="error">Attention!</h3>
            <p class="warning-text">Your order is placed online, checkout happens at the register</p>
        </div>

        <router-link exact to="/">
                    <a class="black_btn">Place order</a>
                </router-link>

    </div>


</template>

<style scoped>
    a {
        color: white;
    }

    .content {
        margin-top: 12rem;
        padding-bottom: 12rem;
        color: white;
    }

    h1 {
        font-family: 'Helvetica', 'Arial', 'sans-serif';
        font-size: 3rem;
        font-weight: 400;
        margin-bottom: 2rem;
        color: white;
        text-transform: capitalize;
    }

    .item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
        border-bottom: white 1px solid;
    }

    .item-img{
        width: 40%
    }

    .item-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        margin-left: 2rem;
        gap: 6rem;
    }

    .item-title {
        text-transform: uppercase;
        font-size: 4rem;
        font-weight: 700;
        margin-bottom: 1rem;
        line-height: 150%;
    }

    .preference {
        text-transform: capitalize;
        font-size: 2rem;
    }

    .error {
        color: #E45757;
        font-weight: 400;
        font-size: 1.5rem;
        line-height: 2rem;
    }

    .warning-text {
        font-size: 1.5rem;
        line-height: 2rem;
    }

    .black_btn {
        display: block;
        width: 100%;
        border: solid 1px white;
        background-color: transparent;
        padding: 14px 0px;
        font-size: 1.2rem;
        cursor: pointer;
        text-align: center;
        margin: 2rem 0;
        text-transform: capitalize;
    }

</style>