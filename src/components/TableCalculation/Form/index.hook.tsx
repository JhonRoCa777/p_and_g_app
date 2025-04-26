import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Calculation, CalculationForm, Publication, PublicationGroup } from "@/models";
import { SwalHelper } from "@/helpers";
import { MonthService, PublicationService } from "@/services";
import { ITableCalculationForm } from ".";
import { deleteCalculationFormArrayStore, resetCalculationFormArrayStore, resetPublicationFormStore, resetPublicationGroupFormStore, setCalculationArrayStore, setCalculationFormCommentArrayStore, setPublicationGroupStore, setPublicationStore } from "@/redux";

export const TableFormIndexHook = ({
  publicationForm, publicationGroupForm, calculationFormArray
}: ITableCalculationForm) => {

  const dispatcher = useDispatch();

  const handleComment = async (calculationForm: CalculationForm) => {
    const result = await Swal.fire({
      allowOutsideClick: false,
      title: calculationForm.NAME,
      input: 'textarea',
      inputLabel: 'Ingresa Comentario',
      inputValue: (calculationForm.COMMENT) ? calculationForm.COMMENT : '',
      showCancelButton: true,
      confirmButtonColor: "var(--tertiary-color)",
      cancelButtonColor: "var(--disabled-color)",
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) return 'Comentario Requerido';
        if (value.length > 255) return 'Comentario Máximo de 255 caracteres';
      }
    });

    if (result.isConfirmed) {
      const comment = result.value;
      dispatcher(setCalculationFormCommentArrayStore({calculationForm, comment}));
    }
  }

  const handlePublish = async () => {
    const result = await SwalHelper.confirm(`Se realizará <b style="color: green;"> PUBLICACIÓN </b> de <br> <b> ${publicationGroupForm.GROUP} </b> <br> ${MonthService.getMonthView(publicationForm.INITIAL_MONTH, publicationForm.FINAL_MONTH)} ${publicationForm.YEAR}`, 'accept');
    if (result.isConfirmed) {

      const swalInstance: any = SwalHelper.loading();

      const resp = await PublicationService.publish({
        ...publicationForm,
        ...publicationGroupForm,
        CalculationFormArray: calculationFormArray
      });

      if (resp) {
        dispatcher(resetPublicationFormStore());
        dispatcher(resetPublicationGroupFormStore());
        dispatcher(resetCalculationFormArrayStore());

        dispatcher(setPublicationStore(resp.data.publication as Publication));
        dispatcher(setPublicationGroupStore(resp.data.publicationGroup as PublicationGroup));
        dispatcher(setCalculationArrayStore(resp.data.calculationArray as Calculation[]));
        SwalHelper.success(resp.message);
      }

      swalInstance.close();
    }
  }

  const handleDeleteCalculation = async (calculationForm: CalculationForm) => {
    const result = await SwalHelper.confirm(`Se Eliminará el Grupo <b> ${calculationForm.NAME} </b>`, "delete");
    if (result.isConfirmed) {
      dispatcher(deleteCalculationFormArrayStore(calculationForm));
      SwalHelper.success(`Cálculo ${calculationForm.NAME} Eliminado Correctamente`);
    }
  }

  return {
    publicationForm,
    publicationGroupForm,
    calculationFormArray,
    handleComment,
    handleDeleteCalculation,
    handlePublish
  }
}
