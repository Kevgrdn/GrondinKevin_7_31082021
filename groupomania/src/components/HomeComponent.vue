<template>
  <div class="hello">
   <img class="Logo" src="../assets/icon-left-font-monochrome-white.png" alt="Logo">
  
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.hello
{
  display: flex;
  justify-content: left;
  margin: 0 2%;
  border-bottom: 0.1rem solid white ;
  
}

.Logo
{
  height: 10rem;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
