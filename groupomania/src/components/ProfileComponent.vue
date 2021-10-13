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
             <div class="Feed_1" id="posts">

            </div>
        </div>  
    </div>
</template>

<script>
export default {
    name:'profile'
}
</script>