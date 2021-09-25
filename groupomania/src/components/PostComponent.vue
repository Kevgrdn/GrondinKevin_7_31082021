<template>
    <div class="container-flex row">
        <div class="navbar">
            <a href="#feed"><img class="navLogo" src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania"> </a>
            <a href="#post" class="navLink">Post</a>
            <a href="#chat" class="navLink">Discussion</a> 
            <a href="#collegues" class="navLink">Vos collègues</a>
            <a href="#profile" class="navLink navLinkProfile">Profil</a>
            <a href="#" class="navLink">Déconnexion</a>
        </div>
        <div class="containerFeed w-50 col-6 center-block mx-auto h-auto">
          <h1 class="">Post</h1>
          <div class="w-100 d-flex flex-column ">
            <textarea id="text" name="text" class="text_area rounded my-2 " required></textarea>
            <label  class="" for="image">Ajouter un fichier(format Jpg, Jpeg, Png ou MP4 acceptés)</label>
            <input id="file" class="mx-auto" type="file" ref="image">           
            <button v-on:click="post" class="btn-primary rounded w-25 mx-auto my-5">Post</button>
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
    post(){
      let text = '"description":' + JSON.stringify(document.getElementById('text').value) + ',' 
      let file = '"imageUrl":' + JSON.stringify(document.getElementById('file'))


      let postInformations = '{' + text + file + '}'
      
      console.log(postInformations)
      const requestOptions = {
        method: 'POST',
        body: postInformations, 
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
      
      fetch('http://localhost:3000/api/post/', requestOptions)
      .then((response) => response.json())
      .then((apiData) => console.log(apiData))
      .catch(() => {
          console.log(postInformations)
      })   

    }  
  }

}


</script>

<style  scoped lang="scss">

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

.text_area
{

}

</style>