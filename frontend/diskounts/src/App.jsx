import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import category_and_links from '../../../data/link_categories'
import Categories from './Categories'
import CategoryHome from './CategoryHome'

function App() {

  console.log(category_and_links)
  

  return (
    // <Categories/>
    <CategoryHome icon={Object.keys(category_and_links)[0]}/>
  )
}



export default App
