<template>
  <Navbar/>
  <div>
    <img class="imgAria d-flex col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12" alt="Aria" src="../assets/logoAria.png">
  </div>
  <div>
    <img class="imgAccueil d-flex col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12" alt="Aria" src="../assets/aria_gif_square.gif">
  </div>
  <div class="d-flex flex-column align-items-center col-12">
        <div class=" col-lg-10 col-12 m-2">
            <div class="card shadow">
                <div class="card-body">
                  
                  <h1>BIENVENUE SUR JDR - ARIA</h1>
                  <h2>Retrouvez ici l'intégralité des aventures d'amis jouant au jeu de rôle Aria</h2>
                  <br>
                  <div class="container media col-10 offset-1">
                    <router-link class="card col-lg-4 col-12 card-link" to="/epopee">
                      <h3>L'Épopée</h3>
                      <p>C'est là que le MJ Fenn Rhir nous fait part des péripéties que vivent nos compagnons.<br>Découvrez leur expédition !</p>
                    </router-link>
                    <router-link class="card col-lg-4 col-12 card-link" to="/aventuriers">
                      <h3>Aventuriers</h3>
                      <p>Retrouvez sur cette page une fiche descriptive de nos comparses.<br>Décelez leurs secrets ...</p>
                    </router-link>
                    <router-link class="card col-lg-4 col-12 card-link" to="/profil">
                      <h3>Profil</h3>
                      <p>Ici, aventurier, tu pourras modifier tes informations, tes caractéristiques et autres compétences de ton personnage.</p>
                    </router-link>
                  </div>
                  <br>
                  
                  <DernierArticle/>
                </div>
                  </div>
                  </div>
                  </div>

<Footer />
</template>

<script>

import DernierArticle from '@/components/DernierArticle.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Accueil',
  data() {
    return {
    }
  },
  components: {
    DernierArticle,
    Navbar,
    Footer
  },
}
</script>

<style>

@media screen and (max-width: 2000px) { 
    .media{
         display: flex ;
    }    
 }
@media screen and (max-width: 992px) { 
    .media{
        display: flex ;
        flex-direction: column;
        align-items: center;
    }
 }

h1{
  color: black;
  font-weight: bolder;
font-family: 'MedievalSharp', cursive;
}

body{
  background:  url("../assets/fond2.jpg") no-repeat center fixed ;
    background-size: cover;
}
.card-link{
  border: none;
  background-color: unset;
  transition: .8s background-color;
  text-decoration : none;
  color : #212529
}
.card-link:hover{
  color : white;
  background-color: #B2A153;
/* #72603b */
}
.card-link > h3{
  font-family: 'MedievalSharp', cursive;
  font-weight: bolder;
}


.imgAria {
  height: 500px;
  margin-top: -100px;
  margin-bottom: -100px;
  object-fit: contain;
}
 @media screen and (max-width: 425px) {
.imgAria {
  height: 300px;
  margin-top: -80px;
}
 }
.imgAccueil {
  height: 300px;
  margin-top: -250px;
  margin-bottom: -10px;
  object-fit: contain;
}
 @media screen and (max-width: 425px) {
.imgAccueil {
  height: 200px;
    margin-top: -150px;
}
 }
</style>
