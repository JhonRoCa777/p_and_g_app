import { Button, Dropdown, Form, Spinner } from "react-bootstrap"
import { CuentaContable, CuentaContableIS } from "@/models";
import {  ChangeEvent, useEffect, useState } from "react";
import { CuentaContableService } from "@/services";
import styles from "./index.module.css";
import { IDropdown } from "..";

interface ICuentaContableDropdown extends Pick<IDropdown<CuentaContable>, 'handleOnChange'> {
  banderaReset: boolean
}

export function CuentaContableDropdown({
  handleOnChange, banderaReset
}: ICuentaContableDropdown) {

  const [toShow] = useState<number>(10);

  const [filterTxt, setFilterTxt] = useState<string>('');

  const [cuentasContableArray, setCuentasContablesArray] = useState<CuentaContable[]>([]);
  const [cuentasContableFilterArray, setCuentasContablesFilterArray] = useState<CuentaContable[]>([]);

  const [resolver, setResolver] = useState<boolean>(true);

  const [dropdownState, setDropdownState] = useState<boolean>(false);
  
  const {index} = CuentaContableService();

  const getCuentasContables = async () => {
    setResolver(true);

    let resp = await index();
    if(!resp) resp = [];
    setCuentasContablesArray(resp);
    setCuentasContablesFilterArray(resp.slice(0, toShow));

    setResolver(false);
  }

  const handleReset = () => {
    setDropdownState(false);
    setFilterTxt('');
    handleOnChange(CuentaContableIS);
  }

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const txt = event.target.value;
    setFilterTxt(txt);

    const nuevos = cuentasContableArray.filter((item) => item.DESCRIPCIO.toLowerCase().includes(txt.toLowerCase()) || item.CODIGOCTA.toLowerCase().includes(txt.toLowerCase()));
    setCuentasContablesFilterArray(nuevos.slice(0, toShow));

    if (txt.length > 0) setDropdownState(true);
    else setDropdownState(false);
  }

  const handleCuentaChange = (cuenta: CuentaContable) => {
    setFilterTxt(cuenta.CODIGOCTA.trim() + ' - ' + cuenta.DESCRIPCIO.trim());
    setDropdownState(false);
    handleOnChange({CODIGOCTA: cuenta.CODIGOCTA.trim(), DESCRIPCIO: cuenta.DESCRIPCIO.trim()});
  }

  useEffect(()=>{
    getCuentasContables();
  }, [])

  useEffect(()=>{
    handleReset();
  }, [banderaReset])

  return (
    <>
      <Dropdown className="d-inline" show={dropdownState}>
      {
        (resolver) ? <div style={{textAlign: 'center'}}> <Spinner variant="secondary"/> </div>
        :
        <Form.Group style={{width: 'calc(200% - 90px)'}}>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <Form.Control value={filterTxt} onChange={handleFilterChange} size="sm" placeholder="Buscar por Código o Nombre"/>
            <Button className="Btn BtnDisabled" size="sm" onClick={()=>handleReset()}> X </Button>
          </div>
        </Form.Group>
      }

        <Dropdown.Menu className={styles.Menu}>
        {
          (cuentasContableFilterArray.length !== 0)
          && 
          cuentasContableFilterArray.map((e, index) => (
            <Dropdown.Item key={index} onClick={() => handleCuentaChange(e)}>
              {e.CODIGOCTA.trim() + ' - ' + e.DESCRIPCIO.trim()}
            </Dropdown.Item>
          ))
        }
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}
