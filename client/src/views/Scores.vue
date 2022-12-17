<template>
  <div class="scores">
    <div class="scores-container">
      <div v-if="errors.length">
        <Message severity="error" v-for="error in errors" :key="error">{{
          Object.values(error)[0]
        }}</Message>
      </div>

      <Toolbar style="background: transparent">
        <template #start>
          <h1>Vos scores</h1>
        </template>
      </Toolbar>

      <div class="score-wrapper" v-if="!isLoadingData">
        <div class="card" v-for="score in scores" :key="score.id">
          <div class="card-content">
            <div style="display: flex">
              <div class="card-quizz">
                <span><b>Référence quizz:</b> {{ score.quizzId }}</span>
              </div>
              <div class="card-grade">
                <span><b>Note:</b> {{ score.grade }}</span>
              </div>
            </div>
            <div>
              <router-link
                :to="{ name: 'Rank', params: { id: score.quizzId } }"
              >
                <Button
                  label="Voir le classement"
                  style="margin-right: 1rem"
                  class="p-button-secondary"
                />
              </router-link>
              <router-link :to="{ name: 'Score', params: { id: score.id } }">
                <Button label="Voir les résultats" />
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="score-wrapper" v-else>
        <div class="card" v-for="score in new Array(14)" :key="score">
          <div class="card-content">
            <div style="display: flex">
              <div class="card-quizz">
                <span><Skeleton /></span>
              </div>
              <div class="card-grade">
                <span><Skeleton /></span>
              </div>
            </div>
            <Skeleton height="45.556px"></Skeleton>
          </div>
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
      scores: [],
      errors: [],
    };
  },

  async created() {
    this.isLoadingData = true;

    await scoreController
      .getScores()
      .then((response) => {
        this.scores = response.data;
      })
      .catch(({ response }) => {
        this.errors.push(response.data.error);
      });

    this.isLoadingData = false;
  },
};
</script>

<style scoped>
.scores-container {
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
  justify-content: space-between;
  align-items: center;
}

.card-grade {
  margin-left: 1rem;
}
</style>
