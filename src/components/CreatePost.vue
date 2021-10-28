<template>
    <form enctype="multipart/form-data" class="row" id="checked">
        <div class="row justify-content-center">
            <div class="space-form col-sm-8 offset-sm-2 col-12 m-2 form-group">
                <input type="text" class="form-control" id="inputTitre" formControlName="titre" v-model="titre" placeholder="Titre" aria-label="Titre" required>
            </div>
            <div class="space-form col-sm-8 offset-sm-2 col-12 m-2 form-group">
                <textarea class="form-control" id="textarea" formControlName="contenu" v-model="contenu" placeholder="Quoi de neuf ?" aria-label="Textarea" required></textarea>
            </div>
        </div>
        <div class="space-form form-group">
            <input type="file" accept="image/*" id="imageInput" class="d-flex text-truncate col-sm-8 offset-sm-2 col-12" name="image" @change="onFileAdded(event)">
            <div class="d-flex justify-content-center">
                <img :src="imagePreview" v-if="imagePreview" class="m-2 imgBorder">
            </div>
        </div>
    </form>
        <div>
            <a @click="submitPost()" :class="{'button--disabled' : !validatedFields}" class=" offset-sm-3 col-sm-4 offset-3 col-6  center btn btn--dark mt-1" id="validateArticle"><span>Valider</span></a>
        </div>
</template>

<script>
import axios from 'axios'
import VueJwtDecode from "vue-jwt-decode";


export default {
    name: "CreatePost" ,
    data() {
        return {
            titre: '',
            contenu: '',
            id_user: '',
            imageUrl: '',
            imagePreview:'',
        }
    },
    methods: {

        onFileAdded(event){
            const imageInput = document.querySelector('input[type="file"]')
            const file = imageInput.files[0];
            this.imageUrl = file;
            
            
            const reader = new FileReader();
            reader.onload = () => {
            this.imagePreview = reader.result ;
            };
            reader.readAsDataURL(file);
        },

        submitPost() {
            if(document.getElementById('textarea').value == '' || document.getElementById('inputTitre').value == ''){
                 alert("Vous n'avez pas rempli certains champs requis 😅")
             }else{

            const user_Id = VueJwtDecode.decode(sessionStorage.getItem("token")).userId;
            const titre = document.getElementById('inputTitre').value;
            const contenu=document.getElementById('textarea').value;
            const imageUrl = this.imageUrl
           
            const formData = new FormData();
            formData.append('image', imageUrl);
            formData.append('titre', titre);
            formData.append('contenu', contenu);
            formData.append('id_user', user_Id);

            axios.post('http://localhost:3000/article/', formData, {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
                    'content-Type': 'multipart/form-data'
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
    computed: {
    validatedFields: function () {
        if (this.titre != "" && this.contenu != "") {
          return true;
        } else {
          return false;
        }
      }
    },
}
</script>

<style>
/* $color-primary : #091f43 ;
$color-secondary : #d1515a;
$color-tertiary :  #d4d4d4;
$color-4 :#FD2D01 */

.btn--groupomania__blue{
    background: #091f43;
    transition: .4s background-color;
    color: white;
    border-radius: 10px;
}
.btn--groupomania__blue:hover{
    background-color: #244982;
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
.imgBorder{
    border-radius: 10%;
    border:#FD2D01 solid 2px;
    object-fit: cover;
    object-position: 50% 50%;
    height: 150px;
    width: 150px;
}

</style>
