<template>
    <h3 class="text">Voici le dernier article publié :</h3>
    <p class="text">(pour retrouver les autres épisodes de l'aventure, <router-link class="" to="/epopee">cliquez ici</router-link>)</p>
    <div class="d-flex flex-column align-items-center col-lg-10 offset-lg-1 col-12 ">
        <div class="col-12 m-2" v-if="donnees" >
            <div class="cardDernierArticle shadow-lg">
                <div class="card-body">
                    <div class="d-flex">
                        <img class="imgProfilPic col-2 " v-if="donnees.profilPic" :src="donnees.profilPic" alt="">
                        <h5 class="card-title mx-3 d-flex align-items-center fontMiniTextTitre">{{donnees.nom_complet}}</h5>
                    </div>
                    <h5 class="card-title fontMiniTextTitre fontTextTitre">{{donnees.titre}}</h5>    
                    <p class="card-text fontMiniText text-block">{{donnees.contenu}}</p>
                    <img class="col-lg-8 col-md-8 col-12 imgCard" v-if="donnees.imageUrl" :src="donnees.imageUrl" alt="">
                    <p class="card-text  text-end fontDate">Posté le {{datePost(donnees.date_creation)}}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import VueJwtDecode from "vue-jwt-decode";

export default {

    name: 'Presentation',
    data() {
        return {
            id_article: '',
            commentary: "",
            id_user: '',
            userIdSession: VueJwtDecode.decode(sessionStorage.getItem("token")).userId,
            isAdmin: VueJwtDecode.decode(sessionStorage.getItem("token")).isAdmin,
            commentaires: '',
            donnees: 
                axios.get('http://localhost:3000/article', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                    }
                })
                    .then((response) => {
                    this.donnees = response.data[0]
                    }) 
        }        
        
    },
     methods: {
            datePost(date) {
        const event = new Date(date);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        return event.toLocaleDateString("fr-Fr", options);
        },

    
},

}
</script>

<style lang="css" >
.text-block {
    white-space: pre-wrap;
    text-align: start;
    padding: 10px;
}

.btn--dark{
    background: black;
    transition: .4s background-color;
    color: white;
    border-radius: 10px;
}
.btn--dark:hover {
    background-color: #B2A153;
    color: white;
  }
 .button--disabled {
    background:#cecece;
    color:#ececec;
    border: none;
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
    color:#ececec
  }
.cardDernierArticle{
    border-radius: 10px;
}

.card {
  border-radius: 10px;
  padding:5px;
  border-color:black
}


.imgProfilPic{
    border-radius: 50%;
    border:#D08A63 solid 3px;
    object-fit: cover;
    object-position: 50% 50%;
    height: 70px;
    width: 70px;
}
 @media screen and (max-width: 750px) {
.imgProfilPic{
    height: 50px;
    width: 50px;
    }
 
    }
.imgCard{
    display: flex;
    margin-left: auto;
    margin-right: auto;
    object-fit: cover;
    object-position: 50% 50%;
    height: 400px;
    width: 400px;
    border-radius: 10px;
}
.fontTextTitre{
    font-weight: bolder;
}
.fontDate{
            font-size: 0.7rem;
    }
 @media screen and (max-width: 750px) {
    .imgCard{
        height: 300px;
        width: 300px;
    }
    .fontMini {
        font-size: 0.8rem;
    }
    .fontMiniText{
            font-size: 0.8rem;
    }
    .fontMiniTextTitre{
            font-size: 1rem;
    }
}
@media screen and (max-width: 430px) {
     .imgCard{
    height: 200px;
    width: 200px; 
}
}
@media screen and (max-width: 300px) {
     .imgCard{
    height: 150px;
    width: 150px; 
}
}
</style>
