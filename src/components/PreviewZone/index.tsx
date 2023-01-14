import styles from "./index.module.css";

export default function PreviewZone() {
  return (
    <div className={styles.PreviewZone}>
      <PreviewCard />
    </div>
  );
}

export const PreviewCard = () => {
  return <div>111</div>;
};
