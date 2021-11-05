<template>
    <div class="container-flex row my-2 " >
      <div class="containerFeed col-8 center-block mx-auto h-auto">
        <div class="w-100 d-flex flex-column ">
          <form @submit.prevent="post" enctype="multipart/form-data" class="border  rounded d-flex flex-column mx-2 p-3 shadow">
            <textarea v-model.trim="postInformations.description" id="text" name="text" placeholder="Exprimez-vous ici" class="text_area rounded my-2 h-50 " required></textarea>
            <img  v-if="picture" :src="pictureUrl"  width="170px" class="d-block w-25" alt="Image">
            <label for="file" class="btn-primary rounded col-6 mx-auto"><i class="far fa-images"></i> Choisir une image ...</label>  
            <input type="file" @change="loadPicture" name="file" id="file" class="mx-auto my-1 py-1 btn-primary inputfile ">        
            <button class="btn-primary rounded w-25 mx-auto my-2 py-1"><i class="far fa-paper-plane"></i> Post</button>
          </form> 
        </div>
      </div>  
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

<style  scoped lang="scss">

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