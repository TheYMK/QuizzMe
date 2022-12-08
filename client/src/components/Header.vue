<template>
  <div class="header">
    <div class="header-container">
      <div class="header-logo">
        <router-link to="/" class="header-logo-link">
          <img src="@/assets/logo.png" alt="logo" class="header-logo-img" />
        </router-link>
      </div>
      <div class="header-nav">
        <router-link to="/quizzs" class="header-nav-link"
          >Les quizz</router-link
        >
        <router-link to="/scores" class="header-nav-link"
          >Mes scores</router-link
        >
        <a class="header-nav-link" @click="isModalOpen = true">Déconnexion</a>
        <Dialog
          header="Confirmation"
          v-model:visible="isModalOpen"
          :style="{ width: '400px' }"
          :modal="true"
        >
          <div class="confirmation-content">
            <i
              class="pi pi-exclamation-triangle p-mr-3"
              style="font-size: 2rem"
            />
            <span>Souhaitez vous vraiment nous quitter?</span>
          </div>
          <template #footer>
            <Button
              label="Non, je suis bien ici."
              icon="pi pi-times"
              @click="isModalOpen = false"
              class="p-button-text p-button-danger"
            />
            <Button
              label="Oui."
              icon="pi pi-check"
              @click="handleLogout"
              class="p-button-text"
              autofocus
            />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import userController from "@/controllers/user.controller";

export default {
  data() {
    return {
      isModalOpen: false,
    };
  },

  methods: {
    async handleLogout() {
      userController.logout().then(() => this.$router.replace("/login"));
      this.isModalOpen = false;
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
}

.header-container {
  display: flex;
  margin: auto;
  justify-content: space-between;
  max-width: 1500px;
  align-items: center;
}

.header-logo-link > img {
  height: 75px;
}

.header-nav-link {
  margin: 2rem;
  cursor: pointer;
  text-decoration: none;
  color: var(--secondary-color);
}

.router-link-exact-active {
  color: var(--primary-color);
  font-weight: 600;
}

.confirmation-content {
  display: flex;
  align-items: center;
}

.confirmation-content > span {
  margin-left: 0.5rem;
}
</style>
