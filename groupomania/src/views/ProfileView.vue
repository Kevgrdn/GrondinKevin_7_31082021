<template>
  <nav-component/>
  <profile-component/>
</template>



<script>
import ProfileComponent  from "../components/ProfileComponent.vue";
import NavComponent from '../components/NavComponent.vue';

export default {
    components : {ProfileComponent, NavComponent}

}
</script>
