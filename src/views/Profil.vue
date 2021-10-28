<template>
    <div>
        <Navbar/> 
        <div class="container">
          <div>
            <img class="img d-flex col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12" alt="Aria" src="../assets/aria_gif_square.gif">
          </div>

        <div class="card shadow-lg text-center pt-4 pb-4 ">
            <div>
                <img class="imgProfilPicUser col-2 " v-if="profilPicOriginal" :src="profilPicOriginal" alt="">
            </div>
            <h1 class="text-center ">Votre Profil</h1>
            <h3 class="article-content fontMiniTextTitre">Nom : {{nom_complet}}</h3>
            <h3 class="article-content fontMiniTextTitre">Pseudo : {{pseudo}}</h3>
        
                <div class="container">
                    <!-- Trigger the modal with a button -->
                    <button type="button" id="btnModal" class="btn btn-secondary btn-lg col-sm-4 col-6 fontMini" data-toggle="modal" data-target="#myModal" aria-expanded="false">Éditer</button>
                    <!-- Modal -->
                    <div class="modal fade" id="myModal" role="dialog">
                        <div class="modal-dialog">
                        
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close btn btn-danger" data-dismiss="modal">X</button>
                                <h5 class="modal-title">Saisissez votre mot de passe</h5>
                            </div>
                            <div class="modal-body">
                                <form class="row" id="checked" >
                                    <div class="space-form col-sm-6 offset-sm-3 col-10 offset-1">
                                        <input type="password" v-model="password" class="form-control" id="inputPassword2" placeholder="🔐 Password" aria-label="Password" required>
                                    </div>
                                </form>
                                <a @click="checkProfil()" class="btn btn--dark col-4 offset-4 m-2" id="modif">Valider</a>
                            </div> 
                        </div>
                    </div>
                    </div>
                </div>


                <div v-if="profil===true" class="row col-10 offset-1">
                    <button class="btn btn--dark col-sm-4 offset-sm-4 col-10 offset-1 mt-2 mb-2 fontMini" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Modifier ✏
                    </button>
 
                    <div class="collapse" id="collapseExample">
                        <div>
                            <form enctype="multipart/form-data" class="row" id="checked" >
                                <div class="form-group">
                                    <input type="file" accept="image/*" id="imageInput" name="profilPic" class="text-truncate col-sm-8 offset-sm-2 col-12" @change="onFileAdded(event)" required>
                                    <div class="d-flex justify-content-center">
                                        <img :src="imagePreview" v-if="imagePreview" class="imgProfilPic m-2">   
                                    </div>
                                    
                                </div>
                                <div class="space-form col-sm-6 offset-sm-3">
                                    <input type="text" v-model="userName" class="form-control" id="inputNom" placeholder="👍 Nom" aria-label="Nom" pattern="[A-Za-z]{2,50}" required>
                                </div>
                                
                                <div class="space-form col-sm-6 offset-sm-3">
                                    <input type="text" v-model="userFirstname" class="form-control" id="inputPrenom" placeholder= "👉 Prénom" aria-label="Prenom" pattern="[A-Za-z]{2,50}" required>
                                </div>
                                <div class="space-form col-sm-6 offset-sm-3">
                                    <input type="text" v-model="job" class="form-control" id="inputJob" placeholder= "💼 Job" aria-label="Job" pattern="[A-Za-z]{2,50}" required>
                                </div>
                                <div class="space-form col-sm-6 offset-sm-3">
                                    <input type="email" v-model="email" class="form-control" id="inputEmail" placeholder= "📧 E-mail" aria-label="Email" pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" required>
                                </div>
                                <div class="space-form col-sm-6 offset-sm-3">
                                    <input type="text" v-model="password" class="form-control" id="inputPassword" placeholder="🔐 Password" aria-label="Password" required>
                                </div>
                            </form>
                            <a @click="updateProfil()" class="fontMini btn btn--dark col-sm-4 offset-sm-4 col-10 offset-1  m-2" id="modif">Valider ✔</a>
                        </div>
                    </div>
                    <button @click="deleteProfil(id)" class="fontMini btn btn-danger col-sm-4 offset-sm-4 col-10 offset-1 mt-2 mb-2" id="suppr">Supprimer ❌</button>
                </div>
            </div>             
        </div>
        <Description/>
        <Competences/>

        <div v-if="isAdmin == 1"  class="mt-5 text-center d-flex justify-content-center">
            <div class="col-lg-6  col-md-8 o col-12 ">
                <h1>Liste des Profils</h1>
                <div class=" m-2" v-if="utilisateurs" v-for="user in utilisateurs" :key="user.id">
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <div class="">
                                <img class="imgProfilPic col-2 " v-if="user.profilPic" :src="user.profilPic" alt="">
                            </div>
                            <h3 class="article-content text-success" v-if="user.admin == 1">Admin</h3>
                            <h4 class="article-content fontMiniTextTitre">Nom : {{user.name}}</h4>
                            <h4 class="article-content fontMiniTextTitre">Prénom : {{user.firstname}}</h4>
                            <h4 class="article-content fontMiniTextTitre">Poste : {{user.job}}</h4>
                            <h4 class="article-content fontMiniTextTitre">E-mail : {{user.email}}</h4>

                            <div v-if="isAdmin == 1" class="row mt-5">
                                
                            
                                <!-- Trigger the modal with a button -->
                                <button @click="getPosts(user.id)" type="button" id="btnModal" class="fontMini col-sm-4 col-6 btn btn--dark" data-toggle="modal" :data-target="'#myModal'+user.id" aria-expanded="false">Posts 🔎</button>
                                <!-- Modal -->
                                <div class="modal fade" :id="'myModal'+user.id" role="dialog">
                                    <div class="modal-dialog">
                                    <!-- Modal content-->
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close btn btn-danger" data-dismiss="modal">X</button>
                                                <h5>Posts de l'utilisateur</h5>
                                            </div>
                                            <div class="modal-body">
                                                <div class="card m-2 shadow-sm card-body" v-if="posts" v-for="post in posts" :key="post.id">
                                                    <h5 class="fontMiniTextTitre">{{post.titre}}</h5>
                                                    <p class="fontMiniText">{{post.contenu}}</p>
                                                    <img class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 imgCard" v-if="post.imageUrl" :src="post.imageUrl" alt="">
                                                    <p class="card-text text-end fontDate">Posté le {{datePost(post.date_creation)}}</p>
                                                    <a v-if="isAdmin == 1" @click="deletePostAdmin(post.id)"  class="offset-8 col-4 Supp offset-1"><i class="offset-11 far fa-trash-alt poubelle text-danger"></i></a>
                                                    <!-- <a v-if="comm.id_user == userIdSession || isAdmin == 1" @click="deleteComm(comm.id)"  class=" offset-8 col-4 Supp offset-1"><i class="offset-11 far fa-trash-alt poubelle text-danger"></i></a> -->
                                                </div>
                                                <div v-else>
                                                    <h5 class="text-center">Il n'y a pas de posts pour cet utilisateur 🤔</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="offset-sm-7 col-sm-1 col-1 offset-4">
                                       <a @click="deleteProfilAdmin(user.id)" ><i class="offset-sm-11  far fa-trash-alt poubelle text-danger"></i></a>
                                </div>
                            </div>
                        </div>
            </div>
        </div>
    </div>




    </div>
    </div>
    <Footer/>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue';
