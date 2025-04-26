import styles from "./index.module.css";

interface IPercentConvert {
  value: number
}

export function PercentConvert({
  value
}: IPercentConvert) {
  return (
    <div className={styles.Container}>
      { (value < 0) ? <span style={{color: "red"}}>{`${value}%`}</span> : <>{`${value}%`}</> }
    </div>
  )
}
