<template>
    <div id="newTask">
        <h1 class="new-task-title">LEGO Playground</h1>
        <div v-if="showErrorMessage">
            <p class="error-text">{{ errorMessage }}</p>
        </div>
        <div class="new-task-input">
            <!-- <div class="input-field">
                <input type="text" placeholder="Selecciona dificultad" v-model="name">
            </div> -->


            <!-- <div class="dropdown">
                <button class="dropbtn">Selecciona dificultad</button>
                <div class="dropdown-content">
                    <a href="#">Facil</a>
                    <a href="#">Dificil</a>
                </div>
            </div> -->

            <!-- <p>Selecciona dificultad: </p> -->
            <button class="ui button big toggle" :class="{active:isActive}" @click="toggle()">{{isActive ? 'EASY' : 'HARD'}}</button>

            <!-- <div class="input-field">
                <input type="text" placeholder="Description" v-model="description">
            </div> -->
            <button @click="addTask" class="button">Create</button>
        </div>
    </div>
    
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task"   

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref('');
const description = ref('');

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

const tasks = ref([]);

let isActive = ref(false);

const emit = defineEmits(["emitTask"]);

// function toggle() {
//    this.isActive = !this.enable;
// }

const toggle = async () => {
    isActive.value = isActive.value ? false : true;
    console.log(isActive);
}

// Arrow function para crear tareas.
const addTask = async() => {
    if(name.value.length === 0 || description.value.length === 0){
        // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

        showErrorMessage.value = true;
        errorMessage.value = 'The task title or description is empty';
        setTimeout(() => {
        showErrorMessage.value = false;
        }, 5000);

    } else {
        // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.
    
        await taskStore.addTask(name.value, description.value);
        name.value = '';
        description.value = '';
        emit("emitTask");
    }
};

//Randomizamos el valor del challenge y queda pendiente combinarlo con otros elementos por determinar
const randomChallenge = [
    "Architecture",
    "City",
    "Superhero",
    "Disney",
    "Vehicle",
    "Videogames",
    "Space",
    "Mechanisms",
    "Animals",
    "Fantasy",
]
const randomDetail = [
    " Complex",
    " Funny",
    " Articulated",
    " 2D",
    " Monochromatic",
    " Inverted",
    " Follow the playground",
    " Replace the playground",
    " Do it yourself",
    " {{randomChallenge}} with {{randomChallenge}}",
]

const randomIndex = Math.floor(Math.random() * randomChallenge.length)
const randomItem = randomChallenge[randomIndex];

const randomIndex2 = Math.floor(Math.random() * randomDetail.length)
const randomItem2 = randomDetail[randomIndex2];

console.log(randomItem + randomItem2);

</script>

<style></style>
  