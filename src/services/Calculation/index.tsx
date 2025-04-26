import { Calculation, Group, PublicationForm } from "@/models";
import { BASE_API, GlobalErrors } from "@/services";
import { CancelToken } from "axios";

const CONTROLLER = '/Calculation';

export const CalculationService = {
  calculate: (publicationForm: PublicationForm, groupId: Group['id'], source: CancelToken) =>
    GlobalErrors<any>(() => BASE_API.post(`${CONTROLLER}/${groupId}`, publicationForm, {cancelToken: source})),

  recalculate: (publicationForm: PublicationForm, groupName: Group['NAME'], source: CancelToken) =>
    GlobalErrors<any>(() => BASE_API.put(`${CONTROLLER}/${groupName}`, publicationForm, {cancelToken: source})),

  setComment: (calculationId: Calculation['id'], calculationComment: Pick<Calculation, 'COMMENT'>) =>
    GlobalErrors<any>(() => BASE_API.patch(`${CONTROLLER}/${calculationId}`, calculationComment)),

  delete: (calculationId: Calculation['id']) =>
    GlobalErrors<string>(() => BASE_API.delete(`${CONTROLLER}/${calculationId}`)),
}
