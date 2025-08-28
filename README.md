# Chat Aggregator

A lightweight, responsive web application for aggregating live chat messages from Twitch, YouTube, and Kick in real-time. Built with Vue.js and Vite, it features a full-width chat display, custom color palette, and low memory usage (~200-300 MB). Ideal for streamers, with configuration via URL query parameters and automatic startup.

## Features

- **Multi-Platform Chat Integration**:
  - Twitch: Real-time messages via `tmi.js` (IRC WebSockets).
  - YouTube: Polling-based messages via YouTube Data API v3.
  - Kick: Real-time messages via Pusher WebSockets.
- **URL Query Parameter Configuration**:
  - Auto-load channel settings with `?twitch=channel&kick=channel&youtube_vid=videoid`.
  - Set theme with `?theme=dark` or `?theme=light`.
- **Automatic Startup**: Services start automatically when valid query parameters are provided.
- **Hidden Settings UI**: Configuration is done via URL; no visible settings form.
- **Responsive Design**: Full-width chat display, mobile-friendly.
- **Custom Theme**: Elegant color palette (`#123a49`, `#2da592`, `#8bcbb7`, `#f5faf6`) with light/dark mode support.
- **Remixicon Icons**: Platform-specific icons (Twitch, YouTube, Kick).
- **Optimized Performance**:
  - Memory capped at ~200-300 MB by limiting messages (100 stored, 50 displayed).
  - Cleaned-up event listeners for Pusher and `tmi.js` to prevent memory leaks.
  - YouTube polling set to 2 seconds to balance speed and API quota.
- **Secure Configuration**: YouTube API key stored in `.env`.

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
   - Open the app at `http://localhost:5173?twitch=yourchannel&kick=yourchannel&youtube_vid=yourvideoid&theme=dark`.

## Usage

1. **Configure via URL**:
   - Use query parameters to set channels and theme, e.g.:
     ```
     http://localhost:5173?twitch=bertugfahriozer&kick=bertugfahriozer&youtube_vid=QWsdserc&theme=dark
     ```
   - Parameters:
     - `twitch`: Twitch channel name (e.g., `bertugfahriozer`).
     - `youtube_vid`: YouTube live video ID (e.g., `QWsdserc`).
     - `kick`: Kick channel slug (e.g., `bertugfahriozer`).
     - `theme`: `dark` or `light` (defaults to system `prefers-color-scheme`).
   - The app auto-starts with the specified channels and theme.

2. **View Chats**:
   - Messages from Twitch, YouTube, and Kick appear in real-time with platform-specific icons and colors (Twitch: purple, YouTube: red, Kick: green).

3. **Toggle Theme**:
   - Use the theme toggle button in the header to switch between light and dark modes manually.

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
│   │   ├── Settings.vue          # Hidden settings logic
│   ├── services/
│   │   ├── kickService.js        # Kick chat via Pusher
│   │   ├── twitchService.js      # Twitch chat via tmi.js
│   │   ├── youtubeService.js     # YouTube chat via API polling
│   ├── store/
│   │   ├── index.js              # Vuex store for state management
│   ├── App.vue                   # Main app with chat layout
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

- **Memory Usage**: Capped at ~200-300 MB with 100 stored messages and 50 displayed.
- **YouTube Polling**: 2-second interval to balance performance and API quota (43,200 requests/day).
- **Security**: `.env` file secures the YouTube API key. Never commit `.env` to Git.

## Troubleshooting

- **YouTube Messages Not Appearing**:
  - Check `.env` for a valid `VITE_YOUTUBE_API_KEY`.
  - Ensure `youtube_vid` is for a live stream.
  - Look for `YouTube Polling Error` in the console.
- **High RAM Usage**:
  - Use Chrome DevTools > Memory to take heap snapshots.
  - Reduce `maxMessages` in `store/index.js` to 50 if needed.
- **Kick Icon Missing**:
  - If `ri-kick-fill` is unavailable, replace with `ri-chat-3-fill` in `ChatDisplay.vue`.
- **No Messages Without Query Parameters**:
  - The app requires valid `twitch`, `youtube_vid`, or `kick` parameters to start.

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
