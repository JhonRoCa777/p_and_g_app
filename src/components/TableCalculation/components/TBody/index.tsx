import { Button } from "react-bootstrap";
import { PercentConvert } from "../PercentConvert";
import { PesosConvert } from "../PesosConvert";
import styles from "./index.module.css";
import { IoEye } from "react-icons/io5";
import { Calculation, CalculationForm, ROLES, User } from "@/models";
import { FaTrashAlt } from "react-icons/fa";
import { UserStore } from "@/redux";

interface ITBody {
  handleComment: Function,
  handleDeleteCalculation: Function,
  calculationArray: Calculation[] | CalculationForm[],
  isForm?: boolean
}

export function TBody({
  handleComment,
  handleDeleteCalculation,
  calculationArray,
  isForm=false
}: ITBody) {

  const user: User = UserStore();

  return (
    <tbody>
      {calculationArray.map((e, index) => (
        <tr style={{borderColor: 'black'}} key={index}>
          <th>
            {e.NAME}
          </th>
          <th colSpan={2}>
            <div className={styles.PesosCol}>
              <PesosConvert value={Number(e.PREVIOUS_NETO)} isForm={isForm}/>
            </div>
          </th>
          <th colSpan={2}>
            <div className={styles.PesosCol}>
              <PesosConvert value={Number(e.CURRENT_NETO)} isForm={isForm}/>
            </div>
          </th>
          <th>
            <div className={styles.PesosCol}>
              <PesosConvert value={Number(e.VAR_PESOS)} isForm={isForm}/>
            </div>
          </th>
          <th>
            <PercentConvert value={e.VAR_PERCENT}/>
          </th>
          <th className={styles.CenterItemCol}>
          {
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <Button style={{padding: '0.1rem 0.5rem', margin: '0.1rem 0px'}}
                className={`Btn ${(e.COMMENT) ? 'BtnWarning' : 'BtnDisabled'}`} onClick={()=>handleComment(e)}>
                <IoEye/>
              </Button>
              {(user.role === ROLES.ADMIN) &&
                <Button style={{padding: '0.1rem 0.5rem', margin: '0.1rem 0px'}}
                  className={`Btn BtnDanger`} onClick={()=>handleDeleteCalculation(e)}>
                  <FaTrashAlt/>
                </Button>
              }
            </div>
          }
          </th>
        </tr>
        ))
      }
    </tbody>
  )
}
