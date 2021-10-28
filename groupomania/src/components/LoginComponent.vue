<template>
    <form @submit.prevent="connect">
        <div class="loginInterface">
            <img class="Logo" src="../assets/icon-left-font-monochrome-black.png" alt="Logo">
            <div class="phraseAccueil">Bienvenue sur le portail de connexion</div>

                <div>
                    <label for="email">E-mail</label>
                    <br>
                    <input v-model.trim="user.email" type="text" id="email" class="form email">
                </div>    
                <div>
                    <label for="password">Mot de passe</label>
                    <br>
                    <input v-model.trim="user.password" type="password" id="password" class="form password">
                </div>
            
            <div class="lienRoutes">
                <button class="btn-primary connect">Se connecter</button>
                <router-link to="/subscribe" class="btn-secondary">S'inscrire</router-link>
            </div>
            
        </div>
    </form>  
</template>

<script>

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/api/'

export default {



    name: 'Login',
   
    data(){
        return{
            user: {
                email:'',
                password:''
            }
        }
    },
    
    
    
    
    
    methods: {
        connect(){
            
            
            let data = { email: this.user.email, password: this.user.password }
            console.log(data)
            axios.post('auth/login', data)
            .then((response) =>{console.log(response)
               
                if(response.status == 200){
                    localStorage.setItem('userInformations', JSON.stringify(response.data.user), )
                    localStorage.setItem('token', response.data.token) 
                    this.$router.push('feed')
                }
                else
                {
                    this.$router.push('login')
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

.loginInterface
{   
    margin: 10rem auto ;
    background-color: white;
    border-radius: 1rem;
    width: 30%;
    display: flex;
    flex-direction: column;
}

.Logo
{
    text-align: center;
    margin: 0 1rem;
    width: auto;

}
label
{
    color: black;
    font-weight: 700;
}
.phraseAccueil
{
    padding-bottom: 1.5rem;
    color: rgb(120, 221, 120);
    font-weight: 700;
}
.form
{
    margin: 0.4rem ;
}
.lienRoutes
{
    margin: 1rem 0;
    height: 2rem;
}
.btn-primary
{
    
    background-color: rgb(42, 90, 250);
    padding: 0.6rem 0.5rem;
    border-radius: 0.5rem;
    color: white;
    font-weight: 600;
    border: none;
    transition: 0.3s;
    margin: 0 0.2rem;

    &:hover
    {
        opacity: 0.7;

    }
}
.btn-secondary
{
    
    background-color: grey;
    padding: 0.6rem 0.5rem;
    margin: 0 0.2rem;
    border-radius: 0.5rem;
    color: white;
    font-weight: 600;
    border: none;
    transition: 0.3s;
    &:hover
    {
        opacity: 0.7;

    }
}
</style>