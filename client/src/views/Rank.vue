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
          <h1>Quizz numéro {{ $route.params.id }}</h1>
        </template>

        <template #end v-if="ranks.length">
          <p>
            Votre meilleur rang est de {{ findPB }} sur
            {{ ranks.length }} joueurs
          </p>
        </template>
      </Toolbar>

      <div class="question-wrapper" v-if="!isLoadingData">
        <div
          class="card"
          v-for="rank in ranks"
          :key="rank.rank"
          :class="{
            correct: rank.isUserScore,
          }"
        >
          <div class="card-header">
            <Badge
              :value="rank.rank"
              :size="
                rank.rank === 1 ? 'xlarge' : rank.rank === 2 ? 'large' : ''
              "
              :severity="
                rank.rank === 1
                  ? 'success'
                  : rank.rank === 2
                  ? 'info'
                  : rank.rank === 3
                  ? 'warning'
                  : ''
              "
            ></Badge>
            <br />
            <div style="margin-top: 2rem">
              Joueur numéro :
              <u>{{ rank.userId }} {{ rank.isUserScore ? '(Vous)' : '' }}</u>
            </div>
            <p>
              Score de
              <b>
                {{ rank.grade }}
              </b>
            </p>
          </div>
          <div class="card-content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import scoreController from '@/controllers/score.controller';

export default {
  data() {
    return {
      isLoadingData: false,
      ranks: [],
      errors: [],
    };
  },

  async created() {
    this.isLoadingData = true;

    await scoreController
      .getRank(this.$route.params.id)
      .then((response) => {
        this.ranks = response.data;
      })
      .catch(({ response }) => {
        this.errors.push(response.data.error);
      });

    this.isLoadingData = false;
  },

  computed: {
    findPB() {
      return this.ranks.findIndex((a) => a.isUserScore) + 1;
    },
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
