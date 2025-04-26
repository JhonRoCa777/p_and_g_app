import { SpinnerFullScreen } from "@/components";
import { resetCalculationArrayStore, resetPublicationGroupStore, resetPublicationStore } from "@/redux";
import { GroupService } from "@/services";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

export const CalculatorResolver = () => {
  
  const dispatcher = useDispatch();

  const [resolving, setResolving] = useState<boolean>(true);

  const { index } = GroupService();

  const init = async () => {
    dispatcher(resetPublicationStore());
    dispatcher(resetPublicationGroupStore());
    dispatcher(resetCalculationArrayStore());
    await index();
    setResolving(false);
  }

  useEffect(()=>{
    init();
  }, []);
  
  return (!resolving) ? <Outlet/> : <SpinnerFullScreen/>
}
