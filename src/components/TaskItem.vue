<template>
<div class="container-item">
    <div v-if="!done">
        <div class="item-title">
            <h3>{{random}}</h3>
            <button id="done" @click="emit('hideTask')">Done</button>
        </div>        
        <p>{{task.description}}</p>
    </div>
    <div v-else class="tachado">
        <div class="item-title">
            <h3>{{task.title}}</h3>
            <button id="done" @click="taskDone">Undone</button>
        </div>   
        <p>{{task.description}}</p>
    </div>
    <!-- <div class="modify-task">
        <button id="edit" @click="(openEdit = !openEdit)">Edit</button>
        <button @click="deleteTask">Delete</button>
    </div> -->
    
    <div action="#" v-show="!openEdit">
        <div class="input-field">
            <input type="text" v-model="random">
        </div>
        <div class="input-field">
            <input type="text" v-model="description">
        </div>
        <button @click="editTask" class="save-button">Save</button>
    </div>
    
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../stores/task';
import { supabase } from '../supabase';

// const name = ref(random);
const description = ref(props.task.description);
const is_complete = ref(props.task.is_complete);
const taskStore = useTaskStore();

const openEdit = ref(true);
const done = ref(props.task.is_complete);

const emit = defineEmits(["getTasks", "hideTask"]);

const props = defineProps({
    task: Object,
});

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async() => {
    await taskStore.deleteTask(props.task.id);
    emit("getTasks");
};

const editTask = async () => {
    await taskStore.editTask(name.value, description.value, props.task.id);
    emit("getTasks");
}

const taskDone = async () => {
    console.log("taskDone");
    done.value = !done.value;
    // localStorage.setItem("done", !done.value);
    await taskStore.taskDone(props.task.is_complete, props.task.id);
    emit("getTasks");
}


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

const random = ref(randomItem + " - " + randomItem2);
console.log(random);

</script>

<style>
</style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
