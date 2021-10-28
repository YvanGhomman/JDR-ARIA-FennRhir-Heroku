<template>
    <div class="d-flex flex-column align-items-center col-10 offset-1">
        <div class=" col-lg-8 col-md-10 col-12 m-2" v-if="donnees" v-for="item in donnees" :key="item.id">
            <div class="card shadow">
                <div class="card-body">
                    <div class="d-flex">
                        <img class="imgProfilPic col-2 " v-if="item.profilPic" :src="item.profilPic" alt="">
                        <h5 class="card-title mx-3 d-flex align-items-center fontMiniTextTitre">{{item.nom_complet}}</h5>
                    </div>
                    
                    <h5 class="card-title fontMiniTextTitre fontTextTitre">{{item.titre}}</h5>    
                    <p class="card-text fontMiniText text-block">{{item.contenu}}</p>
                    <img class="col-lg-8 col-md-8 col-12 imgCard" v-if="item.imageUrl" :src="item.imageUrl" alt="">
                    <p class="card-text  text-end fontDate">Posté le {{datePost(item.date_creation)}}</p>
                    <div class="row m-2">
                        <!-- Trigger the modal with a button -->
                        <button @click="getCom(item.id)" type="button" id="btnModal" class="col-lg-4 col-sm-4 col-8 btn btn--dark fontMini" data-toggle="modal" :data-target="'#myModal'+item.id" aria-expanded="false">Commentaires</button>
                        <!-- Modal -->
                        <div class="modal fade" :id="'myModal'+item.id" role="dialog">
                            <div class="modal-dialog">
                            <!-- Modal content-->
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close btn btn-danger" data-dismiss="modal">X</button>
                                    <h5>Commentaires</h5>
                                </div>
                                <div class="modal-body">
                                    <div class="card m-2 shadow-sm card__Comm card-body" v-if="commentaires" v-for="comm in commentaires" :key="comm.id">
                                        <div class="d-flex row mb-4">
                                            <div class="col-2">
                                                <img class="imgProfilPic col-2 " v-if="comm.profilPic" :src="comm.profilPic" alt="">
                                            </div>
                                            <h5 class="d-flex offset-sm-0 offset-2 col-6 fontMiniTextTitre align-items-center">{{comm.nom_complet}}</h5>
                                        </div>
                                            <p class="m-2 fontMiniText">{{comm.commentary}}</p>
                                            <p class="m-2 fontDate text-end">Posté le {{datePost(comm.date_creation)}}</p>
                                            <div class=" offset-11 col-1">
                                              <a v-if="comm.id_user == userIdSession || isAdmin == 1" @click="deleteComm(comm.id)"><i class=" far fa-trash-alt poubelle text-danger"></i></a>
                                          
                                            </div>
                                            
                                    </div>
                                    <div v-else>
                                        <h5 class="text-center" >Il n'y a pas de commentaires pour l'instant 😅</h5>
                                    </div>
                                <div class="row modal-footer ">
                                    <form class="row col-12" id="checked">
                                        <div class="space-form ">
                                            <textarea class="form-control" v-bind:id="item.id" placeholder="Commentaire" aria-label="Textarea" required></textarea>
                                        </div>
                                    </form>
                                    <a @click="createComm(item.id)" class="col-lg-4 col-md-4 col-sm-4 col-6 center fontMini btn btn--dark mt-1" id="validateComment"><span>Commenter</span></a>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-8 col-sm-8 col-4 d-flex justify-content-end align-items-center">
                        <a v-if="item.id_user == userIdSession || isAdmin == 1" @click="deletePost(item.id)"  class=" "><i class="  far fa-trash-alt poubelle text-danger"></i></a>
                    </div>
                    </div>
                </div>
              </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import VueJwtDecode from "vue-jwt-decode";

export default {

    name: 'Articles',
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
                    this.donnees = response.data
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

        deletePost(data) {
            if(confirm("Voulez-vous vraiment supprimer ce post ?")){
        axios.delete("http://localhost:3000/article/" + data, {
            method: "DELETE",
            headers: {
            'Authorization': "Bearer " + sessionStorage.getItem("token"),
            }, 
        })
            .then(function(response) { 
                document.location.reload();
            }) 
            .catch(function(error) { 
                console.log(error); 
            });
        }},

         createComm(data) {
             if(document.getElementById(data).value == ""){
                 alert("Vous n'avez rien écrit 😅")
             }else{

            const user_Id = VueJwtDecode.decode(sessionStorage.getItem("token")).userId;
            axios.post('http://localhost:3000/comment/', {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }, 
                id_article : data,
                commentary: document.getElementById(data).value,
                id_user: user_Id,
            }) 
            .then(function(response) { 
                document.location.reload(); 
            }) 
            .catch(function(error) { 
                console.log(error); 
            });
                         }
        },
        
        getCom(data){
            this.commentaires = "";
            axios.get("http://localhost:3000/comment/" +  data  + "/comment", {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }})
            .then((response) => {
            this.commentaires = response.data;
            })
            .catch((err) => console.log("Erreur : " + err));

        },

        deleteComm(data) {
            if(confirm("Voulez-vous vraiment supprimer ce commentaire ?")){
        axios.delete("http://localhost:3000/comment/" + data, {
            method: "DELETE",
            headers: {
            'Authorization': "Bearer " + sessionStorage.getItem("token"),
            }, 
        })
            .then(function(response) { 
                document.location.reload();
            }) 
            .catch(function(error) { 
                console.log(error); 
            });
        }
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

.card {
  border-radius: 10px;
  padding:5px;
  border-color:black
}
.modal-content {
  border-radius: 16px;
  border:black solid 3px;
}
.card__Comm {
  padding:10px;
}

.poubelle{
font-size: 25px;
display: flex;
justify-items: center;
cursor: pointer;
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
