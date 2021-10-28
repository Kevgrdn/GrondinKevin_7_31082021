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
            <h1>Modifier vos informations</h1>
             <div class="" id="yourProfile">     
            </div>
            <div class="userName"></div>
            <div class="userFirstName"></div>
            <div class="userImage"></div>
        </div>  
    </div>
</template>

<script>
export default {
    name:'ModifyProfile',
    methods:{
        modifyProfile(){
            

        }
    }
    
}
      


</script>