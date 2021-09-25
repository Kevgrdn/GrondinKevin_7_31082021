<template>
    <div class="container-flex">
       
        <div class="navbar">
            <a href="#feed"><img class="navLogo" src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania"> </a>
            <a href="#post" class="navLink">Post</a>
            <a href="#chat" class="navLink">Discussion</a> 
            <a href="#collegues" class="navLink">Vos collègues</a>
            <a href="#profile" class="navLink navLinkProfile">Profil</a>
            <a href="#" class="navLink">Déconnexion</a>
        </div>
        <div class="containerFeed">
            <h1>Feed</h1>
             <div class="Feed_1" id="posts">

            </div>
        </div>  
    </div>
</template>

<script>
export default {
    name: 'Feed',
    props: {
        msg: String
    },
    methods:{
        showPosts(){            
            
            
            fetch('http://localhost:3000/api/post/')
            .then((response) => response.json())
            .then((apiData) => 
                apiData.forEach(post => {
                    document.getElementById('posts').innerHTML
                    +='<div class="my-5"><div class=""><div>'+ post.description 
                    + '</div><div>' + post.imageUrl + '</div>'
                    + '<div>'+ post.likes + post.dislikes +'</div>' +'</div>'
                    + '<div><textarea id="comment" name="comment" class="text_area rounded my-2 w-100 " required></textarea> <button>Commenter</button> </div></div>' 
                }))
                         
            .catch(() => {
                console.log()
            }) 
        }              
    },
    beforeMount(){
        this.showPosts()
    }   
}

</script>

<style scoped lang="scss">

.container-flex
{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    
}



.containerFeed {
  display: flex;
  flex-direction: column;
  width: 100%;
}





</style>