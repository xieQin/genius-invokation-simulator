import ClockZone from "../ClockZone";
import DiceZone from "../DiceZone";
import OppositeArea from "../OppositeArea";
import OwnArea from "../OwnArea";
import SettingZone from "../SettingZone";
import styles from "./index.module.css";

export default function Deck() {
  return (
    <div className={styles.Deck}>
      <SettingZone />
      <DiceZone />
      <OwnArea />
      <OppositeArea />
      <ClockZone />
    </div>
  );
}
