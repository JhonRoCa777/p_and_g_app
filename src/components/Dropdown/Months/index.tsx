import { Dropdown } from "react-bootstrap"
import { IDropdown } from "..";
import { useEffect, useState } from "react";
import { Month } from "@/models";
import { MonthService } from "@/services";

export function MonthDropdown({
  value, handleOnChange, disabled
}: IDropdown<Month>) {

  const [months, setMonths] = useState<Month[]>([]);

  useEffect(()=>{
    setMonths(MonthService.index());
  },[])

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" disabled={disabled}>
        { value.name.substring(0, 3) }
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {
        months.map((e) => (
          <Dropdown.Item key={e.id} onClick={()=>handleOnChange(e)}>
            {e.name}
          </Dropdown.Item>
        ))
      }
      </Dropdown.Menu>
    </Dropdown>
  )
}
