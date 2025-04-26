import { Calculation, PublicationGroup } from "@/models";
import { BASE_API, GlobalErrors } from "@/services";

const CONTROLLER = '/PublicationGroup';

export const PublicationGroupService = {
  calculations: (publicationGroupId: PublicationGroup['id']) =>
    GlobalErrors<Calculation[]>(() => BASE_API.get(`${CONTROLLER}/${publicationGroupId}`)),

  delete: async (PublicationGroupId: PublicationGroup['id']) =>
    GlobalErrors<string>(() => BASE_API.delete(`${CONTROLLER}/${PublicationGroupId}`)),
}
