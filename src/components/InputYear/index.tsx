import { DateHelper } from "@/helpers";
import { Form } from "react-bootstrap";
import styles from "./index.module.css";
import { ChangeEvent } from "react";

export interface IInput<T> {
  value: T,
  handleOnChange: (item: number) => void,
  disabled?: boolean
}

export function InputYear({
 value,
 handleOnChange,
 disabled = false
}: IInput<number>) {
  return (
    <Form.Control disabled={disabled} className={styles.InputYear} type="number" min="2000" max={DateHelper.currentYear()}
      value={value} onChange={(event: ChangeEvent<HTMLInputElement>)=>handleOnChange(Number(event.target.value))}/>
  )
}
