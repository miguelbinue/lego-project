<template>
  <div class="container signup-container">
    <!-- <img src="../../assets/images/mecabricks/aquaman.png" alt="aquaman" id="f1"> -->
    <img src="../../assets/images/mecabricks/stormtrooper.png" alt="stormtrooper" id="f2">
      <img src="../../assets/images/mecabricks/batman.png" alt="batman" id="f3">
      <!-- <img src="../../assets/images/mecabricks/spiderman.png" alt="spiderman" id="f4"> -->
    <div class="box signup">
      <div class="content-box">

      <div class="header">
        <div class="header-description">
          <!-- <h3 class="header-title">Register to <br/> LEGO PLAYGROUND</h3> -->
          <!-- <p class="header-subtitle">Start organizing your tasks!</p> -->
        </div>
      </div>

      <form @submit.prevent="signUp" class="form-sign-in">
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
          <div class="form-input">
            <label class="input-field-label"></label>
            <input
              type="password"
              class="input-field sign"
              placeholder="Confirm password"
              id="confirmPassword"
              v-model="confirmPassword"
              required
            />
          </div>
          <button class="button" type="submit"></button>
          <p>
            Have an account?
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
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";
};
</script>

<style></style>
