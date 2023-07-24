import './App.css'
import category_and_links from '../../../data/link_categories'

export default function Categories() {

  console.log(category_and_links)
  

  return (
    <div style={{ width: '100vw', height: "100vh" }}>
      <div><h2>Diskounts</h2></div>
      <div style={{display:'grid', gridTemplateColumns: "1fr 1fr", gridGap: 15}}>
        {Object.keys(category_and_links).map((icon, index)=> <CategoryCard key={index} icon={icon}/>)}
      </div>
      
    </div>
  )
}

//  has an icon and a color
const CategoryCard = ({icon}) => {
  return <div style={{ height: 110, padding:2, width: "100%", display: 'flex', justifyContent: "center", flexDirection:"column", alignItems: "center", backgroundColor: "#F6E1C3", borderRadius: 10 }}>
    <img src={`/${icon}.png`} width="50" height="50"></img>
    <div style={{color: "#A84448"}}>{icon}</div>
  </div>
}

// export default App
