<script lang="ts" setup>
    import Navigation from '../components/navComponent.vue';

    import { ref } from 'vue';
    import router from '../router';

    const email = ref('');
    const password = ref('');

    const login = () => {
        fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === "success") {
                console.log("success");
                localStorage.setItem("jwtToken", data.token);
                router.push("/explore")
            } else {
                console.log("error");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
</script>

<template>
    <Navigation/>
    <div class="container">
        <form>
            <div>
                <label for="email">Email</label>
                <input type="text" id="email" placeholder="Mail" v-model="email" >
            </div>

            <div>
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Password" v-model="password" >
            </div>

            <div>
                <button type="submit" @click.prevent="login">Login</button>
            </div>
        </form>
    </div>  
</template>

<style scoped>
    .container {
        margin-top: 8rem;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    label {
        color: white;
    }

    input {
        margin-bottom: 1rem;
        border: 1px solid white;
        background-color: transparent;
    }

</style>
