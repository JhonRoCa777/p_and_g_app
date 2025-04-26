import { CardElement, TableCalculation } from "@/components";
import {
  CalculationArrayStore,
  PublicationGroupStore,
  PublicationStore,
  resetCalculationArrayStore,
  resetPublicationGroupStore,
  resetPublicationStore,
  resetPublicationWithPublicationGroupsArrayStore,
  setPublicationWithPublicationGroupsArrayStore
} from "@/redux";
import { PublicationService } from "@/services";
import { useDispatch } from "react-redux";

export function CalculationList() {

  const currentPublication = PublicationStore();
  const currentPublicationGroup = PublicationGroupStore();
  const currentCalculationArray = CalculationArrayStore();

  const dispatcher = useDispatch();

  const afterDeletePublicationGroup = async () => {
    const resp = await PublicationService.index({YEAR: currentPublication.YEAR, FINAL_MONTH: currentPublication.FINAL_MONTH});
    if (resp) {
      dispatcher(resetPublicationWithPublicationGroupsArrayStore());
      dispatcher(resetPublicationStore());
      dispatcher(resetPublicationGroupStore());
      dispatcher(resetCalculationArrayStore());

      dispatcher(setPublicationWithPublicationGroupsArrayStore(resp));
    }
  }

  return (
    <>
      {(currentPublicationGroup.GROUP.length > 0) &&
        <CardElement className="pt-3">
          <TableCalculation
            publication={currentPublication}
            publicationGroup={currentPublicationGroup}
            calculationArray={currentCalculationArray}
            afterDeletePublicationGroup={afterDeletePublicationGroup}
          />
        </CardElement>
      }
    </>
  )
}
