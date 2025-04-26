import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Calculation, ROLES, User } from "@/models";
import { CalculationService, MonthService, PublicationGroupService } from "@/services";
import { ITableCalculation } from ".";
import { SwalHelper } from "@/helpers";
import { setCalculationArrayStore, setCalculationCommentArrayStore, UserStore } from "@/redux";

export const TableIndexHook = ({
  publication, publicationGroup, afterDeletePublicationGroup
}: ITableCalculation) => {

  const user: User = UserStore();

  const dispatcher = useDispatch();

  const handleDeletePublicationGroup = async () => {
    const result = await SwalHelper.confirm(`Se realizará <b style="color: red;"> ELIMINACIÓN </b> de <br> <b> ${publicationGroup.GROUP} </b> <br> ${MonthService.getMonthView(publication.INITIAL_MONTH, publication.FINAL_MONTH)} ${publication.YEAR}`, 'accept');
    if (result.isConfirmed) {

      const swalInstance: any = SwalHelper.loading();

      const resp = await PublicationGroupService.delete(publicationGroup.id);

      if (resp) {
        await afterDeletePublicationGroup();
        SwalHelper.success(resp);
      }

      swalInstance.close();
    }
  }

  const handleComment = async (calculation: Calculation) => {

    if (user.role === ROLES.ADMIN) {
      const result = await Swal.fire({
        allowOutsideClick: false,
        title: calculation.NAME,
        input: 'textarea',
        inputLabel: 'Ingresa Comentario',
        inputValue: (calculation.COMMENT) ? calculation.COMMENT : '',
        showCancelButton: true,
        confirmButtonColor: "var(--warning-color)",
        cancelButtonColor: "var(--disabled-color)",
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          if (!value) return 'Comentario Requerido';
          if (value.length > 255) return 'Comentario Máximo de 255 caracteres';
        }
      });

      if (result.isConfirmed) {

        const swalInstance: any = SwalHelper.loading();

        const comment = result.value;
        const resp = await CalculationService.setComment(calculation.id, {COMMENT: comment});
        if (resp) {
          dispatcher(setCalculationCommentArrayStore({calculation, comment}));
          SwalHelper.success(resp);
        }

        swalInstance.close();
      }
    } else {
      Swal.fire({
        allowOutsideClick: false,
        title: calculation.NAME,
        text: (calculation.COMMENT) ? calculation.COMMENT : '',
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonColor: "var(--disabled-color)",
        cancelButtonText: 'Cerrar'
      });
    }
  }

  const handleDeleteCalculation = async (calculation: Calculation) => {
    const result = await SwalHelper.confirm(`Se Eliminará el Grupo <b> ${calculation.NAME} </b>`, "delete");
    if (result.isConfirmed)
    {
      const swalInstance: any = SwalHelper.loading();
      const resp = await CalculationService.delete(calculation.id);
      if (resp) {
        const resp2 = await PublicationGroupService.calculations(publicationGroup.id);
        if (resp2) {
          dispatcher(setCalculationArrayStore(resp2));
          SwalHelper.success(resp);
        }
      }
      swalInstance.close();
    }
  }

  return {
    user,
    handleComment,
    handleDeleteCalculation,
    handleDeletePublicationGroup
  }
}
