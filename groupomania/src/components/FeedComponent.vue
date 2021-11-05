<template>
    <div class="container-flex">
        <div class="my-3 row">
            <div v-for="post in posts" v-bind:key="post.id" class="bg-perso col-8 d-flex flex-column mx-auto my-2 rounded-perso">
                <div class="my-3" v-bind:id="post.id">
                    <div class="d-flex">
                        <img :src="post.author.imageUrl" class="mx-2  pdp d-inline ">
                        <div class=" text-start">
                            <div class="mx-2  fw-bolder">{{post.author.firstname}} {{post.author.name}}</div>
                            <div class="mx-2 fs-6 fst-italic">{{post.createdAt}} </div>
                        </div>
                    </div>
                    <div class="colorSecondary py-2 my-2 rounded">
                        <div class="my-2 text-start mx-1">{{post.description}}</div>
                        <img :src="post.imageUrl" class="w-100">
                    </div>
                    <button @click="likePost" :data-id="post.id" class="btn-primary my-2 col-4" >{{post.liked}} <i class="far fa-thumbs-up"></i></button>
                    <!--<button v-if="this.userId == post.userId" :data-id="post.id" @click="updatePost" class="btn-secondary col-4  "> Modifier</button>
                    <textarea v-model.trim="description" name="" id="" cols="30" rows="10"></textarea>!-->
                    <button @click="deletePost" :data-id="post.id" class="btn-danger col-4"><i class="far fa-trash-alt"></i></button>
                </div>
                    <div v-bind:id="post.id" class="row my-2 justify-content-center">
                        <textarea v-model.trim="comments" name="" id="comments" cols="auto" rows="auto" placeholder="Votre commentaire" required class=" h-100 col-10"></textarea>
                        <button :data-id="post.id" @click="sendCommentaries" class="btn-primary  mx-1 col-1  "><i class="far fa-comments"></i></button>
                    </div>
                <div v-for="comment in commentaries.comments" v-bind:key="comment.id" class="row mx-1 justify-content-around">
                    <div v-if="comment.postId == post.id" class="col-1  ">
                        <img :src=comment.author.imageUrl alt="Photo de profil" class=" pdp2  ">
                    </div>
                    <div v-if="comment.postId == post.id" class="my-2 bg-secondary rounded col-10 ">
                        <div v-if="comment.postId == post.id">{{comment.author.firstname}}</div>
                        <div v-if="comment.postId == post.id">{{comment.author.name}}</div>
                        <div v-if="comment.postId == post.id">{{comment.content}}</div>
                    </div>
                   

                    
                </div>
                <div v-bind:id="post.id">
                    <button :data-id="post.id" @click="showCommentaries" class="btn-primary my-3"><i class="far fa-comment-dots"></i></button>
                </div>
                
                
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
            comments:'',
            description:'',
            liked: 0,
            pdp:'',
            userId: JSON.parse(localStorage.getItem('userInformations')).id,
            commentaries:{
                comments:[],

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
        afficherPdp(){
            console.log(this.posts.author.imageUrl)
        },
        sendCommentaries(){
            var id = event.target.getAttribute('data-id');
            console.log(id)
            axios.post('/post/'+ id +'/commentary', {content: this.comments, userId: this.userId, postId: id})
            .then(res => {
                console.log(res)
            })
        },
        showCommentaries(){
            var id = event.target.getAttribute('data-id');
            console.log(id)
            axios.get('/post/' + id +'/commentary')
            .then(res => {
                this.commentaries.comments = res.data
                console.log(res.data)
                })
            .catch(err => console.log(err))
        },
        likePost(){
            var id = event.target.getAttribute('data-id');
            
            if (this.liked == 0) {
                this.liked = 1 
            }
            else {
                this.liked = 0
            }
            axios.put('/post/' + id +'/like', { like : this.liked})
                .then(res => {
                console.log(res.data)
                })
                .catch(err => console.log(err))


        },
        updatePost(){
            var id = event.target.getAttribute('data-id');

            axios.put('/post' + id, { description: this.description} )
            .then(res => {
                console.log(res.data)
                })
            .catch(err => console.log(err))

        },
        deletePost(){
        
            var id = event.target.getAttribute('data-id')
            axios.delete('/post/' + id)
            .then(res => {
                console.log(res.data)
                })
            .catch(err => console.log(err))


        },
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

.rounded-perso{
    border-radius: 1rem 1rem;
}

.pdp{
    width: 5rem;
    height: 5rem;
    border-radius: 10rem 10rem;
    object-fit: cover;

}
.pdp2{
    width: 3rem;
    height: 3rem;
    border-radius: 10rem 10rem;
    object-fit: cover;
    padding: 0;

}
.colorSecondary{
    background-color: #2a3a4b
}

</style>