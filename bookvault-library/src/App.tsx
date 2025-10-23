import { useState } from 'react'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import BookList from './components/books/BookList'
import './App.css'
import AddBookForm from './components/books/AddBookForm'
import EditBookModal from './components/books/EditBookModal'

function App() {

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center py-6">📖 BookVault Library</h1>
      <AddBookForm />
      <BookList />
      <EditBookModal />

    </div>
    </>
  )
}

export default App
