<template>
  <div class="quizz">
    <div class="quizz-container">
      <div v-if="errorsApi.length">
        <Message severity="error" v-for="error in errorsApi" :key="error">{{
          Object.values(error)[0]
        }}</Message>
      </div>

      <Toolbar style="background: transparent">
        <template #start>
          <h1>Quizz numéro {{ $route.params.id }}</h1>
        </template>
      </Toolbar>

      <Message severity="info" v-if="score"
        >Quizz terminé ! Votre note est de {{ score }} !</Message
      >

      <div class="question-wrapper" v-if="!isLoadingData">
        <div
          class="card"
          v-for="question in questions"
          :key="question._id"
          :class="{
            incomplete: errors.find((error) => error === question._id),
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
              />
              <label :for="question._id + 'choice4'">{{
                question.choice4
              }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="question-wrapper" v-else>
        <div class="card" v-for="question in new Array(20)" :key="question">
          <div class="card-header">
            <Skeleton />
          </div>
          <div class="card-content">
            <div class="p-field-radiobutton">
              <Skeleton shape="round" />
              <Skeleton />
            </div>
            <div class="p-field-radiobutton">
              <Skeleton shape="round" />
              <Skeleton />
              <label><Skeleton /></label>
            </div>
            <div class="p-field-radiobutton">
              <Skeleton shape="round" />
              <Skeleton />
              <label><Skeleton /></label>
            </div>
            <div class="p-field-radiobutton">
              <Skeleton shape="round" />
              <Skeleton />
              <label><Skeleton /></label>
            </div>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between">
        <router-link to="/quizzs">
          <Button
            label="Revenir aux quizzs"
            icon="pi pi-arrow-left"
            class="p-button-text"
          />
        </router-link>
        <Button
          v-if="questions.length"
          label="Soumettre"
          @click="handleCheckAnswers"
          :loading="isLoading"
        />
      </div>
    </div>
  </div>
</template>

<script>
import gameController from "@/controllers/game.controller";
import scoreController from "@/controllers/score.controller";

export default {
  data() {
    return {
      isLoadingData: false,
      isLoading: false,
      score: null,
      questions: [],
      errors: [],
      errorsApi: [],
    };
  },

  async created() {
    this.isLoadingData = true;

    await gameController
      .getQuizz(this.$route.params.id)
      .then((response) => {
        this.questions = response.data.questions;
      })
      .catch(({ response }) => {
        this.errorsApi.push(response.data.error);
      });

    this.isLoadingData = false;
  },

  methods: {
    async handleCheckAnswers() {
      this.isLoading = true;

      this.errors = [];
      this.errorsApi = [];

      this.questions.forEach((question) => {
        if (!question.answer) {
          this.errors.push(question._id);
        }
      });

      if (this.errors.length) return (this.isLoading = false);

      const userAnswers = this.questions.map((question) => {
        return {
          _id: question._id,
          answer: question.answer,
        };
      });

      const scoreId = await gameController
        .checkAnswers({ id: this.$route.params.id, userAnswers })
        .then((response) => response.data.scoreId)
        .catch(({ response }) => {
          this.errorsApi.push(response.data.error);
        });

      await scoreController
        .getScore(scoreId)
        .then(({ data }) => (this.score = data.grade))
        .then(() => window.scrollTo(0, 0))
        .catch(({ response }) => {
          this.errorsApi.push(response.data.error);
        });

      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.quizz-container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem;
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

.p-field-radiobutton,
.p-field-radiobutton > label {
  cursor: pointer;
}

.p-field-radiobutton > label {
  margin-left: 0.5rem;
}

.incomplete {
  border: 1px solid red;
  box-shadow: 0px 0px 12px rgba(238, 154, 154, 0.699);
}
</style>
