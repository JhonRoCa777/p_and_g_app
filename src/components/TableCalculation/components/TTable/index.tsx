import styles from "./index.module.css";
import { PropsWithChildren } from "react";
import { Table } from "react-bootstrap";

export function TTable({children}: PropsWithChildren) {
  return (
    <div className={styles.Container}>
      <Table bordered>
        { children }
      </Table>
    </div>
  )
}
