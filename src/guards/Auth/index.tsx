import { SpinnerFullScreen } from "@/components";
import { UserStore } from "@/redux";
import { AuthService } from "@/services";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const USER_TOKEN = import.meta.env.VITE_USER_TOKEN;

export const AuthGuard = () => {

  const {auth, verify} = AuthService();

  const getUser = async () => {

    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);

    const token = params.get((USER_TOKEN) ? USER_TOKEN : '');

    if (token) await auth(token);
    else await verify();
  }

  useEffect(() => {
    getUser();
  }, []);

  return (UserStore().username) ? <Outlet/> : <SpinnerFullScreen/>
}
