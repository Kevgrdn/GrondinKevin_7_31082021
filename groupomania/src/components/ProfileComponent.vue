<template>
    <div class="row">
        
        <!--Affichage du profil-->
        <div v-if="this.text== false" class="bg-perso mx-auto col-11 col-md-8  my-2 py-2 rounded-perso d-flex flex-column" id="yourProfile">     
            <h1>Votre profil</h1>

            <!--Nom-->
            <div class="userName d-flex flex-row colorSecondary rounded-perso my-2">
                <div class=" fw-bold col-12 p-2 mx-auto d-flex justify-content-center" >
                    Nom :
                    <div class="px-1 " >
                         {{this.user.username}}
                    </div>
                    <button v-if="nameActivation == false" @click="show" class="btn-primary  col-1"><i class="fas fa-cog"></i></button>

                </div>
                <div v-if="nameActivation == true">
                    <textarea v-model.trim="name" name="" id="" cols="30" rows="10"></textarea>
                    <button @click="updateName" >Modifier</button>
                </div>
                
            </div>

            <!--Prénom-->
            <div class="d-flex flex-column  colorSecondary rounded-perso my-2">
                <div class="fw-bold  mx-auto d-flex col-12 p-2 justify-content-center ">
                    Prénom :
                    <div class="px-1 ">
                        {{this.user.userFirstname}} 
                    </div>
                    <button v-if="firstNameActivation == false" @click="show" class="btn-primary col-1"><i class="fas fa-cog"></i></button>

                </div>
                <div v-if="firstNameActivation == true">
                    <textarea v-model.trim="firstname" name="" id="" cols="30" rows="10"></textarea>
                    <button @click="updateName" >Modifier</button>
                </div>
                
            </div>

            <!--Email-->
            <div class="d-flex flex-column colorSecondary rounded-perso my-2">
                <div class="fw-bold col-10 p-2 mx-auto d-flex justify-content-center ">
                    Email :
                    <div class="px-1 text-truncate">
                        {{this.user.email}}
                    </div> 
                    <button v-if="emailActivation == false" @click="show" class="btn-primary col-1 alis"><i class="fas fa-cog"></i></button>

                </div>
                <div v-if="emailActivation == true">
                    <textarea v-model.trim="email" name="" id="" cols="30" rows="10"></textarea>
                    <button @click="updateName" >Modifier</button>
                </div>
                               
            </div>

            <!--Photo de profil-->
            <div class="d-flex my-2 colorSecondary rounded-perso flex-column">
                <div class="userImage fw-bold col-12  mx-auto">Photo de profil :
                </div>
                <img v-if="this.user.imageUrl !== ''||null" :src=this.user.imageUrl class="pdp  text-start my-2 mx-auto">
                <img v-if="this.user.imageUrl == ''||null" src="https://st3.depositphotos.com/19428878/36416/v/450/depositphotos_364169666-stock-illustration-default-avatar-profile-icon-vector.jpg" class="mx-auto my-2 pdp  text-start">

            </div>
            <button  @click="editProfile" title="Modifier le profil"  id="modifyProfile" class="btn-primary col-12 col-md-6 my-2 mx-auto rounded-perso"><i class="fas fa-cog"></i> Modifier le profil</button>
            <button @click="deleteProfile" class="btn-danger rounded-perso2 py-2 col-12 col-md-6 mx-auto"><i class="fas fa-trash"></i> Supprimer le compte</button>
        </div>   

        <!--Modification de profil-->   
        <form v-if="this.text == true" @submit.prevent="update" class="bg-perso col-11 col-md-8 mx-auto my-2 py-2 rounded-perso">
            <h1>Votre profil</h1>

            <!--Nom-->
            <div class="my-2 colorSecondary rounded-perso">
                <div class="fw-bold">Nom :</div>
                <input type="text" id="inputName" class="my-2 col-10 col-md-6" placeholder="Nom">
            </div>
            
            <!--Prénom-->
            <div class="my-2 colorSecondary rounded-perso">
                <div class="fw-bold">Prénom :</div>
                <input  type="text" id="inputFirstName" class="my-2 col-10 col-md-6" placeholder="Prénom">
            </div>

            <!--Email-->
            <div class="my-2 colorSecondary rounded-perso">
                <div class="fw-bold">Email :</div>
                <input  type="text" id="inputEmail" class="my-2 col-10 col-md-6" placeholder="Email"> 
            </div>

            <!--Photo de profil-->
            <div class="my-2 colorSecondary rounded-perso">
                <div class="fw-bold">Photo :</div> 
                <label for="inputFile" title="Choisir une image" class="btn-primary rounded-perso col-6 mx-auto my-2"> <i class="far fa-images"></i> Choisir une image ...</label>
                <input  type="file" name="inputFile" id="inputFile" class="inputfile my-2" @change="handleFile">
            </div>

            <!--Mot de passe-->
            <div class="my-2 colorSecondary rounded-perso">
                <div  class="userPassword fw-bold">Nouveau mot de passe : </div>
                <input v-model.trim="user.password" type="password" id="inputPassword" class="my-2 col-10 col-md-6" placeholder="Nouveau de passe">
            </div>

            <!--Nouveau mot de passe-->
            <div class="my-2 colorSecondary rounded-perso">
                <div  class="userNewPassword fw-bold" id="inputNewPassword">Confirmer le nouveau mot de passe : </div>
                <input v-model.trim="user.newPassword" type="password" class="my-2 col-10 col-md-6" placeholder="Confirmer le nouveau mot de passe"> 
            </div>
            <button id="modifyProfile" title="Valider" class="btn-primary mx-2"><i class="fas fa-check"></i> Valider</button>
        </form>


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
        show(){
            this.nameActivation = true
        },
        editProfile(){
            this.text = true
            

        },
        updateName(){
            axios.put('auth/users/' + JSON.parse(localStorage.getItem('userInformations')).id, { name: this.name})
            .then((res) =>{
                console.log(res)
                window.location.reload()
            } )
            .catch(()=> console.log())
        },
        /*modifyProfile(){
            
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
            
        },*/
        update(){
            const formData = new FormData()
            if(this.file)
            {
            console.log(this.file)
            formData.append('file', this.file)
            formData.append('email', this.user.email)
            formData.append('name', this.user.username)
            formData.append('firstName', this.user.userFirstname);


            axios.put('auth/users/'+ JSON.parse(localStorage.getItem('userInformations')).id, formData)
            .then(console.log(formData))
            .catch(err => 
                {
                    console.log(err);
                });                
            }
            
        },
        deleteProfile(){
            axios.delete('auth/users/' + JSON.parse(localStorage.getItem('userInformations')).id )
            .then(res => {
                console.log(res.data)
                localStorage.clear()
                this.$router.push('login')
                })
            .catch(err => console.log(err))
        },
        handleFileUpload( event )
        {
            if (event.target.files.length === 0) {return}
            this.file = event.target.files[0];
        },
    },
    beforeMount(){
        this.showProfile()
    }
}

</script>

<style lang="scss" >



</style>