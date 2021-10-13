<template>
    <div class="container-flex row">
      <div class="navbar d-flex">
            <a href="#feed" class="col-2"><img class="navLogo" src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania"> </a>
            <a href="#post" class="navLink col-2">Post</a>
            <a href="#users" class="navLink col-2">Vos collègues</a>
            <a href="#profile" class="navLink navLinkProfile col-2">Profil</a>
            <a href="#" class="navLink col-2">Déconnexion</a>
        </div>
      <div class="containerFeed w-50 col-6 center-block mx-auto h-auto">
        <h1 class="">Post</h1>
        <div class="w-100 d-flex flex-column ">
          <form @submit.prevent="post" class="border  rounded d-flex flex-column mx-2 p-3 shadow">
            <textarea v-model.trim="description" id="text" name="text" class="text_area rounded my-2 h-50 " required></textarea>
              <img v-if="picture" :src="pictureUrl" width="170px" class="d-block w-25" alt="Image">
                
               <input type="file" @change="loadPicture" class="mx-auto my-1 py-1 ">
                     
            <button class="btn-primary rounded w-25 mx-auto my-2 py-1">Post</button>
          </form> 
        </div>
      </div>  
    </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    msg: String
  },
  methods:{
    post()
    {
      const newPost = new FormData()
      if(this.picture) 
      {
        console.log(this.description);
        newPost.append('imageUrl', this.picture, this.picture.name)
        newPost.append('description', this.description)
        newPost.append('userId', this.userId)
        
        
        const requestOptions = {
                method: 'POST',
                body: JSON.stringify({'description':this.content, 'userId':this.userId}),
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
            }
        fetch('http://localhost:3000/api/post', requestOptions)
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

</style>