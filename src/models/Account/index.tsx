export interface Account {
  id: number,
  CODIGOCTA: string,
  DESCRIPCIO: string,
  SUBGROUP: number,
}

export const AccountIS: Account = {
  id: 0,
  CODIGOCTA: '',
  DESCRIPCIO: '',
  SUBGROUP: 0,
}

////////////////////////////////////////////////////////////////////////////////

export interface AccountForm extends Omit<Account, 'id'> {}

const {id, ...others} = AccountIS;

export const AccountFormIS: AccountForm = others;
