<template>
  <div class="home">
    <HomeComponent msg="Bienvenue chez Groupomania"/>
    <FeedComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComponent from '@/components/HomeComponent.vue'
import FeedComponent from '@/components/FeedComponent.vue'

export default {
  name: 'Home',
  components: {
    HomeComponent, FeedComponent
  }
}
</script>
