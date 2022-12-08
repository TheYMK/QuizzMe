<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap');

* {
  box-sizing: border-box;
  /* SCROLLBAR */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
}
/* SCROLLBAR */
*::-webkit-scrollbar,
*::-webkit-scrollbar-thumb {
  width: 10px;
  height: 10px;
  border-radius: 13px;
  background-clip: padding-box;
  border: 2px solid transparent;
  color: rgba(0, 0, 0, 0.3);
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 0 10px;
}

html {
  height: 100%;
  width: 100%;
}

body {
  font-family: var(--font-family);
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: var(--surface-c);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

a {
  text-decoration: none;
}

.card {
  background: #fff;
  color: #043d75;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  border-radius: 6px;
}
</style>
