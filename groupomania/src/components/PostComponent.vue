<template>
  <div class="row ">
    <form @submit.prevent="post" enctype="multipart/form-data" class="bg-perso d-flex rounded-perso flex-column col-11 col-md-8 my-2 mx-auto p-3 shadow">
      <textarea v-model.trim="postInformations.description" id="text" name="text" placeholder="Exprimez-vous ici" class="rounded my-2 col-12 mx-auto  " required></textarea>
      <img  v-if="picture" :src="pictureUrl"  width="170px" class="d-block w-25" alt="Image">
      <label for="file" class="btn-primary rounded col-12 col-md-6 mx-auto" title="Envoyer une image"><i class="far fa-images"></i> Choisir une image ...</label>  
      <input type="file" @change="loadPicture" name="file" id="file" class="mx-auto my-1 py-1 btn-primary inputfile " >        
      <button class="btn-primary rounded mx-auto my-2 py-1 col-8 col-md-6" title="Poster"><i class="far fa-paper-plane"></i> Post</button>
    </form>
  </div> 
</template>

<script>
import axios from 'axios'

export default {
  name: 'Post',
  props: {
    msg: String
  },
  data(){
    return{
      postInformations: {
        description:'',
        imageUrl:'',
        userId: JSON.parse(localStorage.getItem('userInformations')).id,

      }
    }
  },
  methods:{
    post()
    {
      const newPost = new FormData()
      if(this.picture) 
      {
        console.log(this.description);
        newPost.append('image', this.picture)
        newPost.append('description', this.postInformations.description)
        newPost.append('userId', this.postInformations.userId)
        
        console.log(this.picture)
        //const requestOptions = { description: this.postInformations.description, imageUrl: this.picture}
        axios.post('/post', newPost)
        .then (console.log(newPost))
        .catch (err => console.log(err))
      }
    },
    loadPicture(event) 
    {
      if(event.target.files.length === 0) {return}

      this.picture = event.target.files[0]         
    },   
  }  
}



</script>

<style  lang="scss">

.shadow
{
  box-shadow: 10px 10px 10px white;
}

.inputfile{
  width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
</style>