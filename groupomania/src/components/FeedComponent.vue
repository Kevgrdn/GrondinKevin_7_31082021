<template>
    <div class="row">
        
        <!--Boucle sur les posts + Affichage des posts-->
        <div v-for="post in posts" v-bind:key="post.id" class="bg-perso shadow col-11 col-md-8 my-2 flex-column mx-auto rounded-perso">
            <div class="my-3 " v-bind:id="post.id">
                <div class="d-flex">
                    
                    <!--Auteur du post + Heure du post-->
                    <img v-if="post.author.imageUrl !== '' || null" :src="post.author.imageUrl" class="mx-2  pdp2 d-inline ">
                    <img v-if="post.author.imageUrl == '' || null" src="https://st3.depositphotos.com/19428878/36416/v/450/depositphotos_364169666-stock-illustration-default-avatar-profile-icon-vector.jpg" class="mx-2  pdp2 d-inline ">
                    <div class=" text-start">
                        <div class="mx-2  fw-bolder">{{post.author.firstname}} {{post.author.name}}</div>
                        <div class="mx-2 fs-6 fst-italic">{{post.createdAt}} </div>
                    </div>
                </div>
                
                <!--Description du post + Photo-->
                <div class="colorSecondary py-2 my-2 rounded">
                    <div class="my-2 text-start mx-1">{{post.description}}</div>
                    <img  :src="post.imageUrl" class="w-100">
                </div>

                <!--Boutons Like/Delete du post-->
                <button @click="likePost" :data-id="post.id" class="btn-primary rounded my-2 col-4" title="J'aime">
                    <span :data-id="post.id">{{post.liked}}</span>  <i :data-id="post.id" class="far fa-thumbs-up"></i></button>
                <button v-if="post.author.id == this.userId || this.isModerator == 1 " @click="deletePost" :data-id="post.id" class="btn-danger  py-2 rounded col-4" title="Supprimer"><i :data-id="post.id" class="far fa-trash-alt"></i></button>
            </div>

                <!--Partie création de commentaires-->
                <div v-bind:id="post.id" class="row my-2 justify-content-center">
                    <textarea  v-model.trim="comments[post.id]"  :name="'comment-' + post.id " id="comments" cols="auto" rows="auto" placeholder="Votre commentaire" required class="col-9 col-md-10"></textarea>
                    <button  :data-id="post.id" @click="sendCommentaries" class="btn-primary  mx-1 col-2  col-md-1 " title="Envoyer le commentaire"><i :data-id="post.id" class="far fa-comments"></i></button>
                </div>
            
            <!--Boucle sur les commentaires du post avec l'ID de celui-ci--> 
            <div :id="'comment-' + post.id" class="hide  flex-column col-12">
                <div v-for="comment in commentaries.comments" v-bind:key="comment.id"  class="row mx-1 justify-content-around">

                
                <!--Partie commentaires-->
                <div v-if="comment.postId == post.id "  class="my-2 colorSecondary rounded-perso col-12 my-3 py-2">
                    
                    <!--Photo de profil de l'auteur du commentaire-->
                    <div v-if="comment.postId == post.id" class="w-auto px-0 d-flex align-items-center">
                        <img v-if="comment.author.imageUrl !== '' || null" :src="comment.author.imageUrl" alt="Photo de profil" class=" pdp2  ">
                        <img v-if="comment.author.imageUrl == '' || null" src="https://st3.depositphotos.com/19428878/36416/v/450/depositphotos_364169666-stock-illustration-default-avatar-profile-icon-vector.jpg" class="pdp2 my-2"> 
                    </div>

                    <!--Auteur du commentaire + heure du commentaire-->
                    <div v-if="comment.postId == post.id" class="text-start fw-bold">
                        {{comment.author.firstname}} {{comment.author.name}}
                    </div>
                    <div v-if="comment.postId == post.id" class="color-secondary fst-italic text-start">
                        {{comment.createdAt}}
                    </div>

                    <!--Contenu du commentaire-->
                    <div v-if="comment.postId == post.id" class="bg-secondary my-3 text-start text-light fw-bold p-2 rounded-perso ">
                        {{comment.content}}
                    </div>
                </div>    
                </div>
            </div>   
            

            <!--Bouton "Afficher les commentaires"-->
            <div v-bind:id="post.id">
                <button :data-id="post.id" @click="showCommentaries" class="btn-primary rounded-perso shadow my-3" title="Afficher les commentaires"><i :data-id="post.id" class="far fa-comment-dots"></i> Afficher les commentaires</button>
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
            comments:[],
            description:'',
            liked: 0,
            pdp:'',
            currentPost:'',
            userId: JSON.parse(localStorage.getItem('userInformations')).id,
            isModerator: JSON.parse(localStorage.getItem('userInformations')).is_moderator ,
            commentaries:{
                comments:[],

            }
        }

    },

    methods:{
        // GET POST / AFFICHER LES POST SUR LA PAGE
        afficherPosts(){
            axios.get('/post', {headers:{'Authorization': 'Bearer '  + localStorage.getItem('token')}})
            .then((response) => {
                this.posts = localStorage.setItem('postInfo', JSON.stringify(response.data))  
                this.posts = response.data
                console.log(this.posts)
                console.log(this.isModerator)

            })
            .catch(err => console.log(err))                       
        },

        //POST COMMENTAIRES / ENVOYER DES COMMENTAIRES 
        sendCommentaries(){
            var id = event.target.getAttribute('data-id');

            //console.log(event.target)
            
            axios.post('/post/'+ id +'/commentary', {content: this.comments[id], userId: this.userId, postId: id}, {headers:{'Authorization': 'Bearer '  + localStorage.getItem('token')}})
            .then(res => {
            console.log(res)})
            .catch(err => {console.log(err)
                alert("Veuillez écrire dans le champ avant d'envoyer votre commentaire")
            })
            
        },

        //GET COMMENTAIRES / AFFICHER LES COMMENTAIRES
        showCommentaries(){
            var id = event.target.getAttribute('data-id');
            console.log(id)
            axios.get('/post/' + id +'/commentary', {headers:{'Authorization': 'Bearer '  + localStorage.getItem('token')}})
            .then(res => {
                this.commentaries.comments = res.data
                console.log(res.data)
                this.toggle(id)
                })
            .catch(err => console.log(err))
        },

        //PUT LIKE / LIKER LES POSTS
        likePost(){
            var id = event.target.getAttribute('data-id');
            
            if (this.liked == 0) {
                this.liked = 1 
                document.querySelector("span[data-id='" + id + "']").textContent = parseInt(document.querySelector("span[data-id='" + id + "']").textContent) + 1 

            }
            else  {
                this.liked = 0
                document.querySelector("span[data-id='" + id + "']").textContent = parseInt(document.querySelector("span[data-id='" + id + "']").textContent) - 1 

            }
            console.log(this.liked)
            axios.put('/post/' + id +'/like', { like : this.liked}, {headers:{'Authorization': 'Bearer '  + localStorage.getItem('token')}})
                .then(res => {
                console.log(res.data)
                })
                .catch(err => console.log(err))


        },

        //DELETE POST / SUPPRESSION DE POST
        deletePost(){
            var id = event.target.getAttribute('data-id')
            axios.delete('/post/' + id, {headers:{'Authorization': 'Bearer '  + localStorage.getItem('token')}})
            .then(res => {
                console.log(res.data)
                window.location.reload()
                })
            .catch(err => console.log(err))


        },

        //TOGGLE COMMENTAIRE
        toggle(id) {
           let visibility = document.getElementById('comment-'+ id).style.display
           console.log(visibility)
           if (visibility == 'none') {
               document.getElementById('comment-'+ id).style.display = 'flex'

           }
           else{
                document.getElementById('comment-'+ id).style.display = 'none'
           }
        },

        //VIDE LE LOCAL STORAGE LORS DU CLIC SUR DECONNEXION
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


.hide{
    display: none;
}
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
    width: 4rem;
    height: 4rem;
    border-radius: 10rem 10rem;
    object-fit: cover;
    padding: 0;

}
.colorSecondary{
    background-color: #2a3a4b
}



@media screen and (max-width: 1366) {
    .pdp2{
        width: 4rem;
        height: 4rem;
    }
    
}

</style>