import Description from '@/components/Description.vue';
import Competences from '@/components/Competences.vue';

import Footer from '@/components/Footer.vue';
import axios from 'axios';
import VueJwtDecode from "vue-jwt-decode";


export default {
  name: 'About',
  data(){
    return{
        nom_complet: VueJwtDecode.decode(sessionStorage.getItem("token")).userNom_complet,
        id: VueJwtDecode.decode(sessionStorage.getItem("token")).userId,
        pseudo: VueJwtDecode.decode(sessionStorage.getItem("token")).userPseudo,
        profilPicOriginal: VueJwtDecode.decode(sessionStorage.getItem("token")).profilPic,
        profil: "",
        posts:"",
        profilPic: "",
        imagePreview: "",
        isAdmin: VueJwtDecode.decode(sessionStorage.getItem("token")).isAdmin,
        utilisateurs: axios.get('http://localhost:3000/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                    }
                })
                    .then((response) => {
                    this.utilisateurs = response.data
                    })
    }
    
  },
  components: {
    Navbar,
    Description,
    Competences,
    Footer
  },
  methods: {
        checkProfil(){
            let FormValid = document.getElementById('checked').checkValidity();
            if (FormValid == false ) {
                alert(`Vous n'avez pas rempli tous les champs requis !`);
            }else{
            
            //variable qui reccueille les infos de contact du client
                let contact = {
                    password : document.getElementById('inputPassword2').value,
                    pseudo : VueJwtDecode.decode(sessionStorage.getItem("token")).userPseudo
                }; 
                
                
            //on POST les infos reccueillies au serveur
                const envoi =  fetch("http://localhost:3000/user/login", {
                method: 'POST',
                body: JSON.stringify(contact),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            //traitement de la réponse du serveur
                envoi.then(async response =>{
                    try{
                    //récupération de la réponse du serveur
                        let confirmation = await response.json();
                        if (confirmation.error){
                            console.log("error")
                            alert("Mot de passe invalide !")
                        }else{
                        document.querySelector(".modal-backdrop").remove()
                        document.getElementById('btnModal').remove()
                        document.getElementById('myModal').remove()
                        this.profil = true
                        }
                //traitement des erreurs
                    } catch (error) {
                        console.log(error);
                        alert("Un problème est survenu, merci de réessayer plus tard");
                    }
                });
            };

        },
        onFileAdded(event){
            const imageInput = document.querySelector('input[type="file"]')
            const file = imageInput.files[0];
            this.profilPic = file;            
            const reader = new FileReader();
            reader.onload = () => {
            this.imagePreview = reader.result ;
            };
            reader.readAsDataURL(file);
        },


    deleteProfil(data) {
           if(confirm("Supprimer le profil ?")){
             const user_id = VueJwtDecode.decode(sessionStorage.getItem("token")).userId;
               axios.delete('http://localhost:3000/user/' + user_id, {
                   method: "DELETE",
                   headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }})
               .then(function(response) {
                    sessionStorage.clear();
                    window.location.href= "/";
                })
                .catch(function(error) {
                    console.log(error);
                }); 
           }
       },
       updateProfil(){
        let FormValid = document.getElementById('checked').checkValidity();
         if (FormValid == false ) {
            alert(`Vous n'avez pas rempli tous les champs requis !`);
        }else{
        
        //variable qui reccueille les infos de contact du client
            
               const firstname = document.getElementById('inputPrenom').value;
               const name = document.getElementById('inputNom').value;
               const job = document.getElementById('inputJob').value;
               const password = document.getElementById('inputPassword').value;
               const email = document.getElementById('inputEmail').value;
               const admin = this.isAdmin;
               const profilPic = this.profilPic
           
            
            const user_id = VueJwtDecode.decode(sessionStorage.getItem("token")).userId;

           
            const formData = new FormData();
            formData.append('profilPic', profilPic);
            formData.append('firstname', firstname);
            formData.append('name', name);
            formData.append('job', job);
            formData.append('password', password);
            formData.append('email', email);
            formData.append('admin', admin);

        //on POST les infos reccueillies au serveur
            axios.put("http://localhost:3000/user/" + user_id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }
            })
        //traitement de la réponse du serveur
            .then(async response =>{
                try{
                //récupération de la réponse du serveur
                    let confirmation = await response.data;
                    sessionStorage.clear();
                    window.location.href= "/";

                    
            //traitement des erreurs
                } catch (error) {
                    console.log(error);
                    alert("Un problème est survenu, merci de réessayer plus tard");
                }
            });
         };
    },
    deleteProfilAdmin(data) {
           if(confirm("Supprimer le profil ?")){
               axios.delete('http://localhost:3000/user/' + data, {
                   method: "DELETE",
                   headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }})
               .then(function(response) {
                    window.location.href= "/about";
                })
                .catch(function(error) {
                    console.log(error);
                }); 
           }
       },
       getPosts(data){
            this.posts = "";
            axios.get("http://localhost:3000/article/article/" + data, {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }})
            .then((response) => {
            this.posts = response.data;
            })
            .catch((err) => console.log("Erreur : " + err));

        },
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
        deletePostAdmin(data){
            if(confirm("Supprimer ce post ?")){
               axios.delete('http://localhost:3000/article/' + data, {
                   method: "DELETE",
                   headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }})
               .then(function(response) {
                    window.location.href= "/about";
                })
                .catch(function(error) {
                    console.log(error);
                }); 
           }
        }
  }
}
</script>

<style>
body{
 background:  url("../assets/fond2.jpg") no-repeat center fixed ;
 background-size: cover;
}
.modal-content {
  border-radius: 16px;
    border:black solid 3px;
}

.poubelle{
font-size: 25px;
display: flex;
justify-items: center;
cursor: pointer;
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
.btn-danger{
    border-radius: 10px;
}

.imgProfilPic{
    border-radius: 50%;
    border:#D08A63 solid 5px;
    object-fit: cover;
    object-position: 50% 50%;
    height: 100px;
    width: 100px;
}
.imgProfilPicUser{
    border-radius: 50%;
    border:#D08A63 solid 5px;
    object-fit: cover;
    object-position: 50% 50%;
    height: 150px;
    width: 150px;
}

.img {
  height: 400px;
  margin-bottom: -100px;
  object-fit: contain;
}
 @media screen and (max-width: 425px) {
.img {
  height: 300px;
}
 
    }
.card {
  max-width: 100%;
  display: flex;
  align-content: center;
  background-color: #e9e9e9;
  border-radius: 16px;
  padding:20px;
}

.fontDate{
            font-size: 0.7rem;
    }
@media screen and (max-width: 750px) {
    
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

</style>