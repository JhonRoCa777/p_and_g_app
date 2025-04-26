import { CuentaContable } from "@/models";
import { BASE_API, GlobalErrors } from "@/services";

export function CuentaContableService() {

  const CONTROLLER = '/CuentaContable';

  return {
    index: () => GlobalErrors<CuentaContable[]>(() => BASE_API.get(`${CONTROLLER}`))
  }
}
