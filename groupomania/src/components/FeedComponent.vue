<template>
    <div class="container-flex">
       
        <div class="navbar d-flex">
            <a href="#feed" class="col-2"><img class="navLogo" src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania"> </a>
            <a href="#post" class="navLink col-2">Post</a>
            <a href="#users" class="navLink col-2">Vos collègues</a>
            <a href="#profile" class="navLink navLinkProfile col-2">Profil</a>
            <a href="#" class="navLink col-2">Déconnexion</a>
        </div>
        <div class="my-3">
            <h1>Fil d'actualités</h1>
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
                    +='<div class="my-5 p-3 border rounded"><div class=""><div>'+ post.description
                    + '</div><div>' + post.imageUrl + '</div>'
                    + '<button class="rounded btn-primary"><box-icon name="like"></box-icon>'+ post.liked +'</button>' +'</div>'
                    + '<div><textarea id="commentary" name="commentary" class="text_area rounded my-2 w-100 " required></textarea>'
                    +' <Commentary/>' 
                    + '<button class="btn-primary rounded">Commenter</button> </div></div>' 
                   
                }))
                         
            .catch(() => {
                console.log()
            }) 
        },
        commentary(){
            let commentary = '{"comment":' + JSON.stringify(document.getElementById('comment').value) + '}'         
                        
            console.log(commentary)
            const requestOptions = {
                method: 'POST',
                body: commentary, 
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
            }
            
            fetch('http://localhost:3000/api/post/:id/commentary', requestOptions)
            .then((response) => response.json())
            .then((apiData) => console.log(apiData))
            .catch(() => {
                console.log(commentary)
            })   
        }              
    },
    beforeMount(){
        this.showPosts()
    }
       
}

</script>

<style lang="scss">






</style>