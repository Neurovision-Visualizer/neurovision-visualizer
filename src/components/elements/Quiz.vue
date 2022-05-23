<template>
  <main class="bg-white py-8 px-10 w-full flex flex-col items-center h-screen">
    <h1 class="text-3xl font-bold mb-12" v-if="type == 'prequiz'">
      Test Your Existing Knowledge of Neural Networks
    </h1>
    <h1 class="text-3xl font-bold mb-12" v-if="type == 'postquiz'">
      Test Knowledge of Neural Networks Gained
    </h1>

    <section
      class="bg-white border py-6 px-5 max-w-2xl w-full flex flex-col rounded outline outline-2 outline-white"
      v-if="!quizCompleted"
    >
      <div class="flex flex-row justify-between mb-2">
        <span class="font-medium text-xl mr-2">
          Question # {{ currentQuestion + 1 }}</span
        >

        <div
          class="bg-primary_light ml-4 w-44 h-12 rounded outline outline-1 outline-white flex flex-col items-center justify-center text-base"
        >
          <span class="font-medium text-xl"
            >Score {{ score }}/{{ questions.length }}</span
          >
        </div>
      </div>
      <span class="font-medium text-xl mr-2 mb-4">{{
        getCurrentQuestion.question
      }}</span>

      <div class="mb-4">
        <label
          v-for="(option, index) in getCurrentQuestion.options"
          :key="index"
          :for="'option' + index"
          id="option"
          class="border border-gray-300 p-4 mb-4 block rounded outline outline-1 outline-white focus:outline-grey_light active:bg-grey_light hover:bg-primary_light hover:border-blue-400 h-16 text-base hover:cursor-pointer transition-colors duration-400"
          :class="` 
                     ${
                       getCurrentQuestion.selected == index
                         ? index == getCurrentQuestion.answer
                           ? 'border-green-400 bg-green-100'
                           : 'border-red-400 bg-red-100'
                         : ''
                     } ${
            getCurrentQuestion.selected != null &&
            index != getCurrentQuestion.selected
              ? 'disabled'
              : ''
          }`"
        >
          <input
            type="radio"
            class="font-regular text-lg"
            :id="'option' + index"
            :name="getCurrentQuestion.index"
            :value="index"
            v-model="getCurrentQuestion.selected"
            :disabled="getCurrentQuestion.selected"
            @change="SetAnswer($event)"
          />
          <span class="ml-3">{{ option }}</span>
        </label>
      </div>

      <button
        @click="NextQuestion()"
        :disabled="!getCurrentQuestion.selected"
        class="justify-center mx-auto bg-primary hover:bg-blue-500 text-white text- font-medium rounded cursor-pointer px-4 py-3 transition-colors duration-400"
      >
        {{
          getCurrentQuestion.index == questions.length - 1
            ? "Finish"
            : getCurrentQuestion.selected == null
            ? "Select an option"
            : "Next question"
        }}
      </button>
    </section>

    <section
      v-else
      class="bg-white border py-6 px-5 max-w-2xl w-full flex flex-col rounded"
    >
      <div></div>
      <h2 class="text-2xl font-semibold mb-2 justify-center mx-auto">
        You have finished the quiz!
      </h2>
      <p class="text-2xl mb-4 justify-center mx-auto">
        Your score is {{ score }}/{{ questions.length }}
      </p>
      <p class="text-xl text-primary font-medium mb-4 justify-center mx-auto">
        Feedback: {{ quizfeedback }}
      </p>
      <div v-if="type == 'prequiz'">
        <div class="">
          <p class="text-md mx-auto text-center font-regular text-primary_dark">
            It is recommened that new users start with the tutorial!
          </p>
        </div>
        <div class="flex justify-center my-4">
          <router-link
            class="justify-center mx-2 my-4 text-primary border border-primary hover:bg-blue-50 last:text-lg text-center font-medium uppercase outline outline-1 outline-white appearance-none cursor-pointer rounded py-3 px-4 transition-colors duration-200"
            id="v-step-3"
            @click="showTour(false)"
            :to="{
              name: 'select',
            }"
          >
            Start Without Tutorial
          </router-link>
          <router-link
            class="justify-center mx-2 my-4 bg-primary text-white hover:bg-blue-500 text-lg text-center font-medium cursor-pointer uppercase rounded py-3 px-4 transition-colors duration-200"
            id="v-step-3"
            @click="showTour(true)"
            :to="{
              name: 'select',
            }"
          >
            Start With Tutorial
          </router-link>
        </div>
      </div>
      <div v-if="type == 'postquiz'">
        <div class="flex justify-center m-0 mb-4">
          <a href="https://forms.gle/KZMuPAW4CdWA4Hbc6">
            <button
              @click="showTour(false)"
              className="justify-center w-4/5 mx-2 my-4 bg-primary_dark text-white text-lg font-medium uppercase rounded outline outline-1 outline-white appearance-none cursor-pointer p-4"
            >
              Give Us Your Feedback
            </button>
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  props: { type: String, quizquestions: Array },
  data() {
    return {
      questions: this.quizquestions,
      quizCompleted: false,
      currentQuestion: 0,
      quizfeedback: "",
    };
  },
  mounted() {
    this.questions = this.quizquestions;
  },
  computed: {
    score() {
      let value = 0;
      this.questions.map((q) => {
        if (q.selected != null && q.answer == q.selected) {
          console.log("correct");
          value++;
        }
      });
      return value;
    },

    getCurrentQuestion() {
      let question = this.questions[this.currentQuestion];
      question.index = this.currentQuestion;
      return question;
    },
  },
  methods: {
    SetAnswer(event) {
      this.questions[this.currentQuestion].selected = event.target.value;
      event.target.value = null;
    },

    NextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
        return;
      }
      this.getQuizFeedback();
      this.quizCompleted = true;
    },
    showTour(tour) {
      localStorage.setItem("isTourVisible", JSON.stringify(tour));
    },
    getQuizFeedback() {
      if (this.type == "prequiz") {
        switch (this.score) {
          case 0:
            {
              this.quizfeedback = "Previous Knowledge Very Limited";
            }
            break;
          case 1:
            {
              this.quizfeedback = "Previous Knowledge Limited";
            }
            break;
          case 2:
            {
              this.quizfeedback = "Previous Knowledge Average";
            }
            break;
          case 3:
            {
              this.quizfeedback = "Previous Knowledge Good";
            }
            break;
          case 4:
            {
              this.quizfeedback = "Previous Knowledge Very Good";
            }
            break;
          case 5:
            {
              this.quizfeedback = "Previous Knowledge Excellent";
            }
            break;
          default:
            {
              this.quizfeedback = "No feedback available at this time";
            }
            break;
        }
      } else if (this.type == "postquiz") {
        switch (this.score) {
          case 0:
            {
              this.quizfeedback = "Knowledge Gained Very Limited";
            }
            break;
          case 1:
            {
              this.quizfeedback = "Knowledge Gained Limited";
            }
            break;
          case 2:
            {
              this.quizfeedback = "Knowledge Gained Average";
            }
            break;
          case 3:
            {
              this.quizfeedback = "Knowledge Gained Good";
            }
            break;
          case 4:
            {
              this.quizfeedback = "Knowledge Gained Very Good";
            }
            break;
          case 5:
            {
              this.quizfeedback = "Knowledge Gained Execellent";
            }
            break;
          default:
            {
              this.quizfeedback = "No feedback available at this time";
            }
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
#option.correct {
  background-color: #2cce7d;
}
#option.wrong {
  background-color: #ff5a5f;
}

input[type="radio"]:checked {
  background-color: #78eeb3;
}

input[type="radio"] + label span:hover,
input[type="radio"] + label:hover span {
  transform: scale(1.2);
}
</style>
