<template>
  <div class="quizzs">
    <div class="quizzs-container">
      <div v-if="errors.length">
        <Message severity="error" v-for="error in errors" :key="error">{{
          Object.values(error)[0]
        }}</Message>
      </div>

      <Toolbar style="background: transparent">
        <template #start>
          <h1>Liste des quizz</h1>
        </template>

        <template #end>
          <Dropdown
            v-model="selectedDifficulty"
            :options="difficulties"
            optionLabel="label"
            optionValue="value"
            placeholder="Choix de la difficulté"
            style="margin-right: 10px"
            showClear
            @change="getQuizzsWithSearch()"
          />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              type="text"
              v-model="searchFilter"
              placeholder="Catégorie..."
            />
          </span>
        </template>
      </Toolbar>

      <div class="quizzs-wrapper" v-if="!isLoadingData">
        <div v-for="quizz in quizzs" :key="quizz._id">
          <div class="card">
            <p
              class="difficulty-badge"
              :class="'difficulty-state-' + quizz.difficulty"
            >
              {{ difficulties[quizz.difficulty - 1].label }}
            </p>

            <div class="quizzs-item-label">
              <h2>{{ quizz.label }}</h2>
            </div>
            <p style="text-align: left">
              Total de <b>{{ quizz.questions.length }}</b> questions
            </p>
            <div class="quizzs-item-actions">
              <router-link :to="{ name: 'Quizz', params: { id: quizz._id } }">
                <Button
                  label="Jouer"
                  style="width: 100%; margin-top: 1rem"
                  :loading="isLoading"
                />
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="quizzs-wrapper" v-else>
        <div v-for="quizz in new Array(17)" :key="quizz">
          <div class="card">
            <p class="difficulty-badge">
              <Skeleton style="position: absolute; width: 50px; left: 0" />
            </p>

            <div class="quizzs-item-label">
              <h2><Skeleton style="width: 100px" /></h2>
            </div>
            <p style="text-align: left">
              <Skeleton />
            </p>
            <div class="quizzs-item-actions">
              <Skeleton height="45.556px"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gameController from "@/controllers/game.controller";
import { debounce } from "debounce";

export default {
  data() {
    return {
      isLoadingData: false,
      searchFilter: "",
      difficulties: [
        { label: "Facile", value: "1" },
        { label: "Moyen", value: "2" },
        { label: "Difficile", value: "3" },
      ],
      selectedDifficulty: null,
      isLoading: false,
      quizzs: [],
      errors: [],
    };
  },

  async created() {
    this.isLoadingData = true;

    /* DEBOUNCE INPUT FILTER */
    this.getQuizzsWithSearch = debounce(this.getQuizzsWithSearch, 1000);

    await gameController
      .getQuizzs()
      .then((response) => {
        this.quizzs = response.data.quizz;
      })
      .catch(({ response }) => {
        this.errors.push(response.data.error);
      });

    this.isLoadingData = false;
  },

  methods: {
    async getQuizzsWithSearch(search = this.searchFilter) {
      this.isLoadingData = true;

      let params = {
        difficulty: this.selectedDifficulty,
      };

      if (search) {
        params["label"] = search;
      }

      await gameController
        .getQuizzs(params)
        .then((response) => {
          this.quizzs = response.data.quizz;
        })
        .catch(({ response }) => {
          this.errors.push(response.data.error);
        });

      this.isLoadingData = false;
    },
  },

  watch: {
    searchFilter: function (search) {
      this.getQuizzsWithSearch(search);
    },
  },
};
</script>

<style scoped>
.quizzs-container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin: 0;
  text-align: left;
}

.quizzs-wrapper {
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 40px;
  grid-row-gap: 40px;
}

.card {
  padding: 1rem;
  position: relative;
}

.difficulty-state-1 {
  background-color: #c8e6c9;
  color: #256029;
}

.difficulty-state-2 {
  background-color: #ffd8b2;
  color: #805b36;
}

.difficulty-state-3 {
  background-color: #ffcdd2;
  color: #c63737;
}

.difficulty-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
  width: fit-content;
  position: absolute;
  top: 0;
}

.quizzs-item-label {
  margin-top: 2rem;
  text-align: left;
  text-transform: uppercase;
  font-size: 0.8rem;
  text-align: left;
}

@media screen and (max-width: 1200px) {
  .quizzs-wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 800px) {
  .quizzs-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 550px) {
  .quizzs-wrapper {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
