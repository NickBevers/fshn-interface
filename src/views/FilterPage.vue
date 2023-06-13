<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import backButton from '../components/backButton.vue';

    import router from '../router';
    
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        router.push("/login");
    }

    oninput = (event: Event) => {
    //   const { value } = event.target as unknown as { value: number };

      // set the value with event.target.value
      const value = (event.target as HTMLInputElement).valueAsNumber;

      setRate(value);
    };

    function setRate(value: number) {
        const minPrice = document.querySelector(".min-price") as HTMLInputElement;
        const maxPrice = document.querySelector(".max-price") as HTMLInputElement;
        const minValue = document.querySelector("#min-value") as HTMLInputElement;
        const maxValue = document.querySelector("#max-value") as HTMLInputElement;
    
        minPrice.value = value.toString();
        minValue.innerHTML = `&euro;${value}`;

        /*maxPrice.value = value.toString();
        maxValue.innerHTML = `&euro;${value}`;*/
    
        if (parseInt(minPrice.value) > parseInt(maxPrice.value)) {
            maxPrice.value = minPrice.value;
            maxValue.innerHTML = `&euro;${value}`;
        }
        
        /*if (parseInt(maxPrice.value) < parseInt(minPrice.value)) {
            minPrice.value = maxPrice.value;
            minValue.innerHTML = `&euro;${value}`;
        }*/

        //console.log(minPrice.value);

    };

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

                <div class="filter filter_price">
                    <div class="price">
                        <h3 class="filter_name">Prijs</h3>
                        <div class="range_values">
                            <p id="min-value" class="range" >&euro;5</p>
                            <p class="range">-</p>
                            <p id="max-value" class="range" >&euro;35</p>
                        </div>
                    </div>

                    <div class="slider">
                        <input oninput type="range" class="min-price" value="5" min="5" max="500" step="5">
                        <input oninputmax type="range" class="max-price" value="100" min="5" max="500" step="5">
                    </div>

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
        font-weight: 700;
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

    .filter_price{
        width: 100%;
    }

    .price {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    .slider {
        width: 100%;
        position: relative;
        margin: 15px 0 30px 0;
    }

    .range_values {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
    }

    input[type=range] {
        appearance: none;
        -webkit-appearance: none;
        width: 100%;
        background: transparent; 
        position: absolute;
        left: 0;
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 15px;
        width: 15px;
        background: white;
        cursor: pointer;
        margin-top: -5px;
        position: relative;
        z-index: 1;
    }

    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        background: #5C5F66;
        border: none;
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