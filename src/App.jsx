import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import DepartmentComponent from './components/DepartmentComponent'

function App() {


  return (
    <>
      <BrowserRouter>
      <HeaderComponent></HeaderComponent>
      <Routes>
        <Route path='/' element={<ListDepartmentComponent />} />
        <Route path='/departments' element={<ListDepartmentComponent />} />
        <Route path='/add-department' element={<DepartmentComponent />} />
        <Route path='/edit-department/:id' element={<DepartmentComponent />} />
      </Routes>
      <FooterComponent></FooterComponent>
      </BrowserRouter>
      
    </>
  )
}

export default App
