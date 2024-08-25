import {
  BrowserRouter, Routes , Route,
} from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import SendMoney from './pages/SendMoney'
import Dashboard from './pages/Dashboard'
import Me from './pages/Me'
function App() {
  return (
<>
<BrowserRouter>
<Routes>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/signin' element={<Signin/>}/>
  <Route path='/send' element={<SendMoney/>}/>
  <Route path='/dashboard' element={<Dashboard/>}/>
  <Route path='/me' element={<Me/>}/>
</Routes>
</BrowserRouter>
</>
  )
}

export default App
