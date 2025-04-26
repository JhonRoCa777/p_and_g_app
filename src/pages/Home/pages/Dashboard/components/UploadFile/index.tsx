
import { Button, Form } from "react-bootstrap";
import styles from './index.module.css';
import { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa6";
import { Group } from "@/models";
import { SwalHelper } from "@/helpers";
import { SubgroupService } from "@/services";

export function UploadFile({
  group, onSuccess
} : {group: Group, onSuccess: Function}) {

  const {uploadByGroup} = SubgroupService();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File|null>();

  useEffect(()=>{

    if (fileInputRef.current) {
      fileInputRef.current.onchange = (event: any) => {
        const archivo = event.target.files && event.target.files[0];
        setFile(archivo);
      }
    }
    
  }, []);

  const handleReset = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const handleLoad = () => {

    if (!file || fileInputRef.current?.value == '') {
      SwalHelper.warning('Por favor seleccionar el archivo que desea cargar');
      return;
    }

    if (fileInputRef.current) {

      const ext = fileInputRef.current.value.split('.').pop() || '';

      if (!['xls', 'xlsx', 'csv'].includes(ext)) {
        SwalHelper.warning('Archivo debe ser de extension [.xls, .xlsx, .csv]');
        return;
      }

      SwalHelper.confirm('Se borrarán todos los archivos y serán reemplazados', "accept").then(async(result) => {

        if (result.isConfirmed) {
          
          const swalInstance: any = SwalHelper.loading();

          const formData = new FormData();
          formData.append('file', file||'');

          const resp = await uploadByGroup(formData, group.id);
          if (resp) {
            SwalHelper.success(resp);
            onSuccess();
          }

          handleReset();
          swalInstance.close();
        }
      });
    }
  }

  return (
    <div className={styles.Container}>
      <Form.Group controlId="formFile">
        <Form.Control type="file" accept=".xls, .xlsx, .csv" ref={fileInputRef} size="sm"/>
      </Form.Group>
      <div style={{display: 'flex', gap: '0.5rem'}}>
        <Button className="Btn BtnDisabled" size="sm" onClick={handleReset}>
          X
        </Button>
        <Button className="Btn BtnPrimary" onClick={handleLoad} size="sm">
          SUBIR <FaUpload/>
        </Button>
      </div>
    </div>
  )
}
