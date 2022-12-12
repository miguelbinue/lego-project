<!-- COMPONENTE BOILERPLATE -->

<template>
  <div class="container">

    <div class="box">
      <img src="../../assets/images/smiley.jpg" alt="lego-face" id="f1">
      <img src="../../assets/images/smiley.jpg" alt="lego-face" id="f2">
      <img src="../../assets/images/smiley.jpg" alt="lego-face" id="f3">
      <img src="../../assets/images/smiley.jpg" alt="lego-face" id="f4">
      <div class="content-box">

        <div class="header">
          <div class="header-description">
            <h3 class="header-title">Log In to <br/> LEGO PLAYGROUND</h3>
            <!-- <p class="header-subtitle">Start organizing your tasks!</p> -->
          </div>
        </div>

        <form @submit.prevent="signIn" class="form-sign-in">
          <div class="form">
            <div class="form-input">
              <label class="input-field-label"></label>
              <input
                type="email"
                class="input-field sign"
                placeholder="Email"
                id="email"
                v-model="email"
                required
              />
            </div>
            <div class="form-input">
              <label class="input-field-label"></label>
              <input
                type="password"
                class="input-field sign"
                placeholder="Password"
                id="password"
                v-model="password"
                required
              />
            </div>
            <button class="button" type="submit">Sign In</button>
            <p>
              Don't have an account?
              <PersonalRouter
                :route="route"
                :buttonText="buttonText"
                class="sign-up-link"
              />
            </p>
          </div>
        </form>

        <div v-show="errorMsg">{{errorMsg}}</div>
      </div>
    </div>
    
  </div>
</template>


<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

const email = ref("");
const password = ref("");

const errorMsg = ref("");

const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    await useUserStore().signIn(email.value, password.value);
    redirect.push({ path: "/"});
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
  return;
  errorMsg.value = "error";
};
</script>

<style></style>
