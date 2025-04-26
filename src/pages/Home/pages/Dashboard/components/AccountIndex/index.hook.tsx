import { ChangeEvent, useEffect, useState } from "react";
import { Account, CuentaContable, CuentaContableIS, SubgroupIS } from "@/models";
import { AccountService } from "@/services/Account";
import { SwalHelper } from "@/helpers";
import { TableColumn } from "react-data-table-component";
import { Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { SubgroupStore } from "@/redux";

export function IndexHook() {

  const currentSubgroup = SubgroupStore();

  const [filterTxt, setFilterTxt] = useState<string>('');

  const [cuenta, setCuenta] = useState<CuentaContable>(CuentaContableIS);

  const [accountArray, setAccountArray] = useState<Account[]>([]);
  const [accountFilterArray, setAccountFilterArray] = useState<Account[]>([]);

  const {indexBySubgroup, create, eliminate} = AccountService();

  const [resolver, setResolver] = useState<boolean>(true);

  const [banderaReset, setBanderaReset] = useState<boolean>(false);

  const getAccounts = async () => {
    let resp = await indexBySubgroup(currentSubgroup.id);
    if(!resp) resp = [];
    setAccountArray(resp);
    setAccountFilterArray(resp);
  }

  const initAccounts = async () => {
    setResolver(true);
    if (currentSubgroup.id !== SubgroupIS.id) await getAccounts();
    setResolver(false);
  }

  useEffect(()=>{
    initAccounts();
  }, [currentSubgroup])

  const handleReset = () => {
    setFilterTxt('');
    setAccountFilterArray(accountArray);
  }

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterTxt(value);
    const nuevos = accountArray.filter((item) => item.DESCRIPCIO.toLowerCase().includes(value.toLowerCase()) || item.CODIGOCTA.toLowerCase().includes(value.toLowerCase()));
    setAccountFilterArray(nuevos);
  }

  const handleCuentaBind = async () => {

    if(cuenta.CODIGOCTA === CuentaContableIS.CODIGOCTA)
      SwalHelper.warning(`Cuenta Contable NO Seleccionada`);

    else if(accountArray.filter((item) => item.CODIGOCTA.toLowerCase() === cuenta.CODIGOCTA.toLowerCase() ).length > 0)
      SwalHelper.warning(`La Cuenta ya se encuentra Vinculada`);

    else {
      const result = await SwalHelper.confirm(`¿Estás seguro de Vincular la Cuenta Contable <b> ${cuenta.CODIGOCTA} - ${cuenta.DESCRIPCIO} </b> ?`, "accept");

      if (result.isConfirmed) {
        setResolver(true);
        const resp = await create({...cuenta, SUBGROUP: currentSubgroup.id});
        if (resp) {
          await getAccounts();
          setFilterTxt('');
          setBanderaReset((current)=>!current);
          SwalHelper.success(resp);
        }
        setResolver(false);
      }
    }
  }

  const handleDelete = async (account: Account) => {
    const result = await SwalHelper.confirm(`Se Desvinculará la Cuenta Contable <b> ${account.CODIGOCTA} </b>`, "delete");
    if (result.isConfirmed) {
      setResolver(true);
      const resp = await eliminate(account.id);
      if (resp) {
        await getAccounts();
        SwalHelper.success(resp);
      }
      setResolver(false);
    }
  }

  const columns: TableColumn<Account>[] = [
    {
      name: '#',
      selector: row => row.id,
      sortable: false,
      omit: true
    },
    {
      name: 'Código',
      selector: row => row.CODIGOCTA,
      sortable: true,
      width: '6rem',
      wrap: true
    },
    {
      name: 'Nombre',
      selector: row => row.DESCRIPCIO,
      sortable: true,
      width: 'calc(100% - 11.5rem)',
      wrap: true
    },
    {
      name: '',
      cell: row =>
      (<div style={{display: 'flex', gap: '5px'}}>
        <Button style={{padding: '5px'}} size="sm" className="Btn BtnDanger" onClick={()=>handleDelete(row)}>
          <FaTrashAlt/>
        </Button>
      </div>)
    }
  ];
  
  return {
    currentSubgroup,
    dataTable: {columns, data: accountFilterArray, progressPending: resolver},
    handleFilterChange,
    setCuenta,
    handleCuentaBind,
    filterTxt,
    handleReset,
    banderaReset
  }
}
