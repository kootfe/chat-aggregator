<template>
  <div class="chat-display" ref="chatContainer">
    <div v-for="message in messages" :key="message.id" class="message" :class="message.platform">
      <i :class="`ri-${getIcon(message.platform)}`"></i>
      <span class="username">{{ message.username || 'Unknown' }}</span>
      <span class="text">{{ message.text || 'No content' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatDisplay',
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getIcon(platform) {
      switch (platform) {
        case 'twitch':
          return 'twitch-fill';
        case 'youtube':
          return 'youtube-fill';
        case 'kick':
          return 'kick-fill';
        default:
          return 'chat-3-fill';
      }
    },
    debounce(func, wait) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    },
    scrollToBottom() {
      const startTime = performance.now();
      const container = this.$refs.chatContainer;
      container.scrollTop = container.scrollHeight;
      const endTime = performance.now();
    },
  },
    watch: {
        messages(newMessages, oldMessages) {
            this.$nextTick(() => {
                // sadece mesaj sayısı artmışsa scroll et
                if (newMessages.length > oldMessages.length) {
                    this.scrollToBottom();
                }
            });
        },
    },
    mounted() {
        console.log('ChatDisplay Mounted, Initial Messages:', this.messages);
    },
};
</script>

<style scoped>
.chat-display {
    min-height: 100vh;
    overflow-y: auto;
    background: var(--bg-secondary);
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    scrollbar-width: thin;
    scrollbar-color: var(--accent-color) var(--bg-secondary);
}
.chat-display::-webkit-scrollbar {
    width: 8px;
}
.chat-display::-webkit-scrollbar-thumb {
    background: var(--accent-color);
    border-radius: 4px;
}
.chat-display::-webkit-scrollbar-track {
    background: var(--bg-secondary);
}
.message {
    display: flex;
    align-items: center;
    padding: 12px;
    margin-bottom: 8px;
    background: var(--bg-primary);
    border-radius: 8px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.message:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.message i {
    font-size: 1.5em;
    margin-right: 12px;
    color: var(--icon-color);
}
.message.twitch i { color: #7b55c7; } /* Blend of Twitch purple with #2da592 */
.message.youtube i { color: #ff4d4d; } /* Softened YouTube red */
.message.kick i { color: #2da592; } /* Matches palette */
.username {
    font-weight: 600;
    color: var(--text-primary);
    margin-right: 8px;
}
.text {
    flex: 1;
    color: var(--text-secondary);
}
.platform {
    font-size: 0.75em;
    color: var(--text-muted);
    margin-left: 8px;
    opacity: 0.7;
}
.twitch { border-left: 4px solid #7b55c7; }
.youtube { border-left: 4px solid #ff4d4d; }
.kick { border-left: 4px solid #2da592; }
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
.message {
    animation: fadeIn 0.3s ease-in;
}
</style>
