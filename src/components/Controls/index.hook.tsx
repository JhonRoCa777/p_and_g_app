import { useState } from "react";
import { Group, GroupIS, Month, PublicationForm, PublicationGroupForm } from "@/models";
import { DateHelper, SwalHelper } from "@/helpers";
import { CalculationService, MonthService, PublicationService } from "@/services";
import { useDispatch } from "react-redux";
import {
  resetCalculationArrayStore,
  resetCalculationFormArrayStore,
  resetPublicationFormStore,
  resetPublicationGroupFormStore,
  resetPublicationGroupStore,
  resetPublicationStore,
  resetPublicationWithPublicationGroupsArrayStore,
  RouterLinkStore,
  setCalculationArrayStore,
  setCalculationFormArrayStore,
  setPublicationFormStore,
  setPublicationGroupFormStore,
  setPublicationGroupStore,
  setPublicationStore,
  setPublicationWithPublicationGroupsArrayStore
} from "@/redux";
import axios from "axios";
import Swal from "sweetalert2";

export function IndexHook() {

  const dispatcher = useDispatch();

  const routerLink = RouterLinkStore();

  const currentMonth = MonthService.getCurrent()!;

  const [year, setYear] = useState<number>(DateHelper.currentYear());
  const [initialMonth, setInitialMonth] = useState<Month>(currentMonth);
  const [finalMonth, setFinalMonth] = useState<Month>(currentMonth);
  const [group, setGroup] = useState<Group>(GroupIS);

  const handleCalculate = async () => {

    if (group.id === GroupIS.id)
      SwalHelper.warning('Por favor, seleccione un Grupo');

    else if (initialMonth.id > finalMonth.id)
      SwalHelper.warning('El Mes Final debe ser MAYOR o IGUAL al Mes Inicial');

    else {
      dispatcher(resetPublicationStore());
      dispatcher(resetPublicationGroupStore());
      dispatcher(resetCalculationArrayStore());
  
      dispatcher(resetPublicationFormStore());
      dispatcher(resetPublicationGroupFormStore());
      dispatcher(resetCalculationFormArrayStore());

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
            YEAR: year, INITIAL_MONTH: initialMonth.id, FINAL_MONTH: finalMonth.id
          };
          const publicationGroupForm: PublicationGroupForm = {
            GROUP: group.NAME
          };
          const resp = await CalculationService.calculate(publicationForm, group.id, source.token);
          if (resp) {
            if (resp.calculationArray) {
              dispatcher(setPublicationStore(resp.publication));
              dispatcher(setPublicationGroupStore(resp.publicationGroup));
              dispatcher(setCalculationArrayStore(resp.calculationArray));
            } else {
              dispatcher(setPublicationFormStore(publicationForm));
              dispatcher(setPublicationGroupFormStore(publicationGroupForm));
              dispatcher(setCalculationFormArrayStore(resp));
            }
          }
          Swal.close();
        }
      }); if (result.dismiss) source.cancel();
    }
  }

  const handleSearch = async () => {
    const swalInstance: any = SwalHelper.loading();

    const resp = await PublicationService.index({YEAR: year, FINAL_MONTH: finalMonth.id});
    if (resp) {
      dispatcher(resetPublicationWithPublicationGroupsArrayStore());
      dispatcher(resetPublicationStore());
      dispatcher(resetPublicationGroupStore());
      dispatcher(resetCalculationArrayStore());

      dispatcher(setPublicationWithPublicationGroupsArrayStore(resp));
      if(resp.length === 0) SwalHelper.info('No Hay Resultados');
    }

    swalInstance.close();
  }

  return {
    routerLink,
    year, setYear,
    initialMonth, setInitialMonth,
    finalMonth, setFinalMonth,
    group, setGroup,
    handleSearch,
    handleCalculate
  }
}
