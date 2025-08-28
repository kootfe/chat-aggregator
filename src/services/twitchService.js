import tmi from 'tmi.js';

export default class TwitchService {
  constructor(channel, onMessage) {
    this.client = new tmi.Client({
      channels: [channel],
    });
    this.onMessage = onMessage;
    this.client.on('message', (channel, tags, message, self) => {
      this.onMessage({
        username: tags['display-name'],
        text: message,
      });
    });
  }

  start() {
    this.client.connect().catch(console.error);
  }

  stop() {
    this.client.disconnect().catch(console.error);
  }
}
