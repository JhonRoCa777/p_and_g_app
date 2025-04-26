import { Publication, PublicationForm } from "@/models";
import styles from "./index.module.css";
import { MonthService } from "@/services";
import { PropsWithChildren } from "react";

export interface ITHead {
  publication: Publication | PublicationForm
}

export function THead({
  publication, children
}: PropsWithChildren<ITHead>) {
  return (
    <thead className="sticky">
      <tr className={styles.CenterTextCol}>
        <th rowSpan={2} style={{backgroundColor: 'lightgray'}}>
          CONCEPTO
        </th>
        <th colSpan={2} style={{backgroundColor: 'lightgray'}}>
          { (publication.YEAR - 1) }
        </th>
        <th colSpan={2} style={{backgroundColor: 'lightgray'}}>
          { publication.YEAR }
        </th>
        <th colSpan={2} style={{backgroundColor: 'lightgray'}}>
          Variación Vs {(publication.YEAR - 1)}
        </th>
        <th rowSpan={2} style={{backgroundColor: 'lightgray'}}>
          COMENTARIO
        </th>
      </tr>
      <tr className={styles.CenterTextCol}>
        <th colSpan={2} style={{backgroundColor: 'lightgray'}}>
          { MonthService.getMonthView(publication.INITIAL_MONTH, publication.FINAL_MONTH) }
        </th>
        <th colSpan={2} style={{backgroundColor: 'lightgray'}}>
          { MonthService.getMonthView(publication.INITIAL_MONTH, publication.FINAL_MONTH) }
        </th>
        <th style={{backgroundColor: 'lightgray'}}>
          Var. $
        </th>
        <th style={{backgroundColor: 'lightgray'}}>
          Var. %
        </th>
      </tr>
      {
        children
      }
    </thead>
  )
}
