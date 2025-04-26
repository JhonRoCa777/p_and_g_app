import { Button, Container, Navbar } from "react-bootstrap";
import styles from './index.module.css';
import { TbDoorExit } from "react-icons/tb";
import { IndexHook } from "./index.hook";
import { ROLES, User } from "@/models";
import { RouterLinkDropdown } from "@/components";
import { BASE_URL } from "@/env";
import { Controls } from "@/components/Controls";

interface INavbarElement {
  user: User
}

export function NavbarElement({
  user
}: INavbarElement) {

  const {
    routerLink,
    windowWidth,
    handleLogout,
    navigate
  } = IndexHook();


  return (
    <Navbar className={styles.Container}>
      <Container fluid style={{flexDirection: 'column', gap: '1rem'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '1rem', width: '100%'}}>
          <Navbar.Brand style={{display: 'flex', alignItems: 'center', gap: '1rem', margin: 0}}>
            <img
              src={`${BASE_URL}/logo.png`}
              className={`${styles.Logo} d-inline-block align-top`}
            />
            {
              (user.role === ROLES.ADMIN) && <RouterLinkDropdown value={routerLink} handleOnChange={navigate}/>
            }
          </Navbar.Brand>
          {(windowWidth >= 768) &&
          <>
            <Controls/>
            <div className={styles.ExitContainer}>
              <Button className='Btn BtnDanger' title="cerrar sesion" onClick={handleLogout}>
              { user.username } <TbDoorExit/>
              </Button>
            </div>
          </>
          }
        </div>
        {(windowWidth < 768 && user.role === ROLES.ADMIN) &&
        <>
          <Controls/>

          <div className={styles.ExitContainer}>
            <Button className='Btn BtnDanger' title="cerrar sesion" onClick={handleLogout}>
            { user.username } <TbDoorExit/>
            </Button>
          </div>
        </>
        }
      </Container>
    </Navbar>
  )
}
