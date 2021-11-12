<template>
    <div class="row">
        
        <!--Affichage du profil-->
        <div v-if="this.text== false" class="bg-perso mx-auto col-11 col-md-8  my-2 py-2 rounded-perso d-flex flex-column" id="yourProfile">     
            <h1>Votre profil</h1>

            <!--Nom-->
            <div class="d-flex flex-column  colorSecondary  flex-sm-column rounded-perso my-2">
                <div class=" fw-bold col-12 p-2 mx-auto d-flex align-items-center justify-content-center flex-wrap" >
                    Nom :
                    <div class="px-1 d-flex flex-wrap " >
                         {{this.user.username}}
                    </div>
                    <button v-if="nameActivation == false" @click="nameActivate" class="btn-primary d-flex  col-2 col-md-1"><i class="fas fa-cog mx-auto"></i></button>
                </div>
                <div v-if="nameActivation == true" class="d-flex flex-row my-2 mx-auto flex-wrap ">
                    <input v-model.trim="name" name="nom" id="" cols="30" rows="10" placeholder="Votre nouveau nom" class="mx-auto my-2">
                    <button @click="updateName" class="btn-primary mx-auto my-2 ">Modifier</button>
                </div>  
            </div>

            <!--Prénom-->
            <div class="d-flex flex-column  colorSecondary  flex-sm-column rounded-perso my-2">
                <div class="fw-bold  mx-auto d-flex col-12 p-2 align-items-center justify-content-center flex-wrap ">
                    Prénom :
                    <div class="px-1  ">
                        {{this.user.userFirstname}} 
                    </div>
                    <button v-if="firstNameActivation == false" @click="firstnameActivate" class="btn-primary col-2 col-md-1"><i class="fas fa-cog"></i></button>
                </div>
                <div v-if="firstNameActivation == true" class="d-flex flex-row my-2 mx-auto flex-wrap">
                    <input v-model.trim="firstName" name="" id="prenom" cols="" rows="" placeholder="Votre nouveau prénom" required  class="mx-auto my-2">
                    <button @click="updateFirstName" class="btn-primary mx-auto my-2">Modifier</button>
                </div>
            </div>

            <!--Email-->
            <div class="d-flex flex-column colorSecondary flex-sm-column rounded-perso  my-2">
                <div class="fw-bold col-10 p-2 mx-auto d-flex align-items-center flex-wrap justify-content-center ">
                    Email :
                    <div class="px-1 text-truncate">
                        {{this.user.email}}
                    </div> 
                    <button v-if="emailActivation == false" @click="emailActivate" class="btn-primary col-2 col-md-1"><i class="fas fa-cog"></i></button>
                </div>
                <div v-if="emailActivation == true" class="d-flex flex-row mx-auto my-2 flex-wrap">
                    <input v-model.trim="email" name="" id="email" cols="30" rows="10" placeholder="Votre nouveau mail"  class="mx-auto my-2">
                    <button @click="updateEmail" class="btn-primary mx-auto my-2">Modifier</button>
                </div>
                               
            </div>

            <!--Photo de profil-->
            <div class="d-flex my-2 colorSecondary rounded-perso flex-column">
                <div class="userImage fw-bold col-12  mx-auto">Photo de profil :
                </div>
                <img @click="updatePhoto" v-if="this.user.imageUrl !== ''||null" :src=this.user.imageUrl class="pdp  text-start my-2 mx-auto">
                <img @click="updatePhoto" v-if="this.user.imageUrl == ''||null" src="https://st3.depositphotos.com/19428878/36416/v/450/depositphotos_364169666-stock-illustration-default-avatar-profile-icon-vector.jpg" class="mx-auto my-2 pdp  text-start">
                 <div v-if="changePictureActivation == true" class="d-flex flex-row  mx-auto my-2">
                    <label for="pdp" class="btn-primary"><i class="fas fa-upload"></i> Photo</label>
                    <input type="file" @change="loadPicture" name="pdp" id="photo" cols="" rows="" placeholder="" class="inputfile">
                    <button @click="updatePhoto" class="btn-primary">Modifier</button>
                </div>
                <button v-if="changePictureActivation == false" @click="photoActivate" class="btn-primary col-2 col-md-1 mx-auto my-2"><i class="fas fa-cog"></i></button>
            </div>

            <!--Mot de passe-->
            <div class="d-flex flex-column colorSecondary rounded-perso my-2">
                
                <div v-if="passwordActivation == true" class="d-flex col-12 flex-column flex-wrap mx-auto my-2 justify-content-between ">
                    <input v-model.trim="oldPassword" type="password" name="oldPwd" id="oldPwd" cols="30" rows="10" placeholder="Ancien mot de passe" class="mx-auto col-6 ">
                    <input v-model.trim="newPassword" name="newPwd" type="password" id="newPwd" cols="30" rows="10" placeholder="Nouveau mot de passe" class="mx-auto col-6 ">
                    <button  @click="updatePassword" class="btn-primary mx-auto my-2">Modifier</button>
                </div>
                               
            </div>
            <button v-if="passwordActivation == false"  @click="passwordActivate" title="Modifier le mot de passe"  id="modifyProfile" class="btn-primary col-12 col-md-6 my-2 mx-auto rounded-perso"><i class="fas fa-cog"></i> Le mot de passe</button>
            <button @click="deleteProfile" class="btn-danger rounded-perso2 py-2 col-12 col-md-6 mx-auto"><i class="fas fa-trash"></i> Supprimer le compte</button>
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
            file:'',
            name:'',
            nameActivation: false,
            firstName:'',
            firstNameActivation: false,
            email:'',
            emailActivation: false,
            picture:null,
            changePictureActivation: false,
            passwordActivation:false,
            oldPassword:'',
            newPassword:'',
            user:{
                username: '',
                userFirstname:'',
                email:'',
                imageUrl: null,
                password:'',
                newPassword:'',
                id: JSON.parse(localStorage.getItem('userInformations')).id  
            },
        }
    },
    methods:{

        //GET PROFIL / AFFICHE LE PROFIL 
        showProfile(){
            axios.get('auth/users/'+ JSON.parse(localStorage.getItem('userInformations')).id, {headers:{'Authorization': 'Bearer '  + localStorage.getItem('token')}})
            
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

        //ACTIVE LE CHAMPS NOM
        nameActivate(){
            this.nameActivation = true
            
        },

        //ACTIVE LE CHAMP PRENOM
        firstnameActivate(){
            this.firstNameActivation = true
        },

        //ACTIVE LE CHAMP MAIL
        emailActivate(){
            this.emailActivation = true
        },

        //ACTIVE LE CHAMP D'UPLOAD PHOTO
        photoActivate(){
            this.changePictureActivation = true
        },

        //ACTIVE LE CHAMP DE MOT DE PASSE
        passwordActivate(){
            this.passwordActivation = true
        },

        //PUT NAME / CHANGE LE NOM DE FAMILLE 
        updateName(){
            if (this.name !== '' && this.name.length > 2 ) {
                axios.put('auth/users/' + JSON.parse(localStorage.getItem('userInformations')).id  + '/name', { name: this.name}, {headers:{'Authorization': 'Bearer '  + localStorage.getItem('token')}})
                .then((res) =>{
                console.log(res)
                window.location.reload()
                })
                .catch(()=> console.log())
            }

            else
            {
                alert("Veuillez remplir correctement le champ avant de valider !")  
            }
  
        },

        //PUT FIRSTNAME / CHANGE LE PRENOM
        updateFirstName(){
            if (this.firstName !== '' && this.firstName.length > 2 ) {
                
                axios.put('auth/users/' + JSON.parse(localStorage.getItem('userInformations')).id  + '/firstname', { firstname: this.firstName}, {headers:{'Authorization': 'Bearer '  + localStorage.getItem('token')}})
                .then((res) =>{
                    console.log(res)
                    window.location.reload()
                } )
                .catch(()=> console.log())
            }
            else{
                alert('Veuillez remplir correctement les champs !')
            }
           
        },

        //PUT EMAIL / CHANGE LE MAIL
        updateEmail(){
            if (this.email !== '' && this.email.length >6) {
                
                axios.put('auth/users/' + JSON.parse(localStorage.getItem('userInformations')).id + '/email', { email: this.email}, {headers:{'Authorization': 'Bearer '  + localStorage.getItem('token')}})
                .then((res) =>{
                    console.log(res)
                    window.location.reload()
                } )
                .catch(()=> console.log())
            }
            else{
                alert('Veuillez remplir correctement le champ avant de valider !')
            }
             
        },

        //PUT PHOTO / CHANGE LA PHOTO DE PROFIL
        updatePhoto(){
            const newPost = new FormData()
            console.log(this.picture)
            
            if(this.picture){
            console.log(this.description)
            newPost.append('image', this.picture)
        
            axios.put('/auth/users/' + JSON.parse(localStorage.getItem('userInformations')).id +'/photo' , newPost, {headers:{'Authorization': 'Bearer '  + localStorage.getItem('token')}})
            .then ((res) => {
                console.log(res)
                window.location.reload()
            })
            .catch (err => console.log(err))
            }   
        },

        //PUT PASSWORD // CHANGE LE MOT DE PASSE
        updatePassword(){
            if (this.password !== '' && this.oldPassword.length > 6) {
                axios.put('auth/users/' + JSON.parse(localStorage.getItem('userInformations')).id + '/password', { password: this.oldPassword, password2: this.newPassword}, {headers:{'Authorization': 'Bearer '  + localStorage.getItem('token')}})
                .then((res) =>{
                    console.log(res)
                    window.location.reload()
                })
                .catch(()=> console.log())
            }
            else
            {
                alert('Veuillez remplir correctement les champs avant de valider !')
            }
            
        },

        //DELETE PROFILE / SUPPRIME LE PROFIL
        deleteProfile(){
            axios.delete('auth/users/' + JSON.parse(localStorage.getItem('userInformations')).id, {headers:{'Authorization': 'Bearer '  + localStorage.getItem('token')}} )
            .then(res => {
                console.log(res.data)
                localStorage.clear()
                this.$router.push('login')
                })
            .catch(err => console.log(err))
        },

        //FONCTION POUR UPLOAD LA PHOTO DE PROFIL
        loadPicture(event) 
        {
        if(event.target.files.length === 0) {return}

        this.picture = event.target.files[0]         
        },   
    },
    beforeMount(){
        this.showProfile()
    }
}

</script>

<style lang="scss" >



</style>