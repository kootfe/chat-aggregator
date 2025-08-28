# Chat Aggregator

A modern, lightweight, and responsive web application that aggregates live chat messages from Twitch, YouTube, and Kick in real-time. Built with Vue.js and Vite, this project features a sleek sidebar interface, customizable themes (light/dark), and a cohesive color palette. It is optimized for low memory usage (~200-300 MB) and fast performance, making it ideal for streamers and content creators to monitor multiple chat platforms simultaneously.

## Features

- **Multi-Platform Chat Integration**:
  - Twitch: Real-time messages via `tmi.js` (IRC WebSockets).
  - YouTube: Polling-based messages via YouTube Data API v3.
  - Kick: Real-time messages via Pusher WebSockets.
- **Responsive Design**: Sidebar layout with settings on the left and chat display on the right, stacking vertically on mobile.
- **Custom Theme**: Uses a elegant color palette (`#123a49`, `#2da592`, `#8bcbb7`, `#f5faf6`) with light/dark mode support.
- **Remixicon Icons**: Platform-specific icons (Twitch, YouTube, Kick) for visual clarity.
- **Optimized Performance**:
  - Limits stored messages to 100 and displayed messages to 50 to reduce RAM usage.
  - Debounced UI updates and cleaned-up event listeners to prevent memory leaks.
  - 2-second YouTube polling interval to balance speed and API quota.
- **Secure Configuration**: YouTube API key stored in `.env` for security.

## Prerequisites

- **Node.js**: Version 18 or higher.
- **npm**: Version 8 or higher.
- **YouTube API Key**: Obtain from [Google Cloud Console](https://console.cloud.google.com/) with YouTube Data API v3 enabled.
- **Live Channels**: Access to live Twitch, YouTube, and Kick channels for testing.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/chat-aggregator.git
   cd chat-aggregator
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the project root:
     ```env
     VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
     ```
   - Replace `your_youtube_api_key_here` with your YouTube Data API key.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   - Open the app at `http://localhost:5173`.

## Usage

1. **Configure Settings**:
   - In the left sidebar, enter:
     - **Twitch Channel**: Your Twitch channel name (e.g., `ninja`).
     - **YouTube Video ID**: The video ID of a live YouTube stream (e.g., `dQw4w9WgXcQ`).
     - **Kick Channel**: Your Kick channel slug (e.g., `yourchannelname`).
   - Click **Save Settings** to connect to the platforms.

2. **View Chats**:
   - Messages from Twitch, YouTube, and Kick appear in the right chat display in real-time.
   - Each message shows the platform icon, username, text, and platform name, styled with platform-specific colors (Twitch: purple, YouTube: red, Kick: green).

3. **Toggle Theme**:
   - Use the theme toggle button in the header to switch between light and dark modes.

## Project Structure

```
chat-aggregator/
├── public/
│   ├── vite.svg
├── src/
│   ├── assets/
│   │   ├── vue.svg
│   ├── components/
│   │   ├── ChatDisplay.vue        # Chat message display with icons
│   │   ├── HelloWorld.vue        # Default Vite component (unused)
│   │   ├── Settings.vue          # Sidebar settings form
│   ├── services/
│   │   ├── kickService.js        # Kick chat via Pusher
│   │   ├── twitchService.js      # Twitch chat via tmi.js
│   │   ├── youtubeService.js     # YouTube chat via API polling
│   ├── store/
│   │   ├── index.js              # Vuex store for state management
│   ├── App.vue                   # Main app with sidebar layout
│   ├── main.js                   # Entry point
│   ├── style.css                 # Global styles with color palette
├── .env                          # Environment variables (not committed)
├── .gitignore                    # Git ignore file
├── index.html                    # HTML entry with Inter font and Remixicon
├── package.json                  # Dependencies and scripts
├── README.md                     # This file
├── vite.config.js                # Vite configuration
```

## Dependencies

- `vue`: ^3.5.18
- `vuex`: ^4.1.0
- `axios`: ^1.11.0
- `pusher-js`: ^8.4.0
- `tmi.js`: ^1.8.5
- `uuid`: ^10.0.0
- `remixicon`: ^4.4.0 (also loaded via CDN)
- Dev: `@vitejs/plugin-vue`, `vite`

## Optimization Notes

- **Memory Usage**: Capped at ~200-300 MB by limiting messages (100 stored, 50 displayed) and cleaning up event listeners.
- **YouTube Polling**: Set to 2 seconds to balance performance and API quota (43,200 requests/day). Adjust to 1 second in `youtubeService.js` if needed, but monitor quota.
- **Security**: `.env` file keeps the YouTube API key secure. Never commit `.env` to Git.

## Troubleshooting

- **YouTube Messages Not Appearing**:
  - Check `.env` for a valid `VITE_YOUTUBE_API_KEY`.
  - Verify the YouTube video ID is for a live stream.
  - Look for `YouTube Polling Error` in the console.
- **High RAM Usage**:
  - Use Chrome DevTools > Memory to take heap snapshots.
  - Reduce `maxMessages` in `store/index.js` to 50 or lower.
  - Disable animations in `ChatDisplay.vue` by removing `animation` styles.
- **Kick Icon Missing**:
  - If `ri-kick-fill` is unavailable, replace with `ri-chat-3-fill` in `ChatDisplay.vue` and `Settings.vue`.

## Contributing

Contributions are welcome! Please:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with [Vue.js](https://vuejs.org/) and [Vite](https://vite.dev/).
- Icons by [Remixicon](https://remixicon.com/).
- Fonts by [Google Fonts](https://fonts.google.com/) (Inter).
- Inspired by the need for a unified live chat experience for streamers.
