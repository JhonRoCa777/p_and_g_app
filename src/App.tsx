import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from '@/redux';
import { AuthGuard } from '@/guards';
import { ROUTER } from '@/router';
import Unauthorized from '@/pages/Unauthorized';
import { SuspenseLazy } from '@/components';
import { BASE_URL } from '@/env';

function App() {

  return (
    <Provider store={Store}>
      <BrowserRouter basename={BASE_URL}
        future={{ v7_relativeSplatPath: false, v7_startTransition: false }}>

        <Routes>

          <Route path={ROUTER.UNAUTHORIZED} element={<Unauthorized/>}/>

          <Route element={<AuthGuard/>}>
            <Route path={`${ROUTER.MAIN}/*`} element={<SuspenseLazy path={import('@/pages/Home')}/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
