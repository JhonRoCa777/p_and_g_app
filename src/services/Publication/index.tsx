import { Publication, PublicationWithPublicationGroups, Publish } from "@/models";
import { BASE_API, GlobalErrors } from "@/services";

const CONTROLLER = '/Publication';

export const PublicationService = {
  index: async (publication: Pick<Publication, 'YEAR' | 'FINAL_MONTH'>) =>
    GlobalErrors<PublicationWithPublicationGroups[]>(() => BASE_API.post(`${CONTROLLER}`, publication)),

  publish: async (publish: Publish) =>
    GlobalErrors<any>(() => BASE_API.post(`${CONTROLLER}/publish`, publish))
}
