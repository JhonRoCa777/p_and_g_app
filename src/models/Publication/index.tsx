import { PublicationGroup } from "../PublicationGroup";

//////////////////////////////////////////////////////////////////////////////////////////
export interface Publication {
  id: number,
  YEAR: number,
  INITIAL_MONTH: number,
  FINAL_MONTH: number,
}

export const PublicationIS: Publication = {
  id: 0,
  YEAR: 0,
  INITIAL_MONTH: 0,
  FINAL_MONTH: 0
}
/*****************************************************************************************/

//////////////////////////////////////////////////////////////////////////////////////////
export interface PublicationWithPublicationGroups extends Publication {
  publication_groups: PublicationGroup[]
}

export const PublicationWithPublicationGroupsIS: PublicationWithPublicationGroups = {
  ...PublicationIS, publication_groups: []
}
/*****************************************************************************************/

//////////////////////////////////////////////////////////////////////////////////////////
export const PublicationWithPublicationGroupsArrayIS: PublicationWithPublicationGroups[] = [];
/*****************************************************************************************/

//////////////////////////////////////////////////////////////////////////////////////////
export interface PublicationForm extends Omit<Publication, 'id'> {}

const {id, ...others} = PublicationIS;

export const PublicationFormIS: PublicationForm = others;
/*****************************************************************************************/
