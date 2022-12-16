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
    image: [("../../assets/images/mecabricks/boy1.png")],
    id: 0
  },
  {
    title: "Ironman",
    image: [("../../assets/images/mecabricks/iron-man.png")],
    id: 1
  },
  {
    title: "Hulk",
    image: [("../../assets/images/mecabricks/hulk.png")],
    id: 2
  },
  {
    title: "Aquaman",
    image: [("../../assets/images/mecabricks/aquaman.png")],
    id: 3
  },
  {
    title: "Pablo Mármol",
    image: [("../../assets/images/mecabricks/barney.png")],
    id: 4
  },
  {
    title: "Batman",
    image: [("../../assets/images/mecabricks/batman.png")],
    id: 5
  },
  {
    title: "Harry Potter",
    image: [("../../assets/images/mecabricks/harry-potter.png")],
    id: 6
  },
  {
    title: "Captain America",
    image: [("../../assets/images/mecabricks/captainamerica.png")],
    id: 7
  },
  {
    title: "Constructor",
    image: [("../../assets/images/mecabricks/constructor.png")],
    id: 8
  },
  {
    title: "Darth Vader",
    image: [("../../assets/images/mecabricks/darth-vader.png")],
    id: 9
  },
  {
    title: "Giant",
    image: [("../../assets/images/mecabricks/giant.png")],
    id: 10
  },
  {
    title: "Godric Griffindor",
    image: [("../../assets/images/mecabricks/godric-griffindor.png")],
    id: 11
  },
  {
    title: "Harley Quinn",
    image: [("../../assets/images/mecabricks/harley-quinn.png")],
    id: 12
  },
  {
    title: "Hermione",
    image: [("../../assets/images/mecabricks/hermione.png")],
    id: 13
  },
  {
    title: "Joey Tribbiani",
    image: [("../../assets/images/mecabricks/joey.png")],
    id: 14
  },
  {
    title: "Pedro Picapiedra",
    image: "https://res.cloudinary.com/dbmjuz2tz/image/upload/v1671031375/LEGO%20Playground/mecabricks/picapiedra_z49uop.png",
    id: 15
  },
  {
    title: "Pilot Girl",
    image: [("../../assets/images/mecabricks/pilotgirl.png")],
    id: 16
  },
  {
    title: "Porsche Pilot",
    image: [("../../assets/images/mecabricks/porschepilot.png")],
    id: 17
  },
  {
    title: "Ron Weasley",
    image: [("../../assets/images/mecabricks/ron-wheasley.png")],
    id: 18
  },
  {
    title: "Spiderman",
    image: [("../../assets/images/mecabricks/spiderman.png")],
    id: 19
  },
  {
    title: "Stormtrooper",
    image: [("../../assets/images/mecabricks/stormtrooper.png")],
    id: 20
  },
  {
    title: "Superman",
    image: [("../../assets/images/mecabricks/superman.png")],
    id: 21
  },
  {
    title: "The Flash",
    image: [("../../assets/images/mecabricks/theflash.png")],
    id: 22
  },
  {
    title: "Tony Stark",
    image: [("../../assets/images/mecabricks/tonystark.png")],
    id: 23
  },
  {
    title: "Wilma Picapiedra",
    image: [("../../assets/images/mecabricks/wilma.png")],
    id: 24
  },
  {
    title: "Windu",
    image: [("../../assets/images/mecabricks/windu.png")],
    id: 25
  },
  {
    title: "Wolverine",
    image: [("../../assets/images/mecabricks/wolverine.png")],
    id: 26
  },
  {
    title: "Wonderwoman",
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