import React, { useState } from "react";
import { Form, Input } from "semantic-ui-react";
import socket from "../socket";

function HistoryMessages({ messages }) {
  return messages.map((message) => (
    <div key={message.id}>
      {message.player.name}: {message.text}
    </div>
  ));
}

function GuessInput({ roomId }) {
  const [message, setMessage] = useState("");
  return (
    <Form
      onSubmit={() => {
        if (message.length > 0) {
          socket.emit("player-guess-input", { roomId, message });
          setMessage("");
        }
      }}
    >
      <Form.Field>
        <input
          placeholder="Type your guess here..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </Form.Field>
    </Form>
  );
}

function ChatBox({ roomId, messages }) {
  return (
    <div>
      ChatBox
      <HistoryMessages messages={messages} />
      <GuessInput roomId={roomId} />
    </div>
  );
}

export default ChatBox;
