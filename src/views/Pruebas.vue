<template>
    <div class="prueba">
        <!-- <Nav /> -->
        <!-- <div id="account">
        <img  src='../../assets/images/mecabricks/harry-potter.png' alt="Profile picture">
        </div> -->
        <video playsinline autoplay muted loop poster="../../assets/images/lego-game.180.png">
            <source src="../../assets/videos/lego.day.mp4" type="video/webm">
            Your browser does not support the video tag.
        </video>
    </div>  
</template>

<script setup>
import Nav from '../components/Nav.vue';
</script>

<style>
/* video{
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    height: 100%;
    width: 100%;
    z-index: -1;
} */

/* .prueba{
    position: relative;
    height: 1080px;
    overflow: hidden;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
} */

</style>