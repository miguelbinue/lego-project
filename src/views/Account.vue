<template>
  <Nav />
  <VideoAccount/>
  <div class="content-account">
    <h2 class="account-character-name">{{name}}</h2>
    <div class="character-box">
      <div class="levels">
        <div class="character-circle character-before"><img v-if="this.userLevel > 1" :src="prevLevel" alt="character"></div>
        <div class="character-circle character-main"><img :src="array" alt="character"></div>
        <div class="character-circle character-after"><img v-if="userLevel > 2" :src="preprevLevel" alt="character"></div>
      </div>
    </div>
    <div class="screen-character"></div>
    <div class="text-account">
      <div class="account-box-name">
        <h1 class="account-name">{{userEmail}}</h1>
      </div>
      <div class="account-box-level">
        <h2 class="account-level">{{userLevel}}</h2>
        <!-- <button class="button-level" v-on:click="nextLevel()">Level Up</button> -->
      </div>
    </div>
  </div>
  <!-- <Countdown/> -->
  <Footer/>
</template>

<script setup>
  import { supabase } from '../supabase';
  import { onMounted, ref, toRefs } from 'vue';
  import { useUserStore } from "../stores/user";
  import Nav from '../components/Nav.vue';
  import Countdown from '../components/Countdown.vue'
  import Footer from '../components/Footer.vue';
  import VideoAccount from '../components/VideoAccount.vue';
const userStore = useUserStore();

const level = ref(1);
const userLevel = ref(null);

  let getUser = null;
  const userEmail = ref(null);

  const loading = ref(false);
  const username = ref(null);
  const website = ref(null);
  const avatar_url = ref(null);

  onMounted(() => {
    getProfile();
  });

  async function getProfile() {
    await userStore.fetchUser();
    username.value = userStore.profile.username;
    avatar_url.value = userStore.profile.avatar_url;
    userEmail.value = userStore.user.email.split("@")[0];
    userLevel.value = userStore.profile.level;
    getUser = useUserStore().user;
        
    levelProgresion(characterArr);
  }

  getProfile();

  async function signOut() {
    try {
      loading.value = true
      let { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

function nextLevel() {
  userLevel.value++;
  levelProgresion(characterArr);
}

//Array of LEGO characters
const characterArr = [
  {
    title: "Boy",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193203/LEGO%20Playground/sunny-faces/boy1_xsg469.png",
    id: 0
  },
  {
    title: "Ironman",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193205/LEGO%20Playground/sunny-faces/ironman_rrqp2q.png",
    id: 1
  },
  {
    title: "Hulk",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193205/LEGO%20Playground/sunny-faces/hulk_ewj6uq.png",
    id: 2
  },
  {
    title: "Aquaman",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193203/LEGO%20Playground/sunny-faces/aquaman_kunakn.png",
    id: 3
  },
  {
    title: "Barney",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193202/LEGO%20Playground/sunny-faces/barney_viz1cm.png",
    id: 4
  },
  {
    title: "Batman",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193202/LEGO%20Playground/sunny-faces/batman_evcbda.png",
    id: 5
  },
  {
    title: "Harry Potter",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193204/LEGO%20Playground/sunny-faces/harry-potter_m5ckgx.png",
    id: 6
  },
  {
    title: "Captain America",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193202/LEGO%20Playground/sunny-faces/captainamerica_m5qna7.png",
    id: 7
  },
  {
    title: "Constructor",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193203/LEGO%20Playground/sunny-faces/constructor_qt5zq5.png",
    id: 8
  },
  {
    title: "Darth Vader",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193203/LEGO%20Playground/sunny-faces/darth-vader_x92gfe.png",
    id: 9
  },
  {
    title: "Giant",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193203/LEGO%20Playground/sunny-faces/giant_n5ri8l.png",
    id: 10
  },
  {
    title: "Godric",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193204/LEGO%20Playground/sunny-faces/godric-griffindor_cv9tv5.png",
    id: 11
  },
  {
    title: "Harley Quinn",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193205/LEGO%20Playground/sunny-faces/harley-quinn_saligv.png",
    id: 12
  },
  {
    title: "Hermione",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193204/LEGO%20Playground/sunny-faces/hermione_eip4f9.png",
    id: 13
  },
  {
    title: "Joey Tribbiani",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193205/LEGO%20Playground/sunny-faces/joey_mmjfj8.png",
    id: 14
  },
  {
    title: "Pedro Picapiedra",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193205/LEGO%20Playground/sunny-faces/picapiedra_ats2qz.png",
    id: 15
  },
  {
    title: "Pilot Girl",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193205/LEGO%20Playground/sunny-faces/pilotogirl_bxd4pb.png",
    id: 16
  },
  {
    title: "Porsche Pilot",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193206/LEGO%20Playground/sunny-faces/porschepilot_lnqu1k.png",
    id: 17
  },
  {
    title: "Ron Weasley",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193206/LEGO%20Playground/sunny-faces/ron_phjuil.png",
    id: 18
  },
  {
    title: "Spiderman",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193206/LEGO%20Playground/sunny-faces/spiderman_pxwj3h.png",
    id: 19
  },
  {
    title: "Stormtrooper",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193206/LEGO%20Playground/sunny-faces/stormtrooper_bxkjds.png",
    id: 20
  },
  {
    title: "Superman",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193207/LEGO%20Playground/sunny-faces/superman_ykbyad.png",
    id: 21
  },
  {
    title: "The Flash",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193206/LEGO%20Playground/sunny-faces/theflash_kazapa.png",
    id: 22
  },
  {
    title: "Tony Stark",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193207/LEGO%20Playground/sunny-faces/tonystark_e3tpb6.png",
    id: 23
  },
  {
    title: "Wilma Picapiedra",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193207/LEGO%20Playground/sunny-faces/wilma_vlkyle.png",
    id: 24
  },
  {
    title: "Windu",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193207/LEGO%20Playground/sunny-faces/windu_jd9err.png",
    id: 25
  },
  {
    title: "Wolverine",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193208/LEGO%20Playground/sunny-faces/wolverine_xqcb4l.png",
    id: 26
  },
  {
    title: "Wonderwoman",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671193207/LEGO%20Playground/sunny-faces/wonderwoman_fzusfx.png",
    id: 27
  },
  
];

let array = ref();
let prevLevel = ref();
let preprevLevel = ref();
let name = ref('');
let currentId = ref();

let levelProgresion = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (userLevel.value < 2) {
      console.log("Id del userlevel" + userLevel.value);
      console.log("Id del level" + level.value);
      array.value = arr[userLevel.value].image;
      prevLevel.value = arr[userLevel.value].image;
      preprevLevel.value = arr[userLevel.value].image;
    }
    else if (arr[userLevel.value].id === i) {
      array.value = arr[userLevel.value].image;
      prevLevel.value = arr[userLevel.value-1].image;
      preprevLevel.value = arr[userLevel.value - 2].image;

      // id del objeto, id del userLevel
      console.log("Id del objeto: " + arr[level.value].id);
      console.log("Id del userlevel" + userLevel.value);
    }
  }
  name.value = arr[userLevel.value].title;

  // currentId.value = arr[userLevel.value].id;
  // return currentId.value;
  // console.log(currentId.value);
  // niveles = { array, prevLevel, preprevLevel };
  // console.log(niveles);
  // return niveles;
}

console.log("currentID" + characterArr[1].id);



</script>

<style>
/* img {
  width: 200px;
  border-radius: 50%;
} */
</style>