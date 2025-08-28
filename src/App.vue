<template>
  <div class="app-container" :class="{ 'dark-theme': isDarkTheme }">
    <header class="app-header">
      <i class="ri-chat-3-fill"></i>
      <h1>Chat Aggregator</h1>
      <button @click="toggleTheme" class="theme-toggle">
        <i :class="isDarkTheme ? 'ri-sun-fill' : 'ri-moon-fill'"></i>
        {{ isDarkTheme ? "Light Theme" : "Dark Theme" }}
      </button>
    </header>
    <div class="main-content">
      <aside class="settings-sidebar">
        <Settings @update-settings="updateSettings" />
      </aside>
      <main class="chat-main">
        <ChatDisplay :messages="messages" />
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ChatDisplay from "./components/ChatDisplay.vue";
import Settings from "./components/Settings.vue";

export default {
  name: "App",
  components: { ChatDisplay, Settings },
  data() {
    return {
      isDarkTheme: false,
    };
  },
  computed: {
    ...mapState(["messages"]),
  },
  watch: {
    messages: {
      handler(newMessages) {
        console.log("App.vue Messages:", newMessages);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    updateSettings(settings) {
      this.$store.dispatch("updateSettings", settings);
    },
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      document.documentElement.setAttribute(
        "data-theme",
        this.isDarkTheme ? "dark" : "light"
      );
    },
  },
  mounted() {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    this.isDarkTheme = prefersDark;
    document.documentElement.setAttribute(
      "data-theme",
      this.isDarkTheme ? "dark" : "light"
    );
  },
};
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: "Inter", system-ui, sans-serif;
  background: var(--bg-primary);
  min-height: 100vh;
  transition: background 0.3s ease;
}
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.app-header i {
  font-size: 2em;
  color: var(--accent-color);
  margin-right: 12px;
}
h1 {
  font-size: 1.8em;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
}
.theme-toggle {
  background: var(--accent-color);
  color: var(--bg-primary);
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9em;
  transition: background 0.2s ease;
}
.theme-toggle:hover {
  background: var(--accent-hover);
}
.theme-toggle i {
  font-size: 1.2em;
}
.main-content {
  display: flex;
  gap: 24px;
}
.settings-sidebar {
  width: 300px;
  flex-shrink: 0;
}
.chat-main {
  flex: 1;
}
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  .settings-sidebar {
    width: 100%;
  }
}
</style>
