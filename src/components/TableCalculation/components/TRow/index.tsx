import { useEffect, useState } from "react";
import { PercentConvert } from "../PercentConvert";
import { PesosConvert } from "../PesosConvert";
import styles from "./index.module.css";
import { Calculation, CalculationForm, Publication, PublicationForm, PublicationGroup, PublicationGroupForm } from "@/models";

interface ITRow {
  publication: Publication | PublicationForm,
  publicationGroup: PublicationGroup | PublicationGroupForm,
  calculationArray: Calculation[] | CalculationForm[],
  isForm?: boolean
}

export function TRow({
  publication, publicationGroup, calculationArray, isForm=false
}: ITRow) {

  const [prev, setPrev] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);
  const [subtraction, setSubtraction] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);

  useEffect(()=>{
    const currentPrev = Number(calculationArray.reduce((acc, curr) => acc + Number(curr.PREVIOUS_NETO), 0));
    setPrev(currentPrev);
    const currentCurrent = Number(calculationArray.reduce((acc, curr) => acc + Number(curr.CURRENT_NETO), 0));
    setCurrent(currentCurrent);
    const currentSubtraction = Number((currentCurrent - currentPrev));
    setSubtraction(currentSubtraction);
    setPercent((currentPrev !== 0) ? Math.round(currentSubtraction / currentPrev * 100) : 0);
  }, [publication, publicationGroup]);

  return (
    <tr style={{borderColor: 'black'}}>
      <th style={{backgroundColor: 'lightgray'}}>{ publicationGroup.GROUP }</th>
      <th colSpan={2} style={{backgroundColor: 'lightgray'}}>
        <div className={styles.PesosCol}>
          <PesosConvert value={prev} isForm={isForm}/>
        </div>
      </th>
      <th colSpan={2} style={{backgroundColor: 'lightgray'}}>
        <div className={styles.PesosCol}>
          <PesosConvert value={current} isForm={isForm}/>
        </div>
      </th>
      <th style={{backgroundColor: 'lightgray'}}>
        <div className={styles.PesosCol}>
          <PesosConvert value={subtraction} isForm={isForm}/>
        </div>
      </th>
      <th style={{backgroundColor: 'lightgray'}}>
        <PercentConvert value={percent}/>
      </th>
      <th style={{backgroundColor: 'lightgray'}}></th>
    </tr>
  )
}
