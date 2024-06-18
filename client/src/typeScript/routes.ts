import { BiHomeAlt2 } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { PiChatCircleBold } from "react-icons/pi";
import { IoPricetagsOutline } from "react-icons/io5";

export const routes = [
  {
    title: "Scoreboard",
    to: "/Leaderboard",
    Icon: BiHomeAlt2,
  },
  {
    title: "Rules",
    to: "#rules",
    Icon: FiSearch,
  },
  {
    title: "Account",
    to: "/Account",
    Icon: IoPricetagsOutline,
  },
  {
    title: "Play",
    to: "/Quiz",
    Icon: PiChatCircleBold,
  },
];
