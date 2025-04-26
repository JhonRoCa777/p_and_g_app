import { Subgroup, SubgroupIS } from "@/models";
import { IndexHook } from "./index.hook";
import { CardElement, CuentaContableDropdown } from "@/components";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import styles from "./index.module.css";
import { FiPlusCircle } from "react-icons/fi";
import DataTable from "react-data-table-component";

export interface IAccountIndex {
  subgroup: Subgroup
}

export function AccountIndex() {

  const {
    currentSubgroup,
    dataTable,
    handleFilterChange,
    setCuenta,
    handleCuentaBind,
    filterTxt,
    handleReset,
    banderaReset
  } = IndexHook();

  const paginationComponentOptions = {
    noRowsPerPage: true,
    rangeSeparatorText: 'de'
  };

  return (
    <>
      <CardElement className='pt-3 pl-3 pr-3'>
        <Row>
          <Col>
            <h4 className={`${styles.Title} mb-1`}> SUBGRUPO </h4>
            <h5 className={`${styles.Title} mb-2`}> {currentSubgroup.NAME} </h5>
            <hr/>
          </Col>
        </Row>
        {
          (currentSubgroup.id !== SubgroupIS.id) &&
          (<>
            <Row className="mb-3">
              <Col>
                <h4 className={styles.Title}> CUENTAS CONTABLES </h4>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <CuentaContableDropdown handleOnChange={setCuenta} banderaReset={banderaReset}/>
              </Col>

              <Col style={{display: 'flex', justifyContent: 'end'}}>
                <Button className="Btn BtnTertiary"  onClick={handleCuentaBind} size="sm">
                  VINCULAR <FiPlusCircle/>
                </Button>
              </Col>
            </Row>
            <hr/>
          {<>
            <Row className="mb-1">
              <Col>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <Form.Control value={filterTxt} placeholder="Nombre de la Cuenta" size="sm"
                    onChange={handleFilterChange}/>

                  <Button className="Btn BtnDisabled" size="sm" onClick={handleReset}>
                    X
                  </Button>
                </div>
              </Col>
            </Row>

            <Row>
              <DataTable {...dataTable}
                fixedHeader
                noDataComponent={<h6 className={`${styles.Title} mb-3`}> Sin Resultados </h6>}
                progressComponent={
                  <div className={styles.SpinnerContainer}> <Spinner variant='secondary'/> </div>
                }
                pagination
                paginationPerPage={5}
                paginationComponentOptions={paginationComponentOptions}
                defaultSortFieldId={1}
                defaultSortAsc={false}
                highlightOnHover
              />
            </Row>
          </>}
          </>)
        }
      </CardElement>
    </>
  )
}
