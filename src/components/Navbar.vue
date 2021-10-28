<template>
  <nav class="navbar navbar-expand-lg navbar-dark navbar-color">
    <div class="col-6">
        <router-link class="navbar-brand mx-2 d-flex justify-content-start" to="/accueil" ><img class="img__nav" src="../assets/logoAria.png" alt="Allons à l'accueil"></router-link>
    </div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-flex justify-content-end mx-2" id="navbarNav">
      <div class="navbar" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="col-4 nav-link" to="/epopee">L'Épopée</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="col-4 nav-link" to="/aventuriers">Aventuriers</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="col-4 nav-link" to="/profil">Profil</router-link>
          </li>
          <li class="nav-item">
            <router-link class="col-4 nav-link" @click="goAccueil()" to="/">Déconnexion</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

            

<script>

export default {
    name: 'Navbar',
    methods:{
      goAccueil() {
        sessionStorage.clear();
      }
      }
}
</script>
<style>
.navbar-color{
background-color: black
}
.img__nav{
    width: 15%;
  margin-top: -100px;
  margin-bottom: -100px;
  object-fit: contain;
}
@media screen and (max-width: 750px) {
.img__nav{
    width: 30%;
}}
@media screen and (max-width: 425px) {
.img__nav{
    width: 40%;
}}
</style>
