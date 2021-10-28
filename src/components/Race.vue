<template>
  <div id="race">
    <button v-on:click="increment">+1</button>

    <div class="race" v-if="clients.length > 0">
      <progress
        class="racer"
        v-for="client in clients"
        :key="client.id"
        v-html="client.id"
        v-bind:value="client.value"
        max="100"
        min="0"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      clients: [],
    };
  },
  methods: {
    /*
     * 💥 Emit increment_counter event to the socket server.
     */
    increment() {
      this.$socket.client.emit("increment_counter");
    },
  },
  sockets: {
    /*
     * 👂 Listen to socket events emitted from the socket server
     */
    update_clients(clients) {
      this.clients = clients;
    },
  },
};
</script>

<style scoped>
.race {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}
.racer {
  width: 300px;
  height: 20px;
  margin: 3px;
  padding: 5px;
}
</style>
