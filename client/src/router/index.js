import { createRouter, createWebHistory } from "vue-router";
import userController from "@/controllers/user.controller";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    meta: { title: "Connexion" },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: { title: "Inscription" },
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "Accueil" },
    redirect: "/quizzs",
    children: [
      {
        path: "/quizzs",
        name: "Quizzs",
        meta: { title: "Les quizzs" },
        component: () => import("../views/Quizzs.vue"),
      },
      {
        path: "/quizzs/:id",
        params: { id: "id" },
        name: "Quizz",
        meta: { title: "Jeu" },
        component: () => import("../views/Quizz.vue"),
      },
      {
        path: "/scores",
        name: "Scores",
        meta: { title: "Mes scores" },
        component: () => import("../views/Scores.vue"),
      },
      {
        path: "/scores/:id",
        params: { id: "id" },
        name: "Score",
        meta: { title: "Score détail" },
        component: () => import("../views/Score.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error404",
    redirect: "/",
    meta: { title: "Erreur 404" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  window.document.title = "Quizzo - " + to.meta.title ?? "Quizzo - Accueil";
  window.scrollTo(0, 0);

  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired) {
    const loggedIn = await userController.checkToken().catch(() => false);

    if (loggedIn) {
      next();
    } else {
      next("/login");
    }
  } else {
    const loggedIn = await userController.checkToken().catch(() => false);

    if (!loggedIn) {
      next();
    } else {
      next("/quizzs");
    }
  }
});

export default router;
