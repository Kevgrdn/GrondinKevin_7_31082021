<template>
    <div class="row">
        <div class="navbar">
            <a href="#feed" class="col-4 col-md-2" title="Accueil"><img class="w-100 " src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania"> </a>
            <a href="#users" class="navLink py-3 col-2  border" title="Vos collègues"><i class="fas fa-users"></i></a>
            <a href="#profile" class="navLink py-3 navLinkProfile border  col-2" title="Votre profil"><i class="fas fa-user-circle"></i></a>
            <a href="#" @click="disconnect" class="navLink py-3 border col-md-2" title="Déconnexion"><i class="fas fa-sign-out-alt"></i></a>
        </div>
    </div>
</template>

<script>
export default {
    name:'Nav'
}
</script>

<style lang="scss">


</style>