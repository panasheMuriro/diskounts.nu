
import {business_and_images} from "../../../data/images"
import category_and_links from "../../../data/link_categories";

export default function CategoryHome({icon}) {

    

    let businesses_in_category = category_and_links[icon]
    console.log(businesses_in_category)
    console.log(business_and_images[businesses_in_category[0]])
   




  return (
    <div style={{height: "100vh", width: "100vw" }}>
       <div style={{ height: 110, padding:2, width: "100%", display: 'flex', justifyContent: "center", flexDirection:"column", alignItems: "center", backgroundColor: "#F6E1C3", borderRadius: "0 0 10px 10px" }}>
    <img src={`/${icon}.png`} width="50" height="50"></img>
    <div style={{color: "#A84448"}}>{icon}</div>
  </div>


<div style={{width: "100vw", display: "grid", gridTemplateColumns: "1fr 1fr"}}>



    <div style={{width: "100%", backgroundColor: "red", height: 200, padding: 5}}>
    <div style={{height: 150, width: "100%", backgroundColor: "yellow", backgroundImage: `url('${business_and_images[businesses_in_category[1]][1]}')` }}>
    </div>
    <div>{businesses_in_category[0]}</div>
    </div>
   

</div>


  
    
    </div>
  );
}
