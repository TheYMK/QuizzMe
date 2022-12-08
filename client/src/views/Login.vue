<template>
  <div class="wrapper-login">
    <div v-if="errors.length">
      <Message severity="error" v-for="error in errors" :key="error">{{
        Object.values(error)[0]
      }}</Message>
    </div>
    <!-- FORM LOGIN -->
    <div class="card">
      <div class="card-header">
        <img src="@/assets/logo.png" alt="logo" class="logo-badge" />
        <h1>Connexion</h1>
        <p>Veuillez entrer vos identifiants</p>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="form-control">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-at"></i>
            </span>
            <InputText
              v-model="email"
              :class="{ 'p-invalid': v$.email.$error }"
              placeholder="Adresse email"
            />
          </div>
          <span v-if="v$.email.$error">
            <span v-for="(error, index) of v$.email.$errors" :key="index">
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
        </div>

        <div class="form-control">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-lock"></i>
            </span>
            <InputText
              v-model="password"
              type="password"
              :class="{ 'p-invalid': v$.password.$error }"
              placeholder="Mot de passe"
            />
          </div>
          <span v-if="v$.password.$error">
            <span v-for="(error, index) of v$.password.$errors" :key="index">
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
        </div>

        <Button
          label="Se connecter"
          type="submit"
          style="width: 100%; margin-top: 1rem"
          :loading="isLoading"
        />
      </form>
    </div>

    <!-- BACK BUTTON -->
    <div class="btn-wrapper">
      <p>Pas encore de compte ?</p>
      <router-link to="/register" class="link">Inscrivez-vous</router-link>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import userController from '@/controllers/user.controller';
import { userLogin } from '@/models/user.model';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      isLoading: false,
      email: '',
      password: '',
      errors: [],
    };
  },
  validations() {
    return userLogin;
  },
  methods: {
    async handleLogin() {
      this.errors = [];
      /* CHECK VALIDATION ON FORM */
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

      /* SUCCESS VALIDATION */
      this.isLoading = true;
      const body = {
        email: this.email,
        password: this.password,
      };

      await userController
        .login(body)
        .then(() => {
          this.$router.push({ name: 'Home' });
        })
        .catch(({ response }) => {
          this.errors.push(response.data.error);
        });

      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.wrapper-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f3f5fe;
  position: relative;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.card {
  padding: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  margin-top: 2rem;
}

.form-control {
  text-align: end;
}

.form-control:not(:last-of-type) {
  margin-bottom: 1rem;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
}

.card-header > p {
  font-weight: 200;
  margin: 0.5rem 0;
}

.btn-wrapper {
  margin-top: 2rem;
  display: flex;
}

.btn-wrapper > p {
  margin: 0;
  color: #495057;
  font-weight: 200;
}

.btn-wrapper > .link {
  margin-left: 0.3rem;
  font-weight: 600;
  color: var(--primary-color);
  text-decoration: none;
}

.btn-wrapper > .link:hover {
  text-decoration: underline;
}

.logo-badge {
  width: 75px;
}
</style>
