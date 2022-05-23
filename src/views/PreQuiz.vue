<template>
  <main class="bg-white w-full flex flex-col items-center h-screen">
    <quiz class="w-full" type="prequiz" :quizquestions="questions" />
  </main>
</template>

<script>
import { prequiz } from "@/constants/quizzes";
import Quiz from "@/components/elements/Quiz.vue";
export default {
  components: {
    quiz: Quiz,
  },
  data() {
    return {
      questions: prequiz,
    };
  },
};
</script>

<style scoped></style>
