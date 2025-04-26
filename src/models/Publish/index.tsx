import { CalculationForm } from "../Calculation";
import { PublicationForm } from "../Publication";
import { PublicationGroupForm } from "../PublicationGroup";

export interface Publish extends PublicationForm, PublicationGroupForm {
  CalculationFormArray: CalculationForm[]
}
