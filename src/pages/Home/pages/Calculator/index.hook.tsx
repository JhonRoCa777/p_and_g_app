import { SwalHelper } from "@/helpers";
import { Publication, PublicationForm, PublicationGroup, PublicationGroupForm } from "@/models";
import {
  resetCalculationArrayStore,
  resetCalculationFormArrayStore,
  resetPublicationFormStore,
  resetPublicationGroupFormStore,
  resetPublicationGroupStore,
  resetPublicationStore,
  setCalculationFormArrayStore,
  setPublicationFormStore,
  setPublicationGroupFormStore
} from "@/redux";
import { CalculationService } from "@/services";
import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

interface IIndexHook {
  publication: Publication,
  publicationGroup: PublicationGroup
}

export function IndexHook({
  publication, publicationGroup
}: IIndexHook) {

  const dispatcher = useDispatch();

  const handleReset = () => {
    dispatcher(resetPublicationStore());
    dispatcher(resetPublicationGroupStore());
    dispatcher(resetCalculationArrayStore());

    dispatcher(resetPublicationFormStore());
    dispatcher(resetPublicationGroupFormStore());
    dispatcher(resetCalculationFormArrayStore());
  }

  const handleReCalculate = async () => {

    if (publication.INITIAL_MONTH > publication.FINAL_MONTH)
      SwalHelper.warning('El Mes Final debe ser MAYOR o IGUAL al Mes Inicial');

    else {
      const source = axios.CancelToken.source();

      const result = await Swal.fire({
        allowOutsideClick: false,
        title: 'Cargando...',
        text: 'Por favor espera.',
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        didOpen: async () => {
          Swal.showLoading();
          const publicationForm: PublicationForm = {
            YEAR: publication.YEAR, INITIAL_MONTH: publication.INITIAL_MONTH, FINAL_MONTH: publication.FINAL_MONTH
          };
          const publicationGroupForm: PublicationGroupForm = {
            GROUP: publicationGroup.GROUP
          };
          const resp = await CalculationService.recalculate(publicationForm, publicationGroup.GROUP, source.token);
          if (resp) {
            dispatcher(setPublicationFormStore(publicationForm));
            dispatcher(setPublicationGroupFormStore(publicationGroupForm));
            dispatcher(setCalculationFormArrayStore(resp));
          }
          Swal.close();
        }
      }); if (result.dismiss) source.cancel();
    }
  }

  return {
    handleReset,
    handleReCalculate
  }
}
