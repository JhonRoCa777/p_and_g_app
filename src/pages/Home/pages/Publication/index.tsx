import { Col, Row } from "react-bootstrap";
import { CalculationList, MainList } from "./components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  resetCalculationArrayStore,
  resetPublicationGroupStore,
  resetPublicationStore,
  resetPublicationWithPublicationGroupsArrayStore,
  resetRouterLinkStore
} from "@/redux";

export default function Publication() {

  const dispatcher = useDispatch();

  useEffect(()=>{
    dispatcher(resetPublicationWithPublicationGroupsArrayStore());
    dispatcher(resetPublicationStore());
    dispatcher(resetPublicationGroupStore());
    dispatcher(resetCalculationArrayStore());

    dispatcher(resetRouterLinkStore());
  }, [])

  return (
    <>
      <h3 className='pt-3' style={{textAlign: 'center', fontFamily: 'Insanibu'}}> PUBLICACIONES PYG </h3>

      <Row style={{display: 'flex', justifyContent: 'center'}}>
        <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <MainList/>
        </Col>
      </Row>
      <Row style={{display: 'flex', justifyContent: 'center'}}>
        <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <CalculationList/>
        </Col>
      </Row>
    </>
  )
}
