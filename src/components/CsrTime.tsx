import { timeService } from "@/services/timeService";
import { useEffect, useState } from "react";
import { cx } from "./cx";
import styles from "../styles/components.module.css";

const CsrTime: React.FC = () => {
  const [time, setTime] = useState<string | undefined>(undefined);

  useEffect(() => {
    timeService.getTime().then(setTime);
  }, []);

  return (
    <div className={cx(styles.box, styles.csr)}>
      {time ? <div>Time: {time}</div> : <div>Loading...</div>}
    </div>
  );
};

export default CsrTime;
