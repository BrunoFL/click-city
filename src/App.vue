<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Pseudo />
    <ClientList />
    <Race />
  </div>
</template>

<script>
import ClientList from "./components/ClientList";
import Pseudo from "./components/Pseudo.vue";
import Race from "./components/Race";

export default {
  name: "App",
  components: {
    ClientList,
    Race,
    Pseudo,
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
