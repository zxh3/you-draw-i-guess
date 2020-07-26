import { atom } from "recoil";

const defaultPlayerName = localStorage.getItem("playerName") ?? "";

export const playerNameState = atom({
  key: "playerNameState",
  default: defaultPlayerName,
});

export const roomIdsState = atom({
  key: "roomIdsState",
  default: [],
});
