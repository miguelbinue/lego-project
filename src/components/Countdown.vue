<template>
    <div class="time" v-if="timerCountHard > 0 && !isActive">
        {{ timerCountHard }}
    </div> 
    <div class="time" v-if="timerCountEasy > 0 &&isActive">
        {{ timerCountEasy }}
    </div>
    <div class="timeDone" v-if="(isActive &&timerCountEasy == 0 ) || (!isActive && timerCountHard == 0)">TIME'S UP! Try Again</div>
</template>

<script setup>
import { ref, watch } from 'vue';

const timerCountHard = ref(5);
const timerCountEasy = ref(10);

const props = defineProps(["isActive"]);

watch(timerCountEasy, () => {
    if (timerCountEasy.value > 0) {
        setTimeout(() => {
            timerCountEasy.value--;
        }, 1000);
    }
}, {immediate: true});

watch(timerCountHard, () => {
    if (timerCountHard.value > 0) {
        setTimeout(() => {
            timerCountHard.value--;
        }, 1000);
    }
}, {immediate: true});

// watch(props.isActive, () => {
    console.log("is active: " + props.isActive);
// })

</script>

<!-- <script>

    export default {

        data() {
            // isHard: true;
            return {
                timerCountHard: 150,
                timerCountEasy: 10,
            }
        },
        watch: {

            timerCountHard: {
                handler(value) {
                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCountHard--;
                        }, 1000);
                    }

                },
                immediate: true // This ensures the watcher is triggered upon creation
            },
            timerCountEasy: {
                handler(value) {
                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCountEasy--;
                        }, 1000);
                    }

                },
                immediate: true // This ensures the watcher is triggered upon creation
            }    
            
        },
        props: {
            isActive: Boolean,
        }
    }

</script> -->