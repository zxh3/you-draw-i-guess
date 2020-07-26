import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playerNameState } from "../states/states";
import RoomList from "./RoomList";
import socket from "../socket";
import styles from "./Home.module.css";

function Home() {
  const history = useHistory();

  const [playerName, setPlayerName] = useRecoilState(playerNameState);
  const [roomId, setRoomId] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Form
          onSubmit={() => {
            history.push(`/room/${roomId}`);
          }}
        >
          <Form.Field>
            <label>Your Name</label>
            <input
              placeholder="Enter your name here"
              value={playerName}
              onChange={(event) => {
                setPlayerName(event.target.value);
                localStorage.setItem("playerName", event.target.value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Room ID</label>
            <input
              placeholder="Enter room id here"
              value={roomId}
              onChange={(event) => setRoomId(event.target.value)}
            />
          </Form.Field>
          <Button
            type="submit"
            disabled={roomId.length === 0 || playerName.length === 0}
          >
            Enter Room
          </Button>
        </Form>
      </div>
      <RoomList />
    </div>
  );
}

export default Home;
