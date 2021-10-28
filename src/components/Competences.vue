<template>
<div class="d-flex flex-column align-items-center col-10 offset-1 ">
    <div class="col-12 m-2">
        <div class="card shadow card-body">
    <div>
        <h2>Compétences</h2>
        <div class="Test1 col-10 offset-1 ">
            <div class="Test2 col-lg-6">
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Artisanat, construire : </p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Combat rapproché : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Combat à distance : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Connaissance de la nature : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Connaissance des secrets : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Courir, sauter : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Discrétion : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Droit : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Esquiver : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Intimider : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
            </div>
            <div class="Test2 col-lg-6">
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Lire, écrire : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Mentir, convaincre : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Perception : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Piloter : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Psychologie : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Réflexes : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Serrures et pièges : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Soigner : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Survie : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
                <div class="d-flex justify-content-between col-8 offset-2">
                    <p>Voler : {{ }}</p>
                    <p>{{ }} bla </p>
                </div>
            </div>
        </div>
        <div>
            <h2>Compétences spéciales</h2>
            <div class="d-flex justify-content-between col-8 offset-2 col-lg-4 offset-lg-4">
                <p>compétence1 : {{}}</p>
                <p>{{ }} bla </p>
            </div>
            
        </div>
    </div>
    <div>
        <h2>Possessions</h2>
        <div class="d-flex justify-content-between col-8 offset-2 col-lg-4 offset-lg-4">
            <p>possessions : {{}}</p>
        </div>
    </div>

        </div>
    </div>
</div>
</template>
<script>


export default {
    name: 'Competences'
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
    .Test1{
         display: flex ;
    }
    
 }
@media screen and (max-width: 992px) { 
    .media{
        display: flex ;
        flex-direction: column;
        align-items: center;
    }
    .Test1{
        display: block;
    }
 }
</style>
