import { Col, Row } from "react-bootstrap";
import { AccountIndex, GroupIndex, SubgroupIndex } from "./components";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { resetRouterLinkStore } from "@/redux";

export default function Dashboard() {

  const dispatcher = useDispatch();

  useEffect(()=>{
    dispatcher(resetRouterLinkStore());
  }, []);

  return (
    <Row>
      <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
        <GroupIndex/>
      </Col>
      <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
        <SubgroupIndex/>
      </Col>
      <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
        <AccountIndex/>
      </Col>
    </Row>
  )
}
