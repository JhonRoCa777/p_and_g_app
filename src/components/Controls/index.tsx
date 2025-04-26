import { Button } from "react-bootstrap";
import { GroupDropdown } from "../Dropdown/Group";
import { MonthDropdown } from "../Dropdown/Months";
import { InputYear } from "../InputYear";
import styles from "./index.module.css";
import { ROUTER } from "@/router";
import { IndexHook } from "./index.hook";
import { ROLES, User } from "@/models";
import { UserStore } from "@/redux";

export function Controls() {

  const user: User = UserStore();

  const {
    routerLink,
    year, setYear,
    initialMonth, setInitialMonth,
    finalMonth, setFinalMonth,
    group, setGroup,
    handleSearch,
    handleCalculate
  } = IndexHook();

  return (
    <>
      <div className={styles.FormContainer}>
        {(routerLink === ROUTER.HOME.CALCULATOR  && user.role === ROLES.ADMIN) &&
          <MonthDropdown value={initialMonth} handleOnChange={setInitialMonth}/>
        }
        {(routerLink === ROUTER.HOME.MAIN || routerLink === ROUTER.HOME.CALCULATOR) &&
          <>
            <MonthDropdown value={finalMonth} handleOnChange={setFinalMonth}/>
            <InputYear value={year} handleOnChange={setYear}/>
          </>
        }
        {(routerLink === ROUTER.HOME.CALCULATOR  && user.role === ROLES.ADMIN) &&
          <GroupDropdown value={group} handleOnChange={setGroup}/>
        }
        {(routerLink === ROUTER.HOME.CALCULATOR && user.role === ROLES.ADMIN) &&
          <Button className="Btn BtnWarning" size="sm" onClick={handleCalculate}> CALCULAR </Button>
        }
        {(routerLink === ROUTER.HOME.MAIN) &&
          <Button className="Btn BtnWarning" onClick={handleSearch}> BUSCAR </Button>
        }
      </div>
    </>
  )
}
