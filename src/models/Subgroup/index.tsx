export interface Subgroup {
  id: number,
  NAME: string,
  GROUP: number
}

export const SubgroupIS: Subgroup = {
  id: 0,
  NAME: '',
  GROUP: 0
}

///////////////////////////////////////////////////////////

export interface SubgroupForm extends Omit<Subgroup, 'id'> {}

const {id, ...others} = SubgroupIS;

export const SubgroupFormIS: SubgroupForm = others;
