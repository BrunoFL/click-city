<template>
  <div id="race" class="row justify-content-center gap-3">
    <button type="button" class="btn btn-outline-primary" v-on:click="increment">
      +1
    </button>
    <div class="group row align-items-start" v-for="client in clients" :key="client.id">
      <div class="row">
        <span class="col-1" v-if="isMyId(client.id)">👉 </span>
        <span class="col-1" v-if="!isMyId(client.id)">💣 </span>
        <div class="col-11 progress p-0">
          <div
            class="progress-bar progress-bar-animated progress-bar-striped"
            role="progressbar"
            aria-valuenow="1"
            aria-valuemin="0"
            aria-valuemax="100"
            v-bind:style="valueBar(client.value)"
          ></div>
        </div>
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
    valueBar(value) {
      return "width: " + value + "%;";
    },
  },
  sockets: {
    /*
     * 👂 Listen to socket events emitted from the socket server
     */
    update_clients(clients) {
      console.log(clients);
      clients.sort((a, b) => {
        return b.value - a.value;
      });
      this.clients = clients;
      console.log(clients);
    },
  },
};
</script>

<style></style>
