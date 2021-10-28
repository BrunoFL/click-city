<template>
  <div id="race">
    <button v-on:click="increment">+1</button>

    <div class="race" v-if="clients.length > 0">
      <div v-for="client in clients" :key="client.id">
        <span v-if="isMyId(client.id)">👉 </span>
        <span v-if="!isMyId(client.id)">💣 </span>
        <progress class="racer" v-bind:value="client.value" max="100" min="0" />
      </div>
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
    isMyId(id) {
      return id === this.$socket.client.id;
    },
  },
  sockets: {
    /*
     * 👂 Listen to socket events emitted from the socket server
     */
    update_clients(clients) {
      clients.sort((a, b) => {
        return a.value < b.value;
      });
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
  border: 2px solid black;
  border-radius: 10px;
  color: blueviolet;
}
button {
  border-radius: 10px;
  border: 2px solid black;
  width: 100px;
  height: 30px;
  margin: 10px;
}
</style>
