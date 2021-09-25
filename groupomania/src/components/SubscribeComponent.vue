<template>
    <div class="loginInterface">
        <img class="Logo" src="../assets/icon-left-font-monochrome-black.png" alt="Logo">
        <div class="phraseAccueil">Bienvenue sur le portail d'inscription</div>
        <div>
            <label for="name">Nom</label>
            <br>
            <input id="name" type="text" class="form">
        </div>   
        <div>
            <label for="firstName">Prénom</label>
            <br>
            <input id="firstName" type="text" class="form">
        </div>          
        <div>
            <label for="email">E-mail</label>
            <br>
            <input id="email" type="email" class="form">
        </div>    
        <div>
            <label for="password">Mot de passe</label>
            <br>
            <input id="password" type="password" class="form">
        </div>
        <div class="lienRoutes">
            <button v-on:click="subscribe" class="btn-primary">S'inscrire</button>
            <router-link to="/" class="btn-secondary">Se connecter</router-link>
        </div>
    </div>  
</template>
<script>

export default {
    name: 'Subscribe',
    props: {
        msg: String
    },
    methods:{
        subscribe(){
            let name = '"name":' + JSON.stringify(document.getElementById('name').value) + ','
            let firstName ='"firstName":' + JSON.stringify(document.getElementById('firstName').value) + ','
            let email = '"email":'+ JSON.stringify(document.getElementById('email').value) + ','
            let password = '"password":' + JSON.stringify(document.getElementById('password').value) 
            
            let userInformations = '{' + name+firstName+email+password + '}'

            const requestOptions = {
                method: 'POST',
                body: userInformations, 
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
            }
            fetch('http://localhost:3000/api/auth/signup', requestOptions)
            .then((response) => response.json())
            .then((apiData) => console.log(apiData))
            .catch(() => {
                console.log(name, firstName, email, password)
            })
        }
    }
}
</script>

<style scoped lang="scss">

.loginInterface
{   
    margin: 10rem auto ;
    background-color: white;
    border-radius: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.Logo
{
    text-align: center;
    height: 20rem;
    margin: 0 1rem;

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