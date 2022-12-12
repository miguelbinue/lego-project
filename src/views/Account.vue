<template>
  <Nav />
  <div id="account">
    <h1>Name: {{userEmail.split("@")[0]}}</h1>
    <img :src="avatar_url ? avatar_url : ('../../assets/images/mecabricks/harry-potter.png')" alt="Profile picture">
  </div>
  
</template>

<script setup>
  import { supabase } from '../supabase';
  import { onMounted, ref, toRefs } from 'vue';
  import { useUserStore } from "../stores/user";
  import Nav from '../components/Nav.vue';

  const userStore = useUserStore();

  const getUser = useUserStore().user;
  const userEmail = getUser.email;

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
  }

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
</script>

<style>
/* img {
  width: 200px;
  border-radius: 50%;
} */
</style>