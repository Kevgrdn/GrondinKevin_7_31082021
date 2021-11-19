<template>
    <form @submit.prevent="connect" class="row w-100 m-top-perso">
        <div class="col-sm-6 col-md-4 m-auto ">
            <div class="col-sm-12  bg-perso d-flex flex-column m-auto rounded py-3 ">
                <div class="phraseAccueil">Bienvenue sur le portail de connexion   
                </div>
                <img class=" m-auto w-25" src="../assets/icon-left-font-monochrome-white.png" alt="Logo">

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
                </div>
                <div> Vous n'avez pas de compte ?
                </div>
                <router-link to="/subscribe" class="">Inscrivez-vous</router-link>
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
                alert('Veuillez vérifier les champs avant de continuer')

            })   
        }
    }
}


</script>

<style lang="scss">



.m-top-perso{
    margin-top: 8rem;
}
.bg-perso{
    background-color: #222f3d;
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