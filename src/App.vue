<template>
  <div class="app-container" :class="{ 'dark-theme': isDarkTheme }">
    <!-- <header class="app-header">
      <i class="ri-chat-heart-fill"></i>
      <h1>Chat Aggregator</h1>
      <button @click="toggleTheme" class="theme-toggle">
        <i :class="isDarkTheme ? 'ri-sun-fill' : 'ri-moon-fill'"></i>
        {{ isDarkTheme ? 'Light Theme' : 'Dark Theme' }}
      </button>
    </header> -->
    <div class="main-content">
      <aside class="settings-sidebar">
        <Settings
          @update-settings="updateSettings"
          :initial-settings="initialSettings"
        />
      </aside>
      <main class="chat-main">
        <ChatDisplay :messages="messages" />
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ChatDisplay from './components/ChatDisplay.vue';
import Settings from './components/Settings.vue';

export default {
  name: 'App',
  components: { ChatDisplay, Settings },
  data() {
    return {
      isDarkTheme: false,
      initialSettings: {
        twitchChannel: '',
        youtubeLiveId: '',
        kickChannel: '',
      },
    };
  },
  computed: {
    ...mapState(['messages']),
  },
  watch: {
    messages: {
      handler(newMessages) {
        console.log('App.vue Messages:', newMessages.length);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    updateSettings(settings) {
      console.log('App.vue: Updating settings:', settings);
      this.$store.dispatch('updateSettings', settings);
    },
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      document.documentElement.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light');
    },
    parseQueryParams() {
      const params = new URLSearchParams(window.location.search);
      return {
        twitchChannel: params.get('twitch') || '',
        youtubeLiveId: params.get('youtube_vid') || '',
        kickChannel: params.get('kick') || '',
        theme: params.get('theme') || '',
      };
    },
  },
  mounted() {
    const queryParams = this.parseQueryParams();
    this.initialSettings = {
      twitchChannel: queryParams.twitchChannel,
      youtubeLiveId: queryParams.youtubeLiveId,
      kickChannel: queryParams.kickChannel,
    };

    // Set theme from query parameter or system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkTheme = queryParams.theme === 'dark' || (queryParams.theme !== 'light' && prefersDark);
    document.documentElement.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light');
    console.log('App.vue: Applied theme:', this.isDarkTheme ? 'dark' : 'light');

    // Auto-start services if any channel settings are provided
    if (this.initialSettings.twitchChannel || this.initialSettings.youtubeLiveId || this.initialSettings.kickChannel) {
      console.log('App.vue: Applying settings from URL:', this.initialSettings);
      this.updateSettings(this.initialSettings);
    } else {
      console.log('App.vue: No query parameters provided; waiting for settings.');
    }
  },
};
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
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
}
.settings-sidebar {
  width: 0; /* Hidden settings UI */
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
    width: 0;
  }
}
</style>
