<template>
    <div class="container-flex">
       
        <div class="navbar d-flex">
            <a href="#feed" class="col-2"><img class="navLogo" src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania"> </a>
            <a href="#post" class="navLink col-2">Post</a>
            <a href="#users" class="navLink col-2">Vos collègues</a>
            <a href="#profile" class="navLink navLinkProfile col-2">Profil</a>
            <a href="#" @click="disconnect" class="navLink col-2">Déconnexion</a>
        </div>
        <div class="my-3">
            <h1>Fil d'actualités</h1>
             <div class="Feed_1" id="posts">
            </div>
            <div v-for="post in posts" v-bind:key="post.id">
                <div>{{post.author.name}}</div>
                <div>{{post.author.firstname}}</div>
                <div>{{post.author.imageUrl}}</div>
                <div>{{post.description}}</div>
                   
                <img :src="post.imageUrl">
                <button @click="like">{{post.liked}}Like</button>

                <form @submit.prevent="commentary">
                    <textarea v-model.trim="comments" name="" id="" cols="30" rows="10"></textarea>
                    <button>Publier</button>
                </form>
                <button @click="showCommentaries"></button>
                
            </div>
        </div>  
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Feed',
    props: {
        msg: String
    },
    data(){
        return{
            posts:[],
            comments: [] ,
            postId:'',
            commentaries:{
                comments:[],
                post_id:'',
                userId:''
            }
        }

    },

    methods:{
        afficherPosts(){
            axios.get('/post')
            .then((response) => {
                this.posts = response.data
                console.log(this.posts)  
            } )
            .catch(err => console.log(err))    
            
                             
        },
        commentary(){
            axios.post('/post/')
        },
        showCommentaries(){
            console.log(this.posts)
            axios.get('/post/'+ this.posts.id +'/commentary')
            .then((response)=> {
                this.comment = response.data
                console.log(this.comment)
            })
            .catch(err => console.log(err))
        },
        /*commentary(){
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
        },*/
        disconnect(){
            localStorage.clear()
        }              
    },
    beforeMount(){
        this.afficherPosts()
    }
       
}

</script>

<style lang="scss">






</style>