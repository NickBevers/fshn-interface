<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import BackButton from '../components/backButton.vue';
</script>

<template>
    <Navigation/>
    <div class="container">
        <BackButton/>
        <div class="content">
            <div class="title">
                <h2 class="content_title"> Your cart</h2>
            </div>


            <div class="items">
                <div class="item">
                    <img class="item-img" src="../assets/collection_1.jpg" alt="">
                    <div class="item-info">
                        <div>
                            <h3 class="item-title">Short silky dress</h3>
                            <p class="preference">&euro;35,95</p>
                        </div>

                        <div class="item-preferences">
                            <p class="preference">Color: green</p>
                            <p class="preference">Size: M</p>
                        </div>
                    </div>
                </div>

                <div class="item">
                    <img class="item-img" src="../assets/collection_1.jpg" alt="">
                    <div class="item-info">
                        <div>
                            <h3 class="item-title">Short silky dress</h3>
                            <p class="preference">&euro;35,95</p>
                        </div>
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

            <router-link exact to="/order">
                <a class="black_btn">Place order</a>
            </router-link>

        </div>
    </div>

</template>

<style scoped>
    a {
        color: white;
    }

    .container {
        margin-top: 8rem;
    }

    .title {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .content_title{
        margin-bottom: 1.5625rem;
        text-transform: capitalize;
        margin-bottom: 4rem;
    }

    .item {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 4rem;
        margin-bottom: 4rem;
        border-bottom: solid 1px white;
    }

    .item-img{
        width: 80%;
        padding-bottom: 2rem;
    }

    .item-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        margin-left: 2rem;
        padding-bottom: 1rem;
    }

    .item-title {
        text-transform: capitalize;
        font-size: 1.5625rem;
        font-weight: 700;
        margin-bottom: 1rem;
        line-height: 150%;
        margin-top: 0px;
    }

    .preference {
        text-transform: uppercase;
        font-size: 1.2rem;
    }

    .error {
        color: #E45757;
        font-weight: 400;
        font-size: 1.5rem;
        line-height: 2rem;
        text-transform: uppercase;
    }

    .warning-text {
        font-size: 1.2rem;
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
        text-transform: uppercase;
    }

</style>