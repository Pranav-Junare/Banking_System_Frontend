import{BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';

import Home from "./Home"
import Login from "./Login"
import Dashboard from "./Dashboard"
import History from "./History"
import SignUp from './SignUp'
import SendMoney from "./SendMoney"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/sendMoney" element={<SendMoney/>} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/history" element={<History/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
