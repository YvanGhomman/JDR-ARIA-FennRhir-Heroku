<template>

  <Navbar/>
    <div>
      <button class="d-flex justify-content-center offset-lg-4 col-lg-4 offset-md-4 col-md-4 offset-sm-4 col-sm-4 col-6 offset-3 btn btn--dark mb-2 mt-2 " @click="active = !active">Créer un post</button>
      <div v-if="active" class="col-8 offset-2 text-center">
        <CreatePost/>
      </div>
    </div>
    <Articles/>


<Footer />
</template>

<script>

import Articles from '@/components/Articles.vue'
import Navbar from '@/components/Navbar.vue'
import CreatePost from '@/components/CreatePost.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Accueil',
  data() {
    return {
      active: false,
    }
  },
  components: {
    Articles,
    Navbar,
    CreatePost,
    Footer
  },
}
</script>

<style>
body{

  background:  url("../assets/fond2.jpg") no-repeat center fixed ;
    background-size: cover;
}
</style>
