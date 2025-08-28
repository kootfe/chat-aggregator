import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default class KickService {
  constructor(channelId, onMessage) {
    this.channelId = channelId;
    this.onMessage = onMessage;
    this.pollingInterval = null;
  }

  start() {
    this.pollingInterval = setInterval(() => {
      this.fetchMessages();
    }, 1000); // Poll every 1 seconds
  }

  async fetchMessages() {
    try {
      const response = await axios.get(
        `https://kick.com/api/v2/channels/${this.channelId}/messages`
      );

      // Extract messages array
      const messages = Array.isArray(response.data?.data?.messages)
        ? response.data.data.messages
        : [];
      if (messages.length === 0) {
        console.log("No new messages from Kick API");
        return;
      }

      messages.forEach((msg) => {
        const message = {
          id: msg.id || uuidv4(),
          username: msg.sender?.username || msg.sender?.name || "Unknown",
          text: msg.content || msg.message || "No content",
          platform: "kick",
        };
        this.onMessage(message);
      });
    } catch (error) {
      console.error(
        "Kick Polling Error:",
        error.response?.data || error.message
      );
    }
  }

  stop() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }
}
