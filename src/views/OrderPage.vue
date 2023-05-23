<script lang="ts" setup>
import Navigation from '../components/navComponent.vue'


</script>

<template>
    <Navigation/>
    <div class="content">
        <div class="order_message">
            <h2 class="order_title">Your order has been placed</h2>

            <div class="order_info">
                <p class="order_text">Thank you for your order</p>
                <p class="order_text">Your order number is 
                    <span class="order_number">XXXX</span>
                </p>
            </div>

            <div class="order_checkout">
                <p class="order_text">Please go to the register to checkout</p>
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

    .order_number{
        font-weight: 700;
    }
</style>