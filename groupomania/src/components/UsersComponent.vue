<template>
    <div class="w-100">
        <div class="navbar d-flex">
            <a href="#feed" class="col-2"><img class="navLogo" src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania"> </a>
            <a href="#post" class="navLink col-2">Post</a>
            <a href="#users" class="navLink col-2">Vos collègues</a>
            <a href="#profile" class="navLink navLinkProfile col-2">Profil</a>
            <a href="#" class="navLink col-2">Déconnexion</a>
        </div>
        <div class=" d-flex flex-column col-8 w-100">
            <h1 class=" my-3">Collègues</h1>
            <div id="user" class="user py-5 px-2 d-flex flex-wrap justify-content-center "></div>
        </div>
    </div>
</template>

<script>
export default {
    name:'users',
    methods:{
        showUsers(){
            
            fetch('http://localhost:3000/api/auth/users')
            .then((response) => response.json())
            .then((apidata) =>
                apidata.forEach(user => {
                    document.querySelector('.user').innerHTML
                    +='<div class="my-3 mx-2 col-3   border rounded shadow"><div> Nom : ' + user.name + '</div>'
                    +'<div>Prénom :' + user.firstname + '</div>'
                    +'<div>Photo de profil : ' + user.imageUrl + '</div></div>'
                    
                }))
            .catch(() => {
                console.log()
            })
        }
    },
    beforeMount(){
        this.showUsers()
    }


}
</script>

<style scoped lang="scss">


.containerFeed
{
    width: auto;
    margin: 0 20%;
}


</style>