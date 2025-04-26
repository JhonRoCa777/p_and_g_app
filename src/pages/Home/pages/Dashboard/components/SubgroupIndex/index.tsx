import { GroupIS } from "@/models"
import styles from "./index.module.css";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { FiPlusCircle } from "react-icons/fi";
import { CardElement } from "@/components";
import { IndexHook } from "./index.hook";
import DataTable from "react-data-table-component";
import { UploadFile } from "../UploadFile";

export function SubgroupIndex() {

  const {
    currentGroup,
    dataTable,
    handleFilterChange,
    handleCreate,
    filterTxt,
    handleReset,
    handleOnUpload
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
            <h4 className={`${styles.Title} mb-1`}> GRUPO SELECCIONADO </h4>
            <h5 className={`${styles.Title} mb-2`}> {currentGroup.NAME} </h5>
            {
              (currentGroup.id !== GroupIS.id) && <UploadFile group={currentGroup} onSuccess={handleOnUpload}/>
            }
            <hr/>
          </Col>
        </Row>
        {
          (currentGroup.id !== GroupIS.id) &&
          (<>
            <Row className="mb-3">
              <Col>
                <h4 className={styles.Title}> SUBGRUPOS </h4>
              </Col>
            </Row>
          {<>
            <Row>
              <Col>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <Form.Control value={filterTxt} placeholder="Nombre del Subgrupo" size="sm"
                    onChange={handleFilterChange}/>
                  <Button className="Btn BtnDisabled" size="sm" onClick={handleReset}>
                    X
                  </Button>
                  <Button className="Btn BtnTertiary" size="sm" onClick={handleCreate}>
                    CREAR <FiPlusCircle/>
                  </Button>
                </div>
              </Col>
            </Row>

            <hr/>

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
