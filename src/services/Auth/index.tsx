import { User } from "@/models";
import { resetUserStore, setUserStore } from "@/redux";
import { ROUTER } from "@/router";
import { BASE_API, GlobalErrors } from "@/services";
import { useDispatch } from "react-redux";

export function AuthService() {

  const CONTROLLER = '/Auth';
  const dispatcher = useDispatch();

  return {
    auth: async (token: string) => {
      let resp = await GlobalErrors<User>(() => BASE_API.get(`${CONTROLLER}`, { headers: { 'Authorization': `Bearer ${token}` } }));
      if(resp) dispatcher(setUserStore(resp));
    },
    verify: async () => {
      let resp = await GlobalErrors<User>(() => BASE_API.get(`${CONTROLLER}/verify`));
      if(resp) dispatcher(setUserStore(resp));
    },
    logout: async () => {
      let resp = await GlobalErrors<string>(() => BASE_API.get(`${CONTROLLER}/logout`));
      if (resp) {
        dispatcher(resetUserStore());
        ROUTER.LOGIN();
      }
    }
  }
}
