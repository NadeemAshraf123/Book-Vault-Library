import { useState } from 'react'
import BookList from './components/books/BookList'
import './App.css'
import AddBookForm from './components/books/AddBookForm'

function App() {

  return (
    <>
      <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center py-6">📖 BookVault Library</h1>
      <AddBookForm />
      <BookList />

    </div>
    </>
  )
}

export default App
