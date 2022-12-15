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
        <button class="button-level" v-on:click="nextLevel()">Level Up</button>
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
    levelProgresion(characterArr);
  });

  async function getProfile() {
    await userStore.fetchUser();
    username.value = userStore.profile.username;
    avatar_url.value = userStore.profile.avatar_url;
    userEmail.value = userStore.user.email.split("@")[0];
    userLevel.value = userStore.profile.level;
    getUser = useUserStore().user;
    
    console.log(userStore.profile);
        
    
    console.log("Level Progr" + characterArr[0].id);
    // console.log(levelProgresion(characterArr[0]));

    // console.log("Id del userlevel" + userLevel.value);
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
    title: "harryPotter",
    image: [("../../assets/images/mecabricks/harry-potter.png")],
    id: 0
  },
  {
    title: "ironman",
    image: [("../../assets/images/mecabricks/iron-man.png")],
    id: 1
  },
  {
    title: "hulk",
    image: [("../../assets/images/mecabricks/hulk.png")],
    id: 2
  },
  {
    title: "aquaman",
    image: [("../../assets/images/mecabricks/aquaman.png")],
    id: 3
  },
  {
    title: "barney",
    image: [("../../assets/images/mecabricks/barney.png")],
    id: 4
  },
  {
    title: "batman",
    image: [("../../assets/images/mecabricks/batman.png")],
    id: 5
  },
  {
    title: "boy1",
    image: [("../../assets/images/mecabricks/boy1.png")],
    id: 6
  },
  {
    title: "captainamerica",
    image: [("../../assets/images/mecabricks/captainamerica.png")],
    id: 7
  },
  {
    title: "constructor",
    image: [("../../assets/images/mecabricks/constructor.png")],
    id: 8
  },
  {
    title: "darth-vader",
    image: [("../../assets/images/mecabricks/darth-vader.png")],
    id: 9
  },
  {
    title: "giant",
    image: [("../../assets/images/mecabricks/giant.png")],
    id: 10
  },
  {
    title: "godric-griffindor",
    image: [("../../assets/images/mecabricks/godric-griffindor.png")],
    id: 11
  },
  {
    title: "harley-quinn",
    image: [("../../assets/images/mecabricks/harley-quinn.png")],
    id: 12
  },
  {
    title: "hermione",
    image: [("../../assets/images/mecabricks/hermione.png")],
    id: 13
  },
  {
    title: "joey",
    image: [("../../assets/images/mecabricks/joey.png")],
    id: 14
  },
  {
    title: "picapiedra",
    image: [("../../assets/images/mecabricks/picapiedra.png")],
    id: 15
  },
  {
    title: "pilotgirl",
    image: [("../../assets/images/mecabricks/pilotgirl.png")],
    id: 16
  },
  {
    title: "porsche-pilot",
    image: [("../../assets/images/mecabricks/porschepilot.png")],
    id: 17
  },
  {
    title: "ronweasley",
    image: [("../../assets/images/mecabricks/ron-wheasley.png")],
    id: 18
  },
  {
    title: "spiderman",
    image: [("../../assets/images/mecabricks/spiderman.png")],
    id: 19
  },
  {
    title: "stormtrooper",
    image: [("../../assets/images/mecabricks/stormtrooper.png")],
    id: 20
  },
  {
    title: "superman",
    image: [("../../assets/images/mecabricks/superman.png")],
    id: 21
  },
  {
    title: "theflash",
    image: [("../../assets/images/mecabricks/theflash.png")],
    id: 22
  },
  {
    title: "tonystark",
    image: [("../../assets/images/mecabricks/tonystark.png")],
    id: 23
  },
  {
    title: "wilma",
    image: [("../../assets/images/mecabricks/wilma.png")],
    id: 24
  },
  {
    title: "windu",
    image: [("../../assets/images/mecabricks/windu.png")],
    id: 25
  },
  {
    title: "wolverine",
    image: [("../../assets/images/mecabricks/wolverine.png")],
    id: 26
  },
  {
    title: "wonderwoman",
    image: [("../../assets/images/mecabricks/wonderwoman.png")],
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