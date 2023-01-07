import { IPlayer } from "@/models";

import ClockZone from "../ClockZone";
import DiceZone from "../DiceZone";
import OppositeArea from "../OppositeArea";
import OwnArea from "../OwnArea";
import SettingZone from "../SettingZone";
import styles from "./index.module.css";

export default function Deck(props: { own: IPlayer; opposite: IPlayer }) {
  return (
    <div className={styles.Deck}>
      <SettingZone />
      <DiceZone />
      <OwnArea {...props.own} />
      <OppositeArea {...props.opposite} />
      <ClockZone />
    </div>
  );
}
