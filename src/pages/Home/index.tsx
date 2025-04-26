import { RoutesWithNotFound, SuspenseLazy } from "@/components";
import { FooterElement, NavbarElement } from "./components";
import { ROUTER } from "@/router";
import { Container } from "react-bootstrap";
import { Route } from "react-router-dom";
import { AdminGuard } from "@/guards";
import { UserStore } from "@/redux";

export default function Home() {
  return (
    <>
      <NavbarElement user={UserStore()}/>

      <Container className="mb-3" fluid>

        <RoutesWithNotFound navigateTo={ROUTER.HOME.MAIN}>
          
          <Route path={ROUTER.HOME.MAIN}
            element={<SuspenseLazy path={import('./pages/Publication')}/>}>
          </Route>

          <Route element={<AdminGuard/>}>

            <Route path={ROUTER.HOME.CALCULATOR}
              element={<SuspenseLazy path={import('./pages/Calculator')}/>}>
            </Route>

            <Route path={ROUTER.HOME.DASHBOARD}
              element={<SuspenseLazy path={import('./pages/Dashboard')}/>}>
            </Route>

          </Route>

        </RoutesWithNotFound>

      </Container>

      <FooterElement/>
    </>
  )
}
