<script lang="ts" setup>
    import Navigation from '../components/navComponent.vue';

    import { ref } from 'vue';
    import router from '../router';
    import generateClientNumber from '../functions/generateClientNumber';

    const email = ref('');
    const password = ref('');
    const clientNumber = generateClientNumber();

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
                //console.log("success");
                if (clientNumber === null) {
                    const newClientNumber:number = Math.floor(Math.random() * 1000000000);
                    localStorage.setItem("clientNumber", JSON.stringify(newClientNumber));
                }
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
            <div class="inputfield">
                <label for="email">Email</label>
                <input id="email" v-model="email" type="text"  placeholder="Mail">
            </div>

            <div class="inputfield"> 
                <label for="password">Password</label>
                <input id="password" v-model="password" type="password" placeholder="Password">
            </div>

            <div class="submit">
                <button class="submitBtn" type="submit" @click.prevent="login">Login</button>
            </div>
        </form>
    </div>  
</template>

<style scoped>
    .container {
        margin-top: 8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 90vh;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    label {
        color: white;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        text-transform: uppercase;
    }

    input {
        margin-bottom: 2rem;
        border: 1px solid white;
        background-color: transparent;
        color: white;
        padding: 0.5rem;
        font-size: 1.5rem;
    }

    ::placeholder {
        color: white;
    }

    .inputfield {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .submit {
        margin-top: 2rem;
        width: 100%;
    }

    .submitBtn {
        display: block;
        background-color: white;
        color: black;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.2rem;
        font-weight: 400;
        cursor: pointer;
        text-align: center;
        text-transform: uppercase;
        border-radius: 0;
        width: 100%;
    }

</style>
