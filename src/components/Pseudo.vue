<template>
  <div class="row">
    <div class="input-group mb-3 align-items-center hstack gap-3">
      <input type="text" class="form-control" v-model="pseudo" />
      <button
        type="button"
        class="btn btn-primary"
        placeholder="Pseudo"
        v-on:click="updatePseudo"
      >
        Valider
      </button>
    </div>
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
