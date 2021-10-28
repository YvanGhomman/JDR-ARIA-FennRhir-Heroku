<template>
    <form class="row justify-content-center" id="checked" v-if="mode == 'login'">
        
        <div class="space-form col-sm-8 col-12 m-1">
            <input type="text" v-model="pseudo" class="form-control" id="inputPseudo" placeholder="🧙‍♂️ Pseudo" aria-label="Email" pattern="^[A-Za-z]{2,50}" required>
        </div>
        <div class="space-form col-sm-8 col-12 m-1">
            <input type="password" v-model="password" class="form-control" id="inputPassword" placeholder="🔐 Password" aria-label="Password" required>
        </div>
    </form>
    <div>
        <button class="button_login" :class="{'button--disabled' : !validatedFields}" @click="sendLogin()"><span class="white" >Valider</span></button>
    </div>
</template>

<script>


export default {
   name: 'Login',
   data() {
    return {
        mode: 'login',
        nom_complet: '',
        pseudo: '',
        admin: '',
        password: '',
    }
  },
   methods: {
       sendLogin(){

    //on vérifie que tout le formulaire est conforme
        let FormValid = document.getElementById('checked').checkValidity();

    //si formulaire pas conforme, alert le client
        if (FormValid == false ) {

            alert(`Vous n'avez pas rempli tous les champs requis !`);
    //sinon
        }else{
        
        //variable qui reccueille les infos de contact du client
            let contact = {
                password : document.getElementById('inputPassword').value,
                pseudo : document.getElementById('inputPseudo').value
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
         envoi.then( async response =>{
                try{ 
                //récupération de la réponse du serveur
                    let confirmation = await response.json();
                    if (confirmation.error){
                            console.log("error")
                            alert("Mot de passe ou email invalide : " + confirmation.message)
                    }else{                   
                    sessionStorage.setItem("token", confirmation.token);
                    window.location.href ="./accueil";
                    }
                    
            //traitement des erreurs
                 } catch (error) {
                    console.log(error);
                    alert("Un problème est survenu, merci de réessayer plus tard");
                } 
            });
        };
}

   },
   computed: {
    validatedFields: function () {
        if (this.mode == 'login') {
        if (this.pseudo != "" && this.password != "") {
          return true;
        } else {
          return false;
        }}
      }
    },
}
</script>

<style>


.button_login {
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

  .button_login:hover {
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
