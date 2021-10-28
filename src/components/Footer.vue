<template>
<div class="footer fixed-bottom">


    <nav class="navbar navbar-expand-lg navbar-dark navbar-color space-between">
        <div class="offset-3 col-6 text-center">
            <router-link class="navbar-brand " to="/accueil"><img class="img__footer" src="../assets/logoAria.png" alt="Allons à l'accueil"></router-link>
        </div>
    </nav>
</div>
</template>

<script>

export default {
     name: 'Footer',
}
</script>

<style>

.img__footer{
    width: 10%;
      margin-top: -30px;
  margin-bottom: -30px;
  object-fit: contain;
}
@media screen and (max-width: 750px) {
.img__footer{
    width: 20%;
}}
@media screen and (max-width: 425px) {
.img__footer{
    width: 30%;
}}
.navbar-color{
background-color: black
}
</style>