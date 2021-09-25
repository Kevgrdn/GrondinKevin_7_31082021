<template>
  <router-view/>
</template>

<style lang="scss">

body
{
  background-color: #34495e;
  margin: 0;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #42b983;
  display: flex;
  justify-content: center;
}


#nav {
  display: flex;
  flex-direction: column;
  width: 10%;
  border-right: 0.1rem solid white;
  

 
  a {
    font-weight: bold;
    color: #42b983;
    padding: 1rem;
    border: solid;
    border-radius: 1rem;
    transition: 0.3s;

    &:hover
    {
      opacity: 0.7;

    }
    
    


    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.navLogo
{
    height: 8rem;
}
.Feed_1
{
  margin: 0 20%;
}
.Text
{
    color: white;
}

.navbar
{
  overflow: hidden;
  background-color: #34495e;
  border-right: 0.1rem white solid;
  position: fixed;
  top: 0;
  width: 15%;
  display: flex;
  flex-direction: column;

}
.navLink
{
  margin: 3% ;
  border-radius: 1rem;
  &:hover
  {
      background-color: white;
  }
  &:active
  {
      background-color: white;
  }
    
}

.navLinkProfile
{
    margin-top: 31rem;
}

.navbar  a {
  float: left;
  display: block;
  color: #eeeeee;
  text-align: center;
  padding: 15px 18px;
  text-decoration: none;
  font-size: 18px;
  transition: 0.2s;
}

.navbar a:hover {
  color: #1c87c9;
}
</style>
