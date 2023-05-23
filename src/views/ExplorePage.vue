<script lang="ts" setup>
    // import components
    import Navigation from '../components/navComponent.vue';
    import headCategories from '../components/headCategories.vue';
    import collectionComponent from '../components/collectionComponent.vue';


</script>

<template>
    <Navigation/>

    <div class="content">

        <div class="primary_category">
            <headCategories/>
        </div>

        <div class="collection_section">
            <collectionComponent/>
            
        </div>

        <div class="secondary_category">
            <h2>More to explore</h2>
            <div class="categories">
                <a class="black_btn category_btn" href="*">Women's tops</a>
                <a class="black_btn category_btn" href="*">Women's trousers</a>
                <a class="black_btn category_btn" href="*">Men's shirts</a>
            </div>
        </div>

    </div>


</template>

<style scoped>
    a {
        color: white;
    }
    .content {
        margin-top: 12rem;

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

    .primary_category {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
    }

    /*COLLECTION SECTION*/
    .collection_section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
    }


    /*SECONDARY CATEGORY*/
    .secondary_category {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
    }

    .categories{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }

    .category_btn {
        padding: 14px 5px;
    }
</style>