import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  




  return (
    <div style={{ width: '100vw', height: "100vh" }}>
      <div style={{display:'grid', gridTemplateColumns: "1fr 1fr", gridGap: 20}}>
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      </div>
      
    </div>
  )
}

//  has an icon and a color
const CategoryCard = () => {
  return <div style={{ height: 100, width: "100%", display: 'flex', justifyContent: "center", flexDirection:"column", alignItems: "center", backgroundColor: "#F6E1C3", borderRadius: 10 }}>
    <img src="/fashion.png" width="50" height="50"></img>
    <div>Fashion</div>
  </div>
}

export default App
