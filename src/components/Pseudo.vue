<template>
  <div>
    <span>Pseudo : </span>
    <input v-model="pseudo" />
    <button v-on:click="updatePseudo">Valider</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pseudo: null,
    };
  },
  methods: {
    updatePseudo() {
      this.$socket.client.emit("update_pseudo", this.pseudo);
    },
  },
};
</script>

<style></style>
