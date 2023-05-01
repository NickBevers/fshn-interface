<script lang="ts" setup>

</script>

<template>
    <nav>
        <div class="logo"></div>
        <div class="icons">
            <div class="menu">
                <a @click="$router.back()">
                    <img src="../assets/arrow.svg" alt="Arrow icon">
                </a>
            </div>
            <div class="cart">
               <p class="size">Your recommended size: <b>M</b></p>
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

.size {
    color: white;
    font-size: 20px;
    font-family: 'Helvetica', sans-serif;
    font-weight: 300;
}

</style>