import { cx } from "./cx";
import styles from "../styles/components.module.css";

const SsrTime: React.FC<{ time: string }> = ({ time }) => {
  return (
    <div className={cx(styles.box, styles.ssr)}>
      {time ? <div>Time: {time}</div> : <div>Loading...</div>}
    </div>
  );
};

export default SsrTime;
