import { Button } from "react-bootstrap";
import styles from "./index.module.css";
import { TableIndexHook } from "./index.hook";
import { Calculation, Publication, PublicationGroup, ROLES } from "@/models";
import { TBody, THead } from "@/components";
import { TRow, TTable } from "../components";

export interface ITableCalculation {
  publication: Publication,
  publicationGroup: PublicationGroup,
  calculationArray: Calculation[],
  afterDeletePublicationGroup: Function
}

export function TableCalculation({
  publication, publicationGroup, calculationArray, afterDeletePublicationGroup
}: ITableCalculation) {

  const {
    user,
    handleComment,
    handleDeleteCalculation,
    handleDeletePublicationGroup
  } = TableIndexHook({publication, publicationGroup, calculationArray, afterDeletePublicationGroup});
  
  return (
    <>
      <div className={`${styles.TitleContainer} mb-3`}>
        <h6 className={styles.Title}> Cifras expresadas en Millones </h6>
        {
          (user.role === ROLES.ADMIN) &&
            <Button className="Btn BtnPrimary" style={{padding: '0.1rem 0.5rem', margin: '0.1rem 0px'}}
              onClick={handleDeletePublicationGroup}>
              ELIMINAR
            </Button>
        }
      </div>

      <div style={{}}>
        <TTable>
          <THead publication={publication}>
            <TRow publication={publication} publicationGroup={publicationGroup} calculationArray={calculationArray}/>
          </THead>
          <TBody
            handleComment={handleComment}
            handleDeleteCalculation={handleDeleteCalculation}
            calculationArray={calculationArray}
          />
        </TTable>
      </div>
    </>    
  )
}
