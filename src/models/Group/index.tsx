
export interface Group {
  id: number,
  NAME: string
}

export const GroupIS: Group = {
  id: 0,
  NAME: ''
}

///////////////////////////////////////////////////////////

export interface GroupForm extends Pick<Group, 'NAME'> {}

export const GroupFormIS: GroupForm = {
  NAME: GroupIS['NAME']
}
