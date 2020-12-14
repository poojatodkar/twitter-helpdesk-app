import io from "socket.io-client";
import { apiUrl } from "./constants";
let socketClient = null;

class SocketClient {
  constructor(services) {
    this.services = services;
    this.endpoint = "http://127.0.0.1:5001";
    this.authenticate = this.authenticate.bind(this);
    this.connection = io(`http://localhost:5000`).connect();
    this.socketHandler = this.socketHandler.bind(this);
    this.socketHandler();
  }

  socketHandler() {
    this.connection.on("connect", () => {
      console.log("connect >>>");
      this.authenticate();
    });

    this.connection.on("disconnect", () => {
      console.log("disconnect >>>");
    });

    this.connection.on("newTweets", () => {
      this.services.getTweets();
      console.log("newTweets >>>");
    });

    this.connection.on("handshake", data => {
      console.log("handShake >>>", data);
    });
  }

  authenticate = () => {
    const token = window.localStorage.getItem("twitter_helpdesk_token");
    console.log("authenticating >>>", token);

    this.connection.emit("authenticate", { token }, () => {
      console.log("authenticated >>>");
    });
  };

  closeSocket = () => {
    this.connection.close();
  };
}

const createSocketClient = options => {
  console.log("options", options);
  if (!socketClient) {
    socketClient = new SocketClient(options);
  }

  return socketClient;
};

export const closeConnection = () => {
  if (socketClient) {
    socketClient.closeSocket();
    socketClient = null;
  }
};

export default createSocketClient;
