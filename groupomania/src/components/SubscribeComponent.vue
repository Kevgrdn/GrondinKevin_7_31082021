<template>
    <div class="loginInterface">
        <img class="Logo" src="../assets/icon-left-font-monochrome-black.png" alt="Logo">
        <div class="phraseAccueil">Bienvenue sur le portail d'inscription</div>
        <form>
            <div>
                <label for="name">Nom</label>
                <br>
                <input v-model="user.name" id="name" type="text" class="form">
                <p id="nameMessage">{{message.name}}</p>
            </div>   
            <div>
                <label for="firstName">Prénom</label>
                <br>
                <input v-model="user.firstName" id="firstName" type="text" class="form">
                <p id="nameMessage">{{message.firstName}}</p>
            </div>          
            <div>
                <label for="email">E-mail</label>
                <br>
                <input v-model="user.email" id="email" type="email" class="form">
                <p id="emailMessage">{{message.email}}</p>
            </div>    
            <div>
                <label for="password">Mot de passe</label>
                <br>
                <input v-model="user.password" id="password" type="password" class="form">
                <p id="passwordMessage">{{message.password}}</p>
            </div>
            <div class="lienRoutes">
                <button v-on:click="subscribe" class="btn-primary">S'inscrire</button>
                <router-link to="/" class="btn-secondary">Se connecter</router-link>
            </div>
        </form> 
    </div>  
</template>

<script>

import axios from 'axios'
export default {
    name: 'Subscribe',
    data(){
        return{
            user:{
                firstName:'',
                name:'',
                email:'',
                password:'',
                passwordConfirmation:'',
            },
            message:{
                firstName:'',
                name:'',
                email:'',
                password:'',
                passwordConfirmation:'',
            },
            error:{
                firstname: false,
                name: false,
                email: false,
                password: false,
                passwordConfirm: false,
                login: false
            }
        }
    },

    methods:{
        subscribe(){
            
            let data = { name: this.user.name, firstname: this.user.firstName, email: this.user.email, password: this.user.password}
            console.log(data)

            axios.post('auth/signup', data)
            .then((response) => { 
                console.log(response)
                if (response.status == 200){

                    this.$router.push("/")
                } 
                else{
                    this.$router.push("subscribe")
                } 
            })
            .catch(() => {
                console.log(data)
            })
        }
    }
}
</script>

<style scoped lang="scss">


</style>