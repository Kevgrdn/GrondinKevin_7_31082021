<template>
  <div id="nav">
    <router-link to="/" class="navLink">Accueil</router-link> 
    <router-link to="/about" class="navLink">A propos</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">

body
{
  background-color: #34495e;

}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #42b983;
  display: flex;
}


.navLink
{
  padding: 0 0.5%;
  margin: 3% 0 ;
}

#nav {
  display: flex;
  flex-direction: column;
  width: 10%;
  border-right: 0.1rem solid white;
  

 
  a {
    font-weight: bold;
    color: #42b983;
    margin: 0.5rem 1rem;
    padding: 1rem;
    border: solid;
    border-radius: 1rem;
    opacity: 0.7;
    transition: 0.3s;

    &:hover
    {
      opacity: 1;
    

    }
    
    


    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
