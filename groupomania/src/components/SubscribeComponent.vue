<template>
    <div class="">
        <div class="m-top-perso-2 mx-auto col-12 col-md-8 d-flex flex-column">
            <div class="bg-perso d-flex flex-column m-auto col-10 rounded py-3">
            <div class="phraseAccueil">
                Bienvenue sur le portail d'inscription   
            </div>
            <img class=" w-25 m-auto" src="../assets/icon-left-font-monochrome-white.png" alt="Logo">
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
                <div class="">
                    <button v-on:click="subscribe" class="btn-primary">S'inscrire</button>
                    <div class="d-flex m-auto flex-column my-3">Vous avez déjà un compte ?
                        <router-link to="/" class="">Connectez-vous</router-link>
                    </div>
                </div>
            </form>
            </div> 
        </div>
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

<style lang="scss">

.m-top-perso-2{
    margin-top: 12rem;
}


@media screen and (max-width: 600px){
    .m-top-perso-2{
        margin-top: 1rem;
    }
}

</style>