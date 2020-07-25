import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import styles from "./Home.module.css";
import socket from "../socket";
import { useRecoilState } from "recoil";
import { playerState } from "../states/states";

function Home() {
  const history = useHistory();
  const [player, setPlayer] = useRecoilState(playerState);

  return (
    <div className={styles.root}>
      <Form
        onSubmit={() => {
          socket.emit("join-room", player);
          console.log(socket.id);
          console.log(player);
          history.push(`/room/${player.roomId}`);
        }}
      >
        <Form.Field>
          <label>Your Name</label>
          <input
            placeholder="Enter your name here"
            value={player.playerName}
            onChange={(event) =>
              setPlayer({ ...player, playerName: event.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Room ID</label>
          <input
            placeholder="Enter room id here"
            value={player.roomId}
            onChange={(event) =>
              setPlayer({ ...player, roomId: event.target.value })
            }
          />
        </Form.Field>
        <Button
          type="submit"
          disabled={
            player.roomId.length === 0 || player.playerName.length === 0
          }
        >
          Enter Room
        </Button>
      </Form>
    </div>
  );
}

export default Home;
