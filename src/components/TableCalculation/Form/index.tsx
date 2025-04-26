import { Button } from "react-bootstrap";
import styles from "./index.module.css";
import { TableFormIndexHook } from "./index.hook";
import { TBody, THead, TRow, TTable } from "../components";
import { CalculationForm, PublicationForm, PublicationGroupForm } from "@/models";

export interface ITableCalculationForm {
  publicationForm: PublicationForm,
  publicationGroupForm: PublicationGroupForm,
  calculationFormArray: CalculationForm[],
}

export function TableCalculationForm({
  publicationForm, publicationGroupForm, calculationFormArray
}: ITableCalculationForm) {

  const {
    handleComment,
    handleDeleteCalculation,
    handlePublish
  } = TableFormIndexHook({publicationForm, publicationGroupForm, calculationFormArray});
  
  return (
    <>
      <div className={`${styles.TitleContainer} mb-3`}>
        <h6 className={styles.Title}> Cifras expresadas en Millones </h6>
        <Button className="Btn BtnTertiary" style={{padding: '0.1rem 0.5rem', margin: '0.1rem 0px'}}
          onClick={handlePublish}>
          PUBLICAR
        </Button>
      </div>
      <TTable>
        <THead publication={publicationForm}>
          <TRow
            isForm
            publication={publicationForm}
            publicationGroup={publicationGroupForm}
            calculationArray={calculationFormArray}
          />
        </THead>
        <TBody
          isForm
          handleComment={handleComment}
          handleDeleteCalculation={handleDeleteCalculation}
          calculationArray={calculationFormArray}
        />
      </TTable>
    </>    
  )
}
