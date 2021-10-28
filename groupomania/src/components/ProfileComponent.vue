<template>
    <div class="d-flex flex-column">
       
        <div class="navbar d-flex">
            <a href="#feed" class="col-2"><img class="navLogo" src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania"> </a>
            <a href="#post" class="navLink col-2">Post</a>
            <a href="#users" class="navLink col-2">Vos collègues</a>
            <a href="#profile" class="navLink navLinkProfile col-2">Profil</a>
            <a href="#" class="navLink col-2">Déconnexion</a>
        </div>
        <div class=" w-100">
            <h1>Votre profil</h1>
            <div v-if="this.text== false" class="" id="yourProfile">     
                <div class="userName" >Nom : {{this.user.username}}</div>
                <div class="userFirstName">Prénom :{{this.user.userFirstname}} </div>
                <div class="userEmail">Email :{{this.user.email}} </div>
                <div class="userImage">Photo de profil :
                    <img src="{{this.user.imageUrl}}">
                </div>
                <button  @click="editProfile"  id="modifyProfile">Modifier le profil</button>
            </div>   
               
            <form v-if="this.text == true" @submit.prevent="modifyProfile">
                <div>Nom :</div>
                <input type="text" id="inputName">
                <div>Prénom :</div>
                <input  type="text" id="inputFirstName">
                <div>Email :</div>
                <input  type="text" id="inputEmail"> 
                <div>Photo :</div> 
                <input  type="file" name="" id="inputFile">
                <div  class="userPassword">Nouveau mot de passe : </div>
                <input v-model.trim="user.password" type="password" id="inputPassword">
                <div  class="userNewPassword" id="inputNewPassword">Confirmer le nouveau mot de passe : </div>
                <input v-model.trim="user.newPassword" type="password">
                <button   id="modifyProfile" class="btn-primary">Valider</button>

            </form>

        </div>  
    </div>
</template>

<script>
import axios from  'axios'
export default {
    name:'profile',
    data(){
        return{
            text: false,
            user:{
                username: '',
                userFirstname:'',
                email:'',
                imageUrl:'',
                password:'',
                newPassword:'',
                id: JSON.parse(localStorage.getItem('userInformations')).id  
            },
        }
    },
    methods:{
        showProfile(){
            axios.get('auth/users/'+ JSON.parse(localStorage.getItem('userInformations')).id)
            
            .then((response) => {
                console.log(response.data)
                    this.user.username = response.data.name
                    this.user.userFirstname = response.data.firstname
                    this.user.imageUrl = response.data.imageUrl
                    this.user.email = response.data.email 
            })
            .catch(() => {
                console.log()
            })
        },
        editProfile(){
            this.text = true
            

        },
        modifyProfile(){
            if(this.user.password == this.user.newPassword){
                axios.put('auth/users/'+ JSON.parse(localStorage.getItem('userInformations')).id, {   
                firstname: document.getElementById('inputFirstName').value,
                name: document.getElementById('inputName').value,
                email: document.getElementById('inputEmail').value,
                imageUrl: '',
                id: this.user.id,
            })
            .then((data) => {
                console.log(data)
                this.text = false
            })
            .catch()
            }
            else{
                console.log('erreur')
            }
            
        }
    },
    beforeMount(){
        this.showProfile()
    }
}






</script>