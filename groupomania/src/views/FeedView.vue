<template>
    <Nav/>
    <post-component/>
    <FeedComponent/>
</template>

<script>
// @ is an alias to /src
import FeedComponent from '@/components/FeedComponent.vue'
import  Nav  from "@/components/NavComponent.vue";
import PostComponent from "../components/PostComponent.vue";
export default {
  name: 'Feed',
  components: {
    FeedComponent, 
    Nav,
    PostComponent
  }
}
</script>
