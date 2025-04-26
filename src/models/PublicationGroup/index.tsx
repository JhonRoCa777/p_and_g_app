export interface PublicationGroup {
  id: number,
  PUBLICATION: number,
  GROUP: string,
  created_at: string
}

export const PublicationGroupIS: PublicationGroup = {
  id: 0,
  PUBLICATION: 0,
  GROUP: '',
  created_at: ''
}

///////////////////////////////////////////////////////////

export interface PublicationGroupForm extends Pick<PublicationGroup, 'GROUP'> {}

export const PublicationGroupFormIS: PublicationGroupForm = {
  GROUP: PublicationGroupIS['GROUP']
}
