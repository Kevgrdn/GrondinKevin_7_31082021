<template>
    <div>
        <div class="navbar d-flex">
            <a href="#feed" class="col-2"><img class="navLogo" src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania"> </a>
            <a href="#users" class="navLink col-2">Vos collègues</a>
            <a href="#profile" class="navLink navLinkProfile col-2">Profil</a>
            <a href="#" @click="disconnect" class="navLink col-2">Déconnexion</a>
        </div>
    </div>
</template>

<script>
export default {
    name:'Nav'
}
</script>