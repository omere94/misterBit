<template>
  <section class="chat">
    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span>{{ msg.from }}:</span>
        {{ msg.txt }}
      </li>
    </ul>
    <form @submit.prevent="sendMsg">
      <div>
        <input
          @input="typing"
          type="text"
          v-model="msg.txt"
          placeholder="Type your message.."
        />
        <button>Send</button>
      </div>
      <p v-if="userTyping">{{ userTyping }} is typing..</p>
    </form>
  </section>
</template>
 
<script>
import { socketService } from "../services/socket.service";

export default {
  name: "chat-room",
  props: {
    toy: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      msg: {
        from: this.$store.getters.loggedinUser?.fullname || "Guest",
        txt: "",
      },
      // msgs: [],
      topic: this.toy._id,
      userTyping: "",
    };
  },
  created() {
    socketService.setup();
    socketService.emit("chat topic", this.topic);
    socketService.on("chat addMsg", this.addMsg);
    socketService.on("chat userTyping", this.setTyping);
  },
  unmounted() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.off("chat userTyping", this.isTyping);
    // socketService.terminate();
  },
  methods: {
    sendMsg() {
      socketService.emit("chat newMsg", this.msg);
      // next line for when broadcasting from server
      const msg = JSON.parse(JSON.stringify(this.msg));
      this.addMsg(msg);

      this.$emit("msgSent");
      this.doneTyping();
      this.msg.txt = "";
    },
    addMsg(msg) {
      // this.msgs.push(msg);
      this.$emit("addMsg", msg);
    },
    setTyping({ username, isDoneTyping }) {
      if (isDoneTyping) return (this.userTyping = "");
      // if doneTyping then set this.userTyping = ''
      this.userTyping = username;
      console.log("this.userTyping", this.userTyping);
    },
    typing() {
      console.log("typing...");
      const username = this.msg.from;
      if (!this.msg.txt.length) return this.doneTyping();
      socketService.emit("chat typing", { username });
    },
    doneTyping() {
      const username = this.msg.from;
      socketService.emit("chat typing", {
        username,
        isDoneTyping: true,
      });
    },
  },
  computed: {
    msgs() {
      return this.toy.msgs;
    },
  },
  components: {},
};
</script>
 
<style>
</style>