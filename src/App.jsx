import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter } from 'react-router'
import Routing from './routing/Routing'
import SearchBar from './components/SearchBar'
import { SearchProvider } from './context/SearchContext'
import Footer from './components/Footer'
import {ToastContainer} from 'react-toastify'

const App = () => {
  return (
    <div>
      <SearchProvider>
      <BrowserRouter>
      <Navbar />
      <Routing />
      <ToastContainer 
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Footer />
      </BrowserRouter>
      </SearchProvider>

       
    </div>
  )
}

export default App
