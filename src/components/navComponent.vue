<script lang="ts" setup>
    import router from '../router';

    const clientNumber:number = JSON.parse(localStorage.getItem("clientNumber")!);

    const goToCart = () => {
        router.push(`/cart/${clientNumber}`);
    }
</script>

<template>
    <nav>
        <div class="icons">
            <div class="menu">
                <router-link exact to="/explore">
                    <img class="icon" src="../assets/home.svg" alt="Hamburger menu icon">
                </router-link>
            </div>
            <div class="logo">
                <router-link exact to="/explore" class="logo__link">
                    <img class="icon" src="../assets/FSHN.svg" alt="FSHN logo">
                </router-link>
            </div>
            <div class="cart">
                <a class="pointer" @click="goToCart">
                    <img class="icon" src="../assets/shoppingcart.svg" alt="Shoppingcart icon">
                </a>                  
            </div>
        </div>
    </nav>

</template>

<style scoped>

nav {
    position: fixed;
    left: 0;
    top: 0;
    height: 120px;
    width: 100%;
    border-bottom: 1px solid white;
    background-color: black;
    z-index: 999;
}

.logo__link {
    display: flex;
    justify-content: center;
}

.icons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 25px 40px;
}

.icon {
    width: 80%;
    height: 50px;
}

</style>