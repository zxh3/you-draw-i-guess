import { atom } from "recoil";

export const playerState = atom({
  key: "playerState",
  default: { playerName: "", roomId: "" },
});

// roomState should be updated by server only
export const roomState = atom({
  key: "roomState",
  default: {},
});
