import styles from './index.module.css';

export default function UnauthorizedPage() {
  return  (
    <div className={styles.Container}>
      <img className={styles.Image} src='/images/401.png' width={400} height={200}/>
    </div>
  )
}
