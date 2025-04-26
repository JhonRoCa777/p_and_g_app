import { Dropdown } from "react-bootstrap"
import { IDropdown } from "..";
import { useEffect, useState } from "react";
import { ROUTER } from "@/router";

export function RouterLinkDropdown({
  value, handleOnChange
}: IDropdown<string>) {

  const [links, setLinks] = useState<string[]>([]);

  useEffect(()=>{
    setLinks(Object.values(ROUTER.HOME));
  }, [])

  return (
    <Dropdown>
      <Dropdown.Toggle className="BtnWarning">
        { value }
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {
      links.map((e, index) => (
        <Dropdown.Item key={index} onClick={()=>handleOnChange(e)}>
          {e}
        </Dropdown.Item>
      ))
      }
      </Dropdown.Menu>
    </Dropdown>
  )
}
