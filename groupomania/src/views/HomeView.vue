<template>
  <div class="home">
    <LoginComponent/>  
  </div>
</template>

<script>
// @ is an alias to /src
import LoginComponent from '@/components/LoginComponent.vue'

export default {
  name: 'Home',
  components: {
    LoginComponent
  }
}


</script>

<style lang="scss">
.home
{
  justify-content: center;
  display: flex;
  margin: auto;
}

</style>