<script lang="ts" setup>

</script>

<template>
    <nav>
        <div class="logo"></div>
        <div class="icons">
            <div class="menu">
                <img src="../assets/menu_icon.svg" alt="Hamburger menu icon">
            </div>
            <div class="cart">
                <img src="../assets/shoppingcart.svg" alt="Shoppingcart icon">
            </div>
        </div>
    </nav>

</template>

<style scoped>
nav {
    background-color: black;
    position: fixed;
    left: 0;
    top: 0;
    height: 200px;
    width: 100%;
    border-bottom: 1px solid white;
}

.logo{
  color: white;
  background-image: url('../assets/FSHN.svg');
  background-size: 130px;
  height: 100px;
  background-repeat: no-repeat;
  background-position: center;
  padding-top: 25px;
}

.icons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
}

</style>