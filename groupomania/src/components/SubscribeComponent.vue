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
      
        checkInput(){
            
            //Vérification de l'input firstName
            if(!this.user.firstName){
                this.error.firstName = true
                this.message.firstName = "Le champ prénom n'est pas rempli correctement"
                document.getElementById('firstNameMessage').classList.remove('d-none')
                document.getElementById('firstName').classList.add('border-danger')
            }
            else if(this.user.firstname && (this.user.firstname.length<2 || this.user.firstname.length>30)) {
                this.error.firstname = true
                this.message.firstname = "Le prénom doit avoir entre 2 et 30 caractères"
                document.getElementById('firstNameMessage').classList.remove('d-none')
                document.getElementById('firstname').classList.add('border-danger') 
            }
                //Si firstName est OK
            else {
                this.error.firstname = false
                document.getElementById('firstNameMessage').classList.add('d-none') 
                document.getElementById('firstname').classList.remove('border-danger') 
            }
            
            //Vérification de l'input name
            if(!this.user.name) {
                this.error.name = true
                this.message.name = "nom ne peut pas être vide"
                document.getElementById('nameMessage').classList.remove('d-none') 
                document.getElementById('name').classList.add('border-danger') 
            }
            else if(this.user.name && (this.user.name.length<2 || this.user.name.length>50)) {
                this.error.name = true
                this.message.name = "Le nom doit avoir entre 2 et 50 caractères"
                document.getElementById('nameMessage').classList.remove('d-none') 
                document.getElementById('name').classList.add('border-danger') 
            }
                //Si name est OK
            else {
                this.error.name = false
                document.getElementById('nameMessage').classList.add('d-none') 
                document.getElementById('name').classList.remove('border-danger') 
            }

            //Vérification de l'input de l'adresse mail
            var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if ( !this.user.email) {
                this.error.email = true
                this.message.email = "L'email ne peut pas être vide"
                document.getElementById('emailMessage').classList.remove('d-none') 
                document.getElementById('email').classList.add('border-danger') 
            }
            else if (this.user.email && !regex.test(this.user.email)) {
                this.error.email = true
                this.message.email = "L'email est incorrect"
                document.getElementById('emailMessage').classList.remove('d-none') 
                document.getElementById('email').classList.add('border-danger') 
            }
                // Si le mail est OK
            else {
                this.error.email = false
                document.getElementById('emailMessage').classList.add('d-none')
                document.getElementById('email').classList.remove('border-danger')  
            }

            // Vérification de l'input du mot de passe
            if(!this.user.password) {
                this.error.password = true
                this.message.password = "Le mot de passe ne peut pas être vide"
                document.getElementById('passwordMessage').classList.remove('d-none') 
                document.getElementById('password').classList.add('border-danger') 
            }
            else if(this.user.password && (this.user.password.length<3 || this.user.password.length>20)) {
                this.error.password = true
                this.message.password = "Le mot de passe doit avoir entre 3 et 20 caractères"
                document.getElementById('passwordMessage').classList.remove('d-none') 
                document.getElementById('password').classList.add('border-danger') 
            }
                // Si le mot de passe est OK
            else {
                this.error.password = false
                document.getElementById('passwordMessage').classList.add('d-none') 
                document.getElementById('password').classList.remove('border-danger') 
            }
        },


        subscribe(){
            

            // UTILISER AXIOS
            let name = JSON.stringify(document.getElementById('name').value) 
            let firstName =  JSON.stringify(document.getElementById('firstName').value)
            let email =  JSON.stringify(document.getElementById('email').value)  
            let password =  JSON.stringify(document.getElementById('password').value) 
            
            
            let userInformations = '{"name":'+ name + ',"firstName":'+ firstName +  ',"email":' + email + ',"password":' + password + '}'
            console.log(userInformations)

            const requestOptions = {
                method: 'POST',
                body: userInformations, 
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
            }


            fetch('http://localhost:3000/api/auth/signup', requestOptions)
            .then((response) => response.json())
            .then((apiData) => console.log(apiData))
            
            //.then(() => this.$router.push("feed"))
            .catch(() => {
                console.log(userInformations)
            })
        }
    }
}
</script>

<style scoped lang="scss">


</style>