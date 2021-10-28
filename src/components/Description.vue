<template>
<div class="d-flex flex-column align-items-center col-10 offset-1 ">
    <div class="col-12 m-2">
        <div class="card shadow card-body">
            <h1>Description du perso</h1>
                <div class="media">
                    <div class="col-10 col-lg-4">
                        <div>
                            <img src="../assets/aria_gif_square.gif" alt="">
                        </div>
                    </div>
                    <div class="col-10 col-lg-4">
                        <div>
                            <h2>Aventurier</h2>
                            <div class="d-flex justify-content-between col-8 offset-2 col-lg-6 offset-lg-3">
                                <p>Métier :</p>
                                <p>{{ }} bla</p>
                            </div>
                            <div class="d-flex justify-content-between col-8 offset-2 col-lg-6 offset-lg-3">
                                <p>Nom :</p>
                                <p>{{ }} bla</p>
                            </div>
                            <div class="d-flex justify-content-between col-8 offset-2 col-lg-6 offset-lg-3">
                                <p>Age :</p>
                                <p>{{ }} bla</p>
                            </div>
                        </div>
                        <div>
                            <h2>Caractéristiques</h2>
                            <div class="d-flex justify-content-between col-8 offset-2 col-lg-6 offset-lg-3">
                                <p>Force :</p>
                                <p>{{ }} bla</p>
                            </div>
                            <div class="d-flex justify-content-between col-8 offset-2 col-lg-6 offset-lg-3">
                                <p>Dextérité : {{ }} </p>
                                <p>{{ }} bla</p>
                            </div>
                            <div class="d-flex justify-content-between col-8 offset-2 col-lg-6 offset-lg-3">
                                <p>Endurance : {{ }} </p>
                                <p>{{ }} bla</p>
                            </div>
                            <div class="d-flex justify-content-between col-8 offset-2 col-lg-6 offset-lg-3">
                                <p>Intelligence : {{ }} </p>
                                <p>{{ }} bla</p>
                            </div>
                            <div class="d-flex justify-content-between col-8 offset-2 col-lg-6 offset-lg-3">
                                <p>Charisme : {{ }} </p>
                                <p>{{ }} bla</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-10 col-lg-4">
                        <div>
                            <h2>Vivre ou survivre</h2>
                            <div class="d-flex justify-content-between col-8 offset-2 col-lg-6 offset-lg-3">
                                <p>Arme : {{ }} </p>
                                <p>Dégat : {{ }} </p>
                            </div>
                            <div class="d-flex justify-content-between col-8 offset-2 col-lg-6 offset-lg-3">
                                <p>Arme : {{ }} </p>
                                <p>Dégat : {{ }} </p>
                            </div>
                            <div class="d-flex justify-content-between col-8 offset-2 col-lg-6 offset-lg-3">
                                <p>Arme : {{ }} </p>
                                <p>Dégat : {{ }} </p>
                            </div>
                            <div class="d-flex justify-content-between col-8 offset-2 col-lg-6 offset-lg-3">
                                <p>Armure :</p>
                                <p>{{ }} bla </p>
                            </div>
                            <div class="d-flex justify-content-between col-8 offset-2 col-lg-6 offset-lg-3">
                                <p>Vêtements : {{ }} </p>
                                <p>{{ }} bla </p>
                            </div>
                        </div>
                        <div>
                            <div class="d-flex justify-content-between col-8 offset-2 col-lg-6 offset-lg-3">
                                <p>PV : {{ }} </p>
                                <p>{{ }} bla </p>
                            </div>
                            <div class="d-flex justify-content-between col-8 offset-2 col-lg-6 offset-lg-3">
                                <p>Blessures : {{ }} </p>
                                <p>{{ }} bla </p>
                            </div>
                            <div class="d-flex justify-content-between col-8 offset-2 col-lg-6 offset-lg-3">
                                <p>Protection : {{ }} </p>
                                <p>{{ }} bla </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                    <h3>
                        Mais la société a des problemes avec moi parce que {{}}
                    </h3>
            </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Description',
}
</script>
<style>
body{
    background:  url("../assets/fond2.jpg") no-repeat center fixed ;
    background-size: cover;
}
.card {
  border-radius: 10px;
  padding:5px;
  border-color:black
}

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
</style>