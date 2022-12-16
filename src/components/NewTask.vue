<template>
    <div id="newTask">
        <img src="../../assets/images/lego-head.png" alt="Lego Head">
        <div v-if="showErrorMessage">
            <p class="error-text">{{ errorMessage }}</p>
        </div>
        <div class="new-task-input">
            <button class="ui button big toggle" :class="{active:isActive}" @click="toggle()">{{isActive ? 'EASY' : 'HARD'}}</button>
            <button @click="addTask" class="button">Leggo!</button>
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

const prop = defineProps(["isActive"]);

const emit = defineEmits(["emitTask", "changeActive"]);

const isHard = ref(true);

const toggle = async () => {
    emit("changeActive");
}

// Arrow function para crear tareas.
const addTask = async() => {
    // if(name.value.length === 0 || description.value.length === 0){
    //     // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    //     showErrorMessage.value = true;
    //     errorMessage.value = 'The task title or description is empty';
    //     setTimeout(() => {
    //     showErrorMessage.value = false;
    //     }, 5000);

    // } else {
        // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.
    
        const createdTask = await taskStore.addTask();
        name.value = '';
        description.value = '';
        emit("emitTask", createdTask);
    // }
};


</script>

<style></style>
  