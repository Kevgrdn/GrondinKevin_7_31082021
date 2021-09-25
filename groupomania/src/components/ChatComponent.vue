<template>
    <div class="container-flex">
        <div class="navbar">
            <a href="#feed"><img class="navLogo" src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania"> </a>
            <a href="#post" class="navLink">Post</a>
            <a href="#chat" class="navLink">Discussion</a> 
            <a href="#collegues" class="navLink">Vos collègues</a>
            <a href="#Profile" class="navLink navLinkProfile">Profil</a>
            <a href="#" class="navLink">Déconnexion</a>
        </div>
        <div class="chatBox">
            <input type="text" name="chat" id="" class="">
            <button class="btn-primary">Envoyer</button>
        </div>
    </div>    
</template>

<script>
export default {
  name: 'Chat',
  props: 
  {
    msg: String
  }
}


</script>

<style scoped lang="scss">


.chatBox
{
    margin: 6rem auto ;
    background-color: white;
    border-radius: 1rem;
    width: 40%;
    height: 50rem;
    display: flex;
    flex-direction: row;
    align-items: flex-end;

}
input
{
    width: 100%;
    margin: 1rem;
    padding: 0.6rem 0;
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
    margin: 1rem 1rem;
    

    &:hover
    {
        opacity: 0.7;

    }
}


</style>