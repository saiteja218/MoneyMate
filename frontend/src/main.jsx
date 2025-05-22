import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeContextProvider } from './context/ThemeContext';


createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
  <BrowserRouter>
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
  </BrowserRouter>
  </ThemeContextProvider>
)
