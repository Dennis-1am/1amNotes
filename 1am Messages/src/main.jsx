import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Routes, Route , BrowserRouter } from 'react-router-dom'
import Layout from './template/Layout.jsx'
import PostPage from './pages/postPage.jsx'
import EditPage from './template/OverlayEdit.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<App/>} />
          <Route path="/post/:id" element={<PostPage/>} />
          <Route path="/edit/:id" element={<EditPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
