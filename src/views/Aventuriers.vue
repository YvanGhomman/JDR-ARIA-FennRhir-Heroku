<template>
    <div>
        <Navbar/> 
        <div class="container">
          <div>
            <img class="img d-flex col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12" alt="Aria" src="../assets/mage.gif">
          </div>

            <Description/>

    </div>
    </div>
    <Footer/>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue';
import Description from '@/components/Description.vue';

import Footer from '@/components/Footer.vue';

export default {
  name: 'About',
  data(){
    return{
        
    }
    
  },
  components: {
    Navbar,
    Description,

    Footer
  },
  methods: {
               
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
  height: 300px;
  margin-bottom: -50px;
  object-fit: contain;
}
 @media screen and (max-width: 425px) {
.img {
  height: 200px;
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