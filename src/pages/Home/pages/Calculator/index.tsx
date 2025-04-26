import { Button, Col, Row, Toast } from "react-bootstrap";
import { CardElement, TableCalculation, TableCalculationForm } from "@/components";
import { IndexHook } from "./index.hook";
import styles from "./index.module.css";
import {
  CalculationArrayStore,
  CalculationFormArrayStore,
  PublicationFormStore,
  PublicationGroupFormStore,
  PublicationGroupStore,
  PublicationStore,
  resetRouterLinkStore,
} from "@/redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCalculationArrayStore, resetPublicationGroupStore, resetPublicationStore } from "@/redux";

export default function CalculatorPage() {

  const currentPublication = PublicationStore();
  const currentPublicationGroup = PublicationGroupStore();
  const currentCalculationArray = CalculationArrayStore();

  const currentPublicationForm = PublicationFormStore();
  const currentPublicationGroupForm = PublicationGroupFormStore();
  const currentCalculationFormArray = CalculationFormArrayStore();

  const dispatcher = useDispatch();

  const afterDeletePublicationGroup = () => {
    dispatcher(resetPublicationStore());
    dispatcher(resetPublicationGroupStore());
    dispatcher(resetCalculationArrayStore());
  }

  useEffect(()=>{
    handleReset();
    dispatcher(resetRouterLinkStore());
  }, []);

  const {
    handleReset,
    handleReCalculate
  } = IndexHook({publication: currentPublication, publicationGroup: currentPublicationGroup});

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Toast className="mt-3" show={(currentPublicationGroup.GROUP.length === 0 && currentPublicationGroupForm.GROUP.length === 0)} animation={false}>
          <Toast.Body>
            <strong className='me-auto' > INSTRUCCIONES </strong>
            <br /> <br />
            Seleccione <b> el mes inicial, el mes final, el año y el grupo </b> para realizar el cálculo de <b>P&G.</b>
            <br /> <br />
            Si ya se ha realizado una publicación previamente, esta se mostrará en la <b> parte derecha del navegador </b> (o en la parte inferior en dispositivos móviles).
            <br /> <br />
            De lo contrario, la opción para realizar la publicación aparecerá en la <b> parte izquierda </b> (o en la parte superior en dispositivos móviles).
          </Toast.Body>
        </Toast>
      </div>
      <Row className={styles.TableContainer}>
        <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
        {(currentPublicationGroup.GROUP.length > 0 && currentPublicationGroupForm.GROUP.length === 0) &&
          <CardElement className="pb-3">
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              <h6 className='pt-3'> <b> Ya Se Encuentra Realizada Una Publicación </b> </h6>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center'}}>
                <h6 className='pt-3'> <b> ¿Deseas Volver a Calcular? </b> </h6>
                <Button size="sm" className="Btn BtnWarning" onClick={handleReCalculate}> ACEPTAR </Button>
                <Button size="sm" className="Btn BtnDisabled" onClick={handleReset}> CANCELAR </Button>
              </div>
            </div>
          </CardElement>
        }
        {(currentPublicationGroupForm.GROUP.length > 0) &&
          <CardElement className="pt-3">
            <div style={{overflow: 'auto'}}>
              <TableCalculationForm
                publicationForm={currentPublicationForm}
                publicationGroupForm={currentPublicationGroupForm}
                calculationFormArray={currentCalculationFormArray}
              />
            </div>
          </CardElement>
        }
        </Col>

        <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
        {(currentPublicationGroup.GROUP.length > 0) &&
          <CardElement className="pt-3">
            <TableCalculation
              publication={currentPublication}
              publicationGroup={currentPublicationGroup}
              calculationArray={currentCalculationArray}
              afterDeletePublicationGroup={afterDeletePublicationGroup}
            />
          </CardElement>
        }
        </Col>
      </Row>
    </>
  )
}
