<template>
  <nav-component/>
  <users-component/>  
</template>


<script>
import UsersComponent from '../components/UsersComponent.vue'
import NavComponent from '../components/NavComponent.vue';

export default {
  components: {UsersComponent, NavComponent }
    
}
</script>