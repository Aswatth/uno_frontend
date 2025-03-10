import { Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import { clientStore } from "./data-stores/webSocketStore";

export const WebSocket = () => {
  const { setClient } = clientStore();

  useEffect(() => {
    const client = new Client({
      brokerURL: process.env.NEXT_PUBLIC_URL,
      // debug: function (str) {
      //   console.log(str);
      // },
      connectHeaders: {},
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = function (frame) {
      console.log("CONNECTED:\t" + frame);
    };

    client.onStompError = function (frame) {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };

    setClient(client);
    client.activate();
  }, []);
};
