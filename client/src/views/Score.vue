<template>
  <div class="score">
    <div class="score-container">
      <div v-if="errors.length">
        <Message severity="error" v-for="error in errors" :key="error">{{
          Object.values(error)[0]
        }}</Message>
      </div>

      <Toolbar style="background: transparent">
        <template #start>
          <h1>Score numéro {{ $route.params.id }}</h1>
        </template>

        <template #end v-if="score">
          <p>Votre score est : {{ score.grade }}</p>
        </template>
      </Toolbar>

      <div class="question-wrapper" v-if="!isLoadingData">
        <div
          class="card"
          v-for="question in questions"
          :key="question._id"
          :class="{
            correct: score.goodAnswers.find(
              (answer) => answer === question._id
            ),
          }"
        >
          <div class="card-header">
            <h3>{{ question.title }}</h3>
          </div>
          <div class="card-content">
            <div class="p-field-radiobutton" v-if="question.choice1">
              <RadioButton
                :id="question._id + 'choice1'"
                name="choice"
                :value="question.choice1"
                v-model="question.answer"
                :disabled="true"
              />
              <label :for="question._id + 'choice1'">{{
                question.choice1
              }}</label>
            </div>
            <div class="p-field-radiobutton" v-if="question.choice2">
              <RadioButton
                :id="question._id + 'choice2'"
                name="choice"
                :value="question.choice2"
                v-model="question.answer"
                :disabled="true"
              />
              <label :for="question._id + 'choice2'">{{
                question.choice2
              }}</label>
            </div>
            <div class="p-field-radiobutton" v-if="question.choice3">
              <RadioButton
                :id="question._id + 'choice3'"
                name="choice"
                :value="question.choice3"
                v-model="question.answer"
                :disabled="true"
              />
              <label :for="question._id + 'choice3'">{{
                question.choice3
              }}</label>
            </div>
            <div class="p-field-radiobutton" v-if="question.choice4">
              <RadioButton
                :id="question._id + 'choice4'"
                name="choice"
                :value="question.choice4"
                v-model="question.answer"
                :disabled="true"
              />
              <label :for="question._id + 'choice4'">{{
                question.choice4
              }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import scoreController from "@/controllers/score.controller";
import gameController from "@/controllers/game.controller";

export default {
  data() {
    return {
      isLoadingData: false,
      score: {},
      questions: [],
      errors: [],
    };
  },

  async created() {
    this.isLoadingData = true;

    await scoreController
      .getScore(this.$route.params.id)
      .then((response) => {
        this.score = response.data;
      })
      .catch(({ response }) => {
        this.errors.push(response.data.error);
      });

    await gameController
      .getQuizz(this.score.quizzId, { withReponse: 1 })
      .then((response) => {
        this.questions = response.data.questions;
      })
      .catch(({ response }) => {
        this.errors.push(response.data.error);
      });

    this.isLoadingData = false;
  },
};
</script>

<style scoped>
.score-container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin: 0;
  text-align: left;
}

.card {
  margin: 1rem 0;
  padding: 2rem;
}

.card-content {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
}

.card:not(.correct) {
  border: 1px solid red;
  box-shadow: 0px 0px 12px rgba(238, 154, 154, 0.699);
}

.correct {
  border: 1px solid green;
  box-shadow: 0px 0px 12px rgba(154, 238, 172, 0.699);
}

.p-field-radiobutton > label {
  margin-left: 0.5rem;
}
</style>
