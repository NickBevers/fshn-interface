<script lang="ts" setup>

</script>

<template>
    <nav>
        <div class="icons">
            <div class="menu">
                <router-link exact to="/Explore">
                    <img class="icon" src="../assets/home.svg" alt="Hamburger menu icon">
                </router-link>
            </div>
            <div class="logo">
                <router-link exact to="/Explore">
                    <img class="icon" src="../assets/FSHN.svg" alt="FSHN logo">
                </router-link>
            </div>
            <div class="cart">
                <router-link exact to="/cart">
                    <img class="icon" src="../assets/shoppingcart.svg" alt="Shoppingcart icon">
                </router-link>                  
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