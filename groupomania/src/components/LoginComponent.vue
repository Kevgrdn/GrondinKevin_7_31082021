<template>
    <div class="loginInterface">
        <img class="Logo" src="../assets/icon-left-font-monochrome-black.png" alt="Logo">
        <div class="phraseAccueil">Bienvenue sur le portail de connexion</div>

        <div>
            <label for="email">E-mail</label>
            <br>
            <input type="text" id="email" class="form email">
        </div>    
        <div>
            <label for="password">Mot de passe</label>
            <br>
            <input type="password" id="password" class="form password">
        </div>
        <div class="lienRoutes">
            <button v-on:click="connect" type="submit" class="btn-primary connect">Se connecter</button>
            <router-link to="/subscribe" class="btn-secondary">S'inscrire</router-link>
        </div>
    </div>  
</template>

<script>


export default {
    name: 'Login',
    props: {
        msg: String
    },

    methods: {
        connect(){
            
            let email ='"email":' + JSON.stringify(document.getElementById('email').value) + ','
            let password ='"password":'+ JSON.stringify(document.getElementById('password').value)

            let userInformations = '{' + email+password + '}'
            const requestOptions = {
                method: 'POST',
                body: userInformations, 
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
            }
            fetch('http://localhost:3000/api/auth/login', requestOptions)
            .then((response) => response.json())
            .then((apiData) => console.log(apiData))
            .catch(() => {
                console.log(email, password)
            })   
            this.$router.go("/feed")
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