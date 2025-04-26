import { Dropdown, Spinner } from "react-bootstrap"
import { Group, GroupIS } from "@/models";
import { useEffect, useState } from "react";
import { GroupService } from "@/services";
import { IDropdown } from "..";

export function GroupDropdown({
  value, handleOnChange, disabled
}: IDropdown<Group>) {

  const [resolver, setResolver] = useState<boolean>(true);

  const [groups, setGroups] = useState<Group[]>([]);
  const {index} = GroupService();

  const getGroups = async () => {
    setResolver(true);

    const resp = await index();
    if(resp) setGroups(resp);

    setResolver(false);
  }

  useEffect(()=>{
    getGroups();
  }, [])

  return (
    <>
      <Dropdown>
      {
        (resolver) ? <div style={{textAlign: 'center'}}> <Spinner variant="secondary"/> </div>
        :
        <Dropdown.Toggle variant="secondary" disabled={disabled}>
        {
          (value.id === GroupIS.id)
          ? 'Seleccione Grupo ...'
          : value.NAME
        }
        </Dropdown.Toggle>
      }

        <Dropdown.Menu>
        {
          groups.map((e) => (
            <Dropdown.Item key={e.id} onClick={()=>handleOnChange(e)}>
              {e.NAME}
            </Dropdown.Item>
          ))
        }
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}
