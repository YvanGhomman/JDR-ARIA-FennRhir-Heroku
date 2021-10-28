<template>
    <form enctype="multipart/form-data" class="row justify-content-center" id="checked" v-if="mode == 'create'">
        <div class="form-group  m-1">
            <input type="file" accept="image/*" id="imageInput" name="profilPic" class="text-truncate justify-content-center col-sm-8 offset-sm-2 col-12" @change="onFileAdded(event)" required>
            <div class="d-flex justify-content-center">
                <img :src="imagePreview" v-if="imagePreview" class="imgProfilPic m-2">   
            </div>
        </div>
        <div class="space-form col-sm-8 col-12 m-1 form-group">
            <input type="text" v-model="pseudo" class="form-control" formControlName="pseudo" id="inputPseudo" placeholder="🧙‍♂️ Pseudo" aria-label="Pseudo" pattern="[A-Za-z]{2,50}" required>
        </div>
        <div class="space-form col-sm-8 col-12  m-1 form-group">
            <input type="text" v-model="nom_complet" class="form-control" formControlName="nom_complet" id="inputNom_complet" placeholder="🦸‍♂️ Nom complet" aria-label="Nom_complet" pattern="[A-Za-z]+[ ]+[A-Za-z]{2,50}" required>
        </div>
        <div class="space-form col-sm-8 col-12  m-1 form-group">
            <input type="password" v-model="password" class="form-control" formControlName="password" id="inputPassword" placeholder="🔐 Password" aria-label="Password" required>
        </div>
    </form>
    <div>
        <button class="button_create" :class="{'button--disabled' : !validatedFields}" @click="sendSignup()"><span class="white">Valider</span></button>
    </div>
</template>

<script>
import axios from 'axios'

export default {


   name: 'Signup',
   data() {
    return {
        mode: 'create',
        pseudo: '',
        admin: '',
        password: '',
        nom_complet: '',
        imagePreview:'',
        profilPic:''
    }
  },
   methods: {

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

    sendSignup(){
    //on vérifie que tout le formulaire est conforme
        let FormValid = document.getElementById('checked').checkValidity();

    //si formulaire pas conforme, alert le client
        if (FormValid == false ) {

            alert(`Vous n'avez pas rempli tous les champs requis !`);
    //sinon
        }else{
            const nom_complet = document.getElementById('inputNom_complet').value;
            const pseudo = document.getElementById('inputPseudo').value;
            const password = document.getElementById('inputPassword').value;
            const profilPic = this.profilPic

            const formData = new FormData();
            formData.append('profilPic', profilPic);
            formData.append('pseudo', pseudo);
            formData.append('nom_complet', nom_complet);
            formData.append('password', password);

        //on POST les infos reccueillies au serveur
            axios.post("http://localhost:3000/user/signup", formData , {
                headers: {
                     'Authorization': 'Bearer ', 
                     'content-Type': 'multipart/form-data',
                },
            })
        //traitement de la réponse du serveur
            .then(async function(response){
                //récupération de la réponse du serveur
                    let confirmation = await response.data;                    
                    sessionStorage.setItem("token", confirmation.token);
                    window.location.href ="./accueil";
 
            //traitement des erreurs
                
            }).catch(function(error) { 
                console.log(error); 
                 alert("Mot de passe ou email invalide ! Il faut au minimum 8 caractères non espacés dont une majuscule, une minuscule et 2 chiffres")
            });
        };
    }

   },
   computed: {
    validatedFields: function () {
        if (this.mode == 'create') {
        if (this.pseudo != "" && this.nom_complet != "" && this.password != "" && this.profilPic !="") {
          return true;
        } else {
          return false;
        }}
      }
    },
}
</script>

<style >


.imgProfilPic{
    border-radius: 50%;
    border:  #D08A63 solid 5px;
    object-fit: cover;
    object-position: 50% 50%;
    height: 100px;
    width: 100px;
}

.button_create {
    background: black;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
  }

  .button_create:hover {
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
</style>
