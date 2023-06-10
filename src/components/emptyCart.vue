<script lang="ts" setup>
    import router from '../router';

    const explore = () => {
        router.push("/explore");
    }

</script>

<template>
    <div class="content">
        <div class="order_message">
            <h2 class="order_title">Your cart is empty</h2>

            <div class="order_info">
                <p class="order_text">You have no items in your cart.</p>
                <p class="order_text">Let&apos;s go buy something!</p>
            </div>

            <div class="button">
                <a class="black_btn" @click="explore">Start exploring</a>
            </div>
        </div>

    </div>
</template>

<style scoped>
 .content {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100vh;

    }

    .order_message {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .order_title {
        margin-bottom: 2rem;
    }

    .order_info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
    }

    .order_text {
        margin: 0px
    }

    .button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .black_btn {
        display: block;
        width: 100%;
        border: solid 1px white;
        background-color: transparent;
        padding: 14px 10px;
        font-size: 1.2rem;
        cursor: pointer;
        text-align: center;
        margin: 2rem 0;
        text-transform: uppercase;
        color: white;
    }
</style>