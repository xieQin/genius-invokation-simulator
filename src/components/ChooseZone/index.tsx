import { PUBLIC_PATH } from "@/configs";

import styles from "./index.module.css";

export const ChooseBtn = (props: {
  onClick: () => void;
  element?: React.ReactNode;
}) => {
  return (
    <div className={styles.ChooseBtn}>
      <div
        className={styles.SetActiveCharacter}
        aria-hidden="true"
        onClick={() => {
          props.onClick();
        }}
      >
        <img src={`${PUBLIC_PATH}/images/choose-character-icon.png`} alt="" />
      </div>
      {props.element}
    </div>
  );
};

export const AlertActiveCharacter = () => {
  return (
    <div className={styles.AlertActiveCharacter}>
      <span>Select your first character</span>
    </div>
  );
};

export const SetActiveCharacterHint = () => {
  return (
    <div className={styles.SetActiveCharacterHint}>
      <span>Set Active Character</span>
    </div>
  );
};

export const ChooseZoneLayer = (props: { children: React.ReactNode }) => {
  return <div className={styles.ChooseZone}>{props.children}</div>;
};

export default function ChooseZone(props: {
  onClick: () => void;
  element?: React.ReactNode;
}) {
  const { element, onClick } = props;

  return (
    <div className={styles.ChooseZone}>
      {element}
      <ChooseBtn onClick={onClick} />
    </div>
  );
}
