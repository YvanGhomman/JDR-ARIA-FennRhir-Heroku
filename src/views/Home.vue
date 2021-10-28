<template>

  <div class="home">
    <img class="img d-flex col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-12" alt="Aria" src="../assets/gif-ulule.I8aEb7Ztjlkg.gif">
    <div class="container">
      <div class="row align-items-center justify-content-around m-2">
        <div class="card shadow-lg ">
          <h1 class="card_title" v-if="mode == 'login'">Connection</h1>
          <h1 class="card_title" v-else>Inscription</h1>
          <p class="card_subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card_action" @click="switchToCreateAccount()">Créer un compte</span></p>
          <p class="card_subtitle" v-else>Tu as déjà un compte ? <span class="card_action" @click="switchToLogin()">Se connecter</span></p>
          <div class="form-row" v-if="mode == 'login'">
            <Login/>
          </div>
          <div class="form-row" v-if="mode == 'create'">
            <Signup/>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>

// @ is an alias to /src
import Signup from '@/components/Signup.vue'
import Login from '@/components/Login.vue'


export default {
  name: 'Home',
  data() {
    return {
      mode: 'login',
    }
  },
  components: {
    Signup,
    Login
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = 'create';
    },
    switchToLogin: function () {
      this.mode = 'login';
    },
  },

}
</script>

<style scoped>
body{
  background-color: white;
    background-size: cover;
}
 .img {
  height: 600px;
  margin-top: -100px;
  margin-bottom: -130px;
  object-fit: contain;
}
@media screen and (min-width: 1500px){
  .img {
  margin-top: -50px;
}
}
@media screen and (max-width: 1200px){
  .img {
  margin-top: -80px;
}
}
@media screen and (max-width: 600px){
  .img {
  margin-top: -140px;
    margin-bottom: -180px;
}
}
@media screen and (max-width: 425px){
  .img {
  margin-top: -180px;
  margin-bottom: -200px;
}
}
  .form-row {
    display: flex;
    margin: 16px 0px;
    gap:16px;
    flex-wrap: wrap;
  }
  .form-row_input {
    padding:8px;
    border: none;
    border-radius: 8px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
  }
  .form-row_input::placeholder {
    color:#aaaaaa;
  }
  
.card {
  max-width: 100%;
  display: flex;
  align-content: center;
  width: 540px;
  background-color: #e0e0e0;
  border-radius: 16px;
  padding:32px;
}
.card_title {
  text-align:center;
  font-weight: 600;
}
.card_subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
}

  .card_action {
    color:#2196F3;
    text-decoration: underline;
  }
  .card_action:hover {
    cursor:pointer;
  }


</style>
