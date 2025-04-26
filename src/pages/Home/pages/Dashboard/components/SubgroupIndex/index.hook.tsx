import { SwalHelper } from "@/helpers";
import { GroupIS, Subgroup } from "@/models";
import { SubgroupService } from "@/services";
import { ChangeEvent, useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import { FaTrashAlt } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { GroupStore, resetSubgroupStore, setSubgroupStore, SubgroupStore } from "@/redux";
import { IoMdEye } from "react-icons/io";

export function IndexHook() {

  const currentGroup = GroupStore();
  const currentSubgroup = SubgroupStore();

  const [filterTxt, setFilterTxt] = useState<string>('');

  const [subgroupArray, setSubgroupArray] = useState<Subgroup[]>([]);
  const [subgroupFilterArray, setSubgroupFilterArray] = useState<Subgroup[]>([]);

  const {indexByGroup, create, update, eliminate} = SubgroupService();

  const dispatcher = useDispatch();
  const [resolver, setResolver] = useState<boolean>(true);

  const getSubgroups = async () => {
    let resp = await indexByGroup(currentGroup.id);
    if(!resp) resp = [];
    setSubgroupArray(resp);
    setSubgroupFilterArray(resp);
  }

  const initSubgroups = async () => {
    setResolver(true);
    dispatcher(resetSubgroupStore());
    if (currentGroup.id !== GroupIS.id) await getSubgroups();
    setResolver(false);
  }

  useEffect(()=>{
    initSubgroups();
  }, [currentGroup])

  const handleReset = () => {
    setFilterTxt('');
    setSubgroupFilterArray(subgroupArray);
  }

  const handleOnUpload = () => {
    setFilterTxt('');
    initSubgroups();
  }

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterTxt(value);
    const nuevos = subgroupArray.filter((item) => item.NAME.toLowerCase().includes(value.toLowerCase()));
    setSubgroupFilterArray(nuevos);
  }

  const handleCreate = async () => {
    if (!filterTxt)
      SwalHelper.warning('Campo Nombre del Subgrupo Requerido');
    else if (filterTxt.length > 255)
      SwalHelper.warning('Tamaño Nombre del Subgrupo max 255 caracteres');
    else if (subgroupArray.some(item => item.NAME.toLowerCase().trim() === filterTxt.toLowerCase().trim()))
      SwalHelper.warning('Nombre del Subgrupo ya Existente');
    else {
      const result = await SwalHelper.confirm(`Se creará el Subgrupo <b> ${filterTxt} </b>`, "accept");
      if (result.isConfirmed) {
        setResolver(true);
        const resp = await create({NAME: filterTxt, GROUP: currentGroup.id});
        if (resp) {
          await getSubgroups();
          setFilterTxt('');
          SwalHelper.success(resp);
        }
        setResolver(false);
      }
    }
  }

  const handleUpdate = async (subgroup: Subgroup) => {
    const result = await Swal.fire({
      allowOutsideClick: false,
      title: 'Ingresa nombre del subgrupo',
      input: 'text',
      inputValue: subgroup.NAME,
      inputAttributes: {
        autocomplete: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Editar',
      confirmButtonColor: 'var(--warning-color)',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) return 'Campo Nombre del Subgrupo Requerido';
        if (value.length > 255) return 'Tamaño Nombre del Subgrupo max 255 caracteres';
        if (subgroupArray.some(item => (item.id !== currentGroup.id && item.NAME.toLowerCase().trim() === value.toLowerCase().trim())))
          return 'Nombre del Subgrupo ya Existente';
      }
    });

    if (result.isConfirmed) {
      setResolver(true);
      const updatedSubgroup = {...subgroup, NAME: result.value};
      const resp = await update(updatedSubgroup);
      if (resp) {
        await getSubgroups();
        if (currentSubgroup.id === subgroup.id) dispatcher(setSubgroupStore(updatedSubgroup));
        SwalHelper.success(resp);
      }
      setResolver(false);
    }
  }

  const handleDelete = async (subgroup: Subgroup) => {
    const result = await SwalHelper.confirm(`Se Eliminará el subgrupo <b> ${subgroup.NAME} </b>`, "delete");
    if (result.isConfirmed) {
      setResolver(true);
      const resp = await eliminate(subgroup.id);
      if (resp) {
        await getSubgroups();
        if (currentSubgroup.id === subgroup.id) dispatcher(resetSubgroupStore());
        SwalHelper.success(resp);
      }
      setResolver(false);
    }
  }

  const columns: TableColumn<Subgroup>[] = [
    {
      name: '#',
      selector: row => row.id,
      sortable: false,
      omit: true
    },
    {
      name: 'Nombre',
      selector: row => row.NAME,
      sortable: true,
      width: 'calc(100% - 7rem)',
      wrap: true
    },
    {
      name: '',
      cell: row =>
      (<div style={{display: 'flex', gap: '5px'}}>
        <Button style={{padding: '5px'}} size="sm" className="Btn BtnPrimary" onClick={()=>dispatcher(setSubgroupStore(row))}>
          <IoMdEye/>
        </Button>

        <Button style={{padding: '5px'}} size="sm" className="Btn BtnWarning" onClick={()=>handleUpdate(row)}>
          <HiPencil/>
        </Button>

        <Button style={{padding: '5px'}} size="sm" className="Btn BtnDanger" onClick={()=>handleDelete(row)}>
          <FaTrashAlt/>
        </Button>
      </div>)
    }
  ];
  
  return {
    currentGroup,
    dataTable: {columns, data: subgroupFilterArray, progressPending: resolver},
    handleFilterChange,
    handleCreate,
    filterTxt,
    handleReset,
    handleOnUpload
  }
}
