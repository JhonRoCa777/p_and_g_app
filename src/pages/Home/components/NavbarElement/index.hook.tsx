import { AuthService } from "@/services";
import { useEffect, useState } from "react";
import { RouterLinkStore } from "@/redux";
import { useNavigate } from "react-router-dom";
import { SwalHelper } from "@/helpers";

export const IndexHook = () => {

  const {logout} = AuthService();

  const routerLink = RouterLinkStore();

  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleLogout = async () => {
    const swalInstance: any = SwalHelper.loading();
    await logout();
    swalInstance.close();
  }

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    routerLink,
    windowWidth,
    handleLogout,
    navigate
  };
};
