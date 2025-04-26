import { SwalHelper } from "@/helpers";
import { Group } from "@/models";
import { GroupService } from "@/services";
import { ChangeEvent, useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import { FaTrashAlt } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { GroupStore, resetGroupStore, setGroupStore } from "@/redux";
import { IoMdEye } from "react-icons/io";

export function IndexHook() {

  const currentGroup = GroupStore();

  const [filterTxt, setFilterTxt] = useState<string>('');

  const [groupArray, setGroupArray] = useState<Group[]>([]);
  const [groupFilterArray, setGroupFilterArray] = useState<Group[]>([]);

  const {index, create, update, eliminate} = GroupService();

  const dispatcher = useDispatch();
  const [resolver, setResolver] = useState<boolean>(true);

  const getGroups = async () => {
    let resp = await index();
    if(!resp) resp = [];
    setGroupArray(resp);
    setGroupFilterArray(resp);
  }

  const initGroups = async () => {
    setResolver(true);
    dispatcher(resetGroupStore());
    await getGroups();
    setResolver(false);
  }

  useEffect(()=>{
    initGroups();
  }, [])

  const handleReset = () => {
    setFilterTxt('');
    setGroupFilterArray(groupArray);
  }

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterTxt(value);
    const nuevos = groupArray.filter((item) => item.NAME.toLowerCase().includes(value.toLowerCase()));
    setGroupFilterArray(nuevos);
  }

  const handleCreate = async () => {
    if (!filterTxt)
      SwalHelper.warning('Campo Nombre del Grupo Requerido');
    else if (filterTxt.length > 255)
      SwalHelper.warning('Tamaño Nombre del Grupo max 255 caracteres');
    else if (groupArray.some(item => item.NAME.toLowerCase().trim() === filterTxt.toLowerCase().trim()))
      SwalHelper.warning('Nombre del Grupo ya Existente');
    else {
      const result = await SwalHelper.confirm(`Se creará el Grupo <b> ${filterTxt} </b>`, "accept");
      if (result.isConfirmed) {
        setResolver(true);
        const resp = await create({NAME: filterTxt});
        if (resp) {
          await getGroups();
          setFilterTxt('');
          SwalHelper.success(resp);
        }
        setResolver(false);
      }
    }
  }

  const handleUpdate = async (group: Group) => {
    const result = await Swal.fire({
      allowOutsideClick: false,
      title: 'Ingresa nombre del Grupo',
      input: 'text',
      inputValue: group.NAME,
      inputAttributes: {
        autocomplete: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Editar',
      confirmButtonColor: 'var(--warning-color)',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) return 'Campo Nombre del Grupo Requerido';
        if (value.length > 255) return 'Tamaño Nombre del Grupo max 255 caracteres';
        if (groupArray.some(item => (item.id !== group.id && item.NAME.toLowerCase().trim() === value.toLowerCase().trim())))
          return 'Nombre del Grupo ya Existente';
      }
    });

    if (result.isConfirmed) {
      setResolver(true);
      const updatedGroup = {...group, NAME: result.value};
      const resp = await update(updatedGroup);
      if (resp) {
        await getGroups();
        if (currentGroup.id === group.id) dispatcher(setGroupStore(updatedGroup));
        SwalHelper.success(resp);
      }
      setResolver(false);
    }
  }

  const handleDelete = async (group: Group) => {
    const result = await SwalHelper.confirm(`Se eliminará el Grupo <b> ${group.NAME} </b>`, "delete");
    if (result.isConfirmed) {
      setResolver(true);
      const resp = await eliminate(group.id);
      if (resp) {
        await getGroups();
        if (currentGroup.id === group.id) dispatcher(resetGroupStore());
        SwalHelper.success(resp);
      }
      setResolver(false);
    }
  }

  const columns: TableColumn<Group>[] = [
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
        <Button style={{padding: '5px'}} size="sm" className="Btn BtnPrimary" onClick={()=>dispatcher(setGroupStore(row))}>
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
    dataTable: {columns, data: groupFilterArray, progressPending: resolver},
    handleFilterChange,
    handleCreate,
    filterTxt,
    handleReset
  }
}
