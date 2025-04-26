import { ROLES } from "@/models"
import { UserStore } from "@/redux"
import { ROUTER } from "@/router"
import { Navigate, Outlet } from "react-router-dom"

export const AdminGuard = () => {
  return (UserStore().role === ROLES.ADMIN) ? <Outlet/> : <Navigate replace to={ROUTER.HOME.MAIN}/>
}
