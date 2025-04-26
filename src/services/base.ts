import { SwalHelper } from "@/helpers";
import { ROUTER } from "@/router";
import axios, { AxiosResponse } from "axios";

export const BASE_API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
});

export const GlobalErrors = async <T>(axiosParameter: any): (Promise<T | null>) => {

  try {
    const resp: AxiosResponse<T> = await axiosParameter();
    return resp.data;
  }
  catch (error: any) {

    if (error.response) {
      switch (error.response.status) {
        // COMMON ERRORS
        case 400:
          SwalHelper.error(error.response.data);
          break;
        // USUARIO DESHABILITADO
        case 406:
          SwalHelper.error(error.response.data).then((result) => {
            if (result.isConfirmed) ROUTER.LOGIN();
          });
        break;
        // EXCEL ERRORS
        case 417:
          SwalHelper.excel_error(error.response.data);
        break;
        // FORM GROUP ERRORS
        case 422:
          SwalHelper.error(JSON.stringify(error.response.data));
        break;
        // TOKEN NO VALIDO - TOKEN EXPIRADO
        case 426:
          ROUTER.LOGIN();
        break;
        // OTROS
        default:
          SwalHelper.error('Por favor comuníquese con Sistemas');
          console.error(error);
        break;
      }
    }
    else console.error(error.message);

    return null;
  }
}
