<template>
    <div class="time" v-if="timerCountHard > 0">
        {{ timerCountHard }}
    </div> 
    <!-- <div v-if="isHard == false">
        {{ timerCountEasy }}
    </div> -->
    <div class="timeDone" v-if="timerCountHard == 0">Time's Up! Try Again</div>
</template>

<script>

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
            },
            // props: [
            //     'isHard'
            // ]
                
            
        }
    }

</script>