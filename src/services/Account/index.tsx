import { Account, AccountForm, Subgroup } from "@/models";
import { BASE_API, GlobalErrors } from "@/services";

export function AccountService() {

  const CONTROLLER = '/Account';

  return {
    indexBySubgroup: (id: Subgroup['id']) => GlobalErrors<Account[]>(() => BASE_API.get(`${CONTROLLER}/${id}`)),
    create: (data: AccountForm) => GlobalErrors<string>(() => BASE_API.post(`${CONTROLLER}`, data)),
    eliminate: (id: Subgroup['id']) => GlobalErrors<string>(() => BASE_API.delete(`${CONTROLLER}/${id}`))
  }
}
