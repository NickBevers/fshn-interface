<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import backButton from '../components/backButton.vue'
</script>

<template>
    <Navigation/>
    <div class="container">
        <backButton/>

        <div class="content">
            <h2 class="content_title">Filter</h2>

            <div class="filters">
                <div class="filter">
                    <h3 class="filter_name">Sorteren op</h3>
                    <div class="filter_items">
                        <a class="black_btn filter_btn" href="">Nieuw</a>
                        <a class="black_btn filter_btn" href="">Meest populair</a>
                        <a class="black_btn filter_btn" href="">Laagste prijs</a>
                        <a class="black_btn filter_btn" href="">Hoogste prijs</a>
                        <a class="black_btn filter_btn" href="">Deals</a>
                    </div>
                </div>

                <div class="filter">
                    <h3 class="filter_name">Maat</h3>
                    <div class="filter_items filter_items_size">
                        <a class="black_btn filter_btn" href="">Extra small</a>
                        <a class="black_btn filter_btn" href="">Small</a>
                        <a class="black_btn filter_btn" href="">Medium</a>
                        <a class="black_btn filter_btn" href="">Large</a>
                        <a class="black_btn filter_btn" href="">Extra large</a>
                        <a class="black_btn filter_btn" href="">2X large</a>
                        <a class="black_btn filter_btn" href="">3X large</a>
                    </div>
                </div>

                <div class="filter">
                    <h3 class="filter_name">Prijs</h3>
                </div>

                <div class="filter">
                    <h3 class="filter_name">Kleur</h3>
                    <div class="filter_items filter_items_size">
                        <div class="color">
                            <div class="square white"></div>
                            <span class="color_name">White</span>
                        </div>
                        <div class="color">
                            <div class="square black"></div>
                            <span class="color_name">Black</span>
                        </div>
                        <div class="color">
                            <div class="square grey"></div>
                            <span class="color_name">Grey</span>
                        </div>
                        <div class="color">
                            <div class="square red"></div>
                            <span class="color_name">Red</span>
                        </div>
                        <div class="color">
                            <div class="square blue"></div>
                            <span class="color_name">Blue</span>
                        </div>
                        <div class="color">
                            <div class="square green"></div>
                            <span class="color_name">Green</span>
                        </div>
                    </div>
                </div>
            </div>
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

    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
        text-transform: uppercase;
    }

    .filters {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
    }

    .filter_name {
        font-size: 1.5rem;
    }

    .filter_items{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }

    .filter_items_size{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    .color {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .color_name {
        width: 100%;
        border: solid 1px white;
        background-color: transparent;
        padding: 14px 0px;
        font-size: 1.2rem;
        cursor: pointer;
        text-align: center;
        text-transform: uppercase;
        color: white;
    }

    .square {
        width: 80px;
        height: 52px;
        border: solid 1px white;
        margin: 0 auto;
    }

    .white {
        background-color: white;
    }

    .black {
        background-color: black;
    }

    .grey {
        background-color: #9F9F9F;
    }

    .red {
        background-color: #E21818;
    }

    .blue {
        background-color: #1875E2;
    }

    .green {
        background-color: #0AB91C;
    }

</style>