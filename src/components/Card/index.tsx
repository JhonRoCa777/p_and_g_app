import { PropsWithChildren } from "react";
import styles from "./index.module.css";

interface ICardElement {
  className?: string
}

export function CardElement({
  children, className
}: PropsWithChildren<ICardElement>) {
  return (
    <div className={`${styles.CardElement} ${className} mt-3`}>
      {children}
    </div>
  )
}
