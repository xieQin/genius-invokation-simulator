import { useAutoScale } from "@/hooks";
import { IPlayer } from "@/models";

import ClockZone from "../ClockZone";
import DiceZone from "../DiceZone";
import OppositeArea from "../OppositeArea";
import OwnArea from "../OwnArea";
import styles from "./index.module.css";

export default function Deck(props: {
  own: IPlayer;
  opposite: IPlayer;
  status: string;
}) {
  useAutoScale();
  const shouldHide = props.status === "hide";
  return (
    <div className={styles.Deck}>
      {!shouldHide && (
        <>
          <DiceZone />
          <OwnArea {...props.own} />
          <OppositeArea {...props.opposite} />
          <ClockZone />
        </>
      )}
    </div>
  );
}
