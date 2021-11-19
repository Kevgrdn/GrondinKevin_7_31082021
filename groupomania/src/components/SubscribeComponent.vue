<template>
    <div class="">
        <div class="m-top-perso-2 mx-auto col-12 col-md-8 d-flex flex-column">
            <div class="bg-perso d-flex flex-column m-auto col-10 rounded py-3">
            <div class="phraseAccueil">
                Bienvenue sur le portail d'inscription   
            </div>
            <img class=" w-25 m-auto" src="../assets/icon-left-font-monochrome-white.png" alt="Logo">
            <form @submit.prevent="subscribe">
 
                <div>
                    <label for="name">Nom</label>
                    <br>
                    <input v-model.trim="name" id="name" type="text" class="form" required>
                    <div class="error btn-danger col-12 col-md-8 mx-auto" v-if="!name.minLength && this.error.firstname">Veuillez remplir le champ convenablement.</div>                                        

                    <p id="nameMessage">{{message.name}}</p>
                </div>   
                <div>
                    <label for="firstName">Prénom</label>
                    <br>
                    <input v-model="firstName" id="firstName" type="text" class="form" required >
                    <div class="error btn-danger col-12 col-md-8 mx-auto" v-if="!firstName.minLength && this.error.firstname">Veuillez remplir le champ convenablement.</div>                                        

                    <p id="nameMessage">{{message.firstName}}</p>
                </div>          
                <div>
                    <label for="email">E-mail</label>
                    <br>
                    <input v-model="email" id="email" type="email" class="form" required>
                    <div class="error btn-danger col-12 col-md-8 mx-auto" v-if="!email.minLength && this.error.email">Veuillez remplir le champ convenablement.</div>                                        

                    <p id="emailMessage">{{message.email}}</p>
                </div>    
                <div>
                    <label for="password">Mot de passe</label>
                    <br>
                    <input v-model="password" id="password" type="password" class="form" required>
                    <div class="error btn-danger col-12 col-md-8 mx-auto" v-if="!password.minLength && this.error.password">Veuillez remplir le champ convenablement.</div>                                        

                    <p id="passwordMessage">{{message.password}}</p>
                </div>
                <div class="">
                    <button  class="btn-primary">S'inscrire</button>
                    <div class="d-flex m-auto flex-column my-3">Vous avez déjà un compte ?
                    </div>
                </div>
            </form>
            <router-link to="/" class="">Connectez-vous</router-link>

            </div> 
        </div>
    </div>  
</template>

<script>

import axios from 'axios'
import { required, alpha, alphaNum, email, maxLength, minLength } from "vuelidate/lib/validators";


export default {
    name: 'Subscribe',
    data(){
        return{
        
            firstName:'',
            name:'',
            email:'',
            password:'',
            passwordConfirmation:'',
            
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
                login: false
            }
        }
    },
    validations: {
        firstName: { required, alpha, minLength:minLength(2), maxLength: maxLength(20) },
        name: { required, alpha, minLength: minLength(2), maxLength: maxLength(20)},
        password:{ required, alphaNum, maxLength: maxLength(20), strongPassword(mdp) {
            return (
                /[a-zA-Z]/.test(mdp) && // checks for a-z
                /^\S+$/.test(mdp) &&
                /[0-9]/.test(mdp) && // checks for 0-9
                mdp.length >= 8
            )},
        },
        email: { required, email, minLength: minLength(5), maxLength: maxLength(40)}
    },

    methods:{
        subscribe(){
            if(this.firstName.length > 1  && this.name.length > 1 && this.password.length >= 8 && this.email.length > 4 ){
                let data = { name: this.name, firstname: this.firstName, email: this.email, password: this.password}
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
           else {
               if (this.firstName.length <= 1) {
                    this.error.firstname = true
               }
               if (this.email.length <4) {
                    this.error.email = true 
               }
               if (this.name.minLength && this.name.alpha && this.name.maxLength) {
                    this.error.name = true 
               }
               if (!this.password.strongPassword) {
                    this.error.password = true 
               }
             
            }
            
        },
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