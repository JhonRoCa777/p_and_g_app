import { CardElement, YearView } from "@/components";
import { Accordion, Button, Table } from "react-bootstrap";
import { MonthService, PublicationGroupService } from "@/services";
import {
  PublicationWithPublicationGroupsArrayStore,
  setCalculationArrayStore,
  setPublicationGroupStore,
  setPublicationStore
} from "@/redux";
import { Publication, PublicationGroup, PublicationWithPublicationGroups } from "@/models";
import { SwalHelper } from "@/helpers";
import { useDispatch } from "react-redux";
import * as XLSX from 'xlsx';
import { SiMicrosoftexcel } from "react-icons/si";

export function MainList() {

  const dispatcher = useDispatch();

  const publicationArray = PublicationWithPublicationGroupsArrayStore();

  const handleToExcel = async (publication: PublicationWithPublicationGroups) => {

    const swalInstance: any = SwalHelper.loading();

    const publicationGroupArray = publication.publication_groups;

    const wb = XLSX.utils.book_new();

    for (let index = 0; index < publicationGroupArray.length; index++) {
      const publicationGroup = publicationGroupArray[index];

      const calculationArray = await PublicationGroupService.calculations(publicationGroup.id);
      if (calculationArray) {
        let dataExcel: {
          NAME: any, PREVIOUS_NETO: any, CURRENT_NETO: any, 
          VAR_PESOS: any, VAR_PERCENT: any, COMMENT: any
        }[]
        = calculationArray.map(item => {
          return {
            NAME: item.NAME, PREVIOUS_NETO: item.PREVIOUS_NETO, CURRENT_NETO: item.CURRENT_NETO,
            VAR_PESOS: item.VAR_PESOS, VAR_PERCENT: item.VAR_PERCENT, COMMENT: item.COMMENT
          }
        });

        const currentPrev = Number(calculationArray.reduce((acc, curr) => acc + Number(curr.PREVIOUS_NETO), 0).toFixed(3));
        const currentCurrent = Number(calculationArray.reduce((acc, curr) => acc + Number(curr.CURRENT_NETO), 0).toFixed(3));
        const currentSubtraction = Number((currentCurrent - currentPrev).toFixed(3));

        dataExcel.unshift({
          NAME: publicationGroup.GROUP,
          PREVIOUS_NETO: currentPrev, CURRENT_NETO: currentCurrent,
          VAR_PESOS: currentSubtraction,
          VAR_PERCENT: ((currentPrev !== 0) ? Math.round(currentSubtraction / currentPrev * 100) : 0),
          COMMENT: ''
        });

        const MonthView = MonthService.getMonthView(publication.INITIAL_MONTH, publication.FINAL_MONTH);

        dataExcel.unshift({
          NAME: '',
          PREVIOUS_NETO: MonthView, CURRENT_NETO: MonthView,
          VAR_PESOS: 'Var. $', VAR_PERCENT: 'Var. %', COMMENT: ''
        });
    
        dataExcel.unshift({
          NAME: 'CONCEPTO',
          PREVIOUS_NETO: publication.YEAR - 1, CURRENT_NETO: publication.YEAR,
          VAR_PESOS: `Variación Vs ${publication.YEAR - 1}`, VAR_PERCENT: '',
          COMMENT: 'COMENTARIO'
        });

        const ws = XLSX.utils.json_to_sheet(dataExcel, {skipHeader: true});

        ws['!cols'] = [
          { wch: 30 }, // Ancho de la columna A
          { wch: 10 }, // Ancho de la columna B
          { wch: 10 }, // Ancho de la columna C
          { wch: 10 }, // Ancho de la columna D
          { wch: 10 }, // Ancho de la columna E
          { wch: 30 }, // Ancho de la columna F
        ];
    
        ws['!merges'] = [
          XLSX.utils.decode_range("A1:A2"),
          XLSX.utils.decode_range("D1:E1"),
          XLSX.utils.decode_range("F1:F2"),
        ];
    
        
        XLSX.utils.book_append_sheet(wb, ws, publicationGroup.GROUP);
      }
    }

    XLSX.writeFile(wb, `${MonthService.getMonthView(publication.INITIAL_MONTH, publication.FINAL_MONTH)}-${publication.YEAR}.xlsx`);

    swalInstance.close();
  }

  const handleVer = async (parent: Publication, child: PublicationGroup) => {
    const swalInstance: any = SwalHelper.loading();

    const resp = await PublicationGroupService.calculations(child.id);
    if (resp) {
      dispatcher(setCalculationArrayStore(resp));
      dispatcher(setPublicationGroupStore(child));
      dispatcher(setPublicationStore(parent));
    }

    swalInstance.close();
  }

  return (
    <>
    {
      (publicationArray.length > 0) &&
      <CardElement className="pb-3">
        <Accordion defaultActiveKey="0">
        {
          publicationArray.map((e, index)=>(
            <Accordion.Item eventKey={index+''} key={e.id} style={{borderColor: 'black'}}>
              <Accordion.Header>
                <b> {`[ ${MonthService.getMonthView(e.INITIAL_MONTH, e.FINAL_MONTH)} ] ${e.YEAR }`} </b>
              </Accordion.Header>
              <Accordion.Body style={{overflow: 'auto'}}>

                <Table striped bordered hover size="sm">
                  <thead>
                    <tr style={{textAlign: 'center'}}>
                      <th style={{verticalAlign: 'middle'}}> GRUPO </th>
                      <th style={{verticalAlign: 'middle'}}> FECHA </th>
                      <th>
                        <Button className='Btn BtnSuceess' style={{margin: '0.5rem 0px 1rem'}}
                          onClick={()=>handleToExcel(e)}>
                          <SiMicrosoftexcel/>
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    e.publication_groups.map((child)=>(
                      <tr key={child.id} style={{textAlign: 'center'}}>
                        <td>{child.GROUP}</td>
                        <td><YearView isoDate={child.created_at}/></td>
                        <td style={{width: '3rem'}}>
                          <Button size="sm" className="Btn BtnTertiary" style={{padding: '0.1rem 0.5rem', margin: '0.1rem 0px'}}
                            onClick={()=>handleVer(e, child)}>
                            VER
                          </Button>
                        </td>
                      </tr>
                    ))
                  }
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          ))
        }
        </Accordion>
      </CardElement>
    }
    </>
  )
}
