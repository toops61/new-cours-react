import { useState } from "react";
import FirstComponent from "./composants/FirstComponent";
import Form from "./composants/Form";
import Cards from "./composants/Cards";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  class NewCard {
    constructor (
      public pseudo:string,
      public persoName:string,
      public id:string
    ) {}
  }

  const [persosArray, setPersosArray]: [NewCard[], React.Dispatch<React.SetStateAction<NewCard[]>>] = useState([new NewCard('', '', '')]);

  const getFormData : ((data: object) => void) = data => {
    const previous = !persosArray[0].pseudo ? [] : [...persosArray];
    const tempObject = new NewCard('','',uuidv4());
    const newArray = [...previous,{...tempObject,...data}];    
    setPersosArray(newArray);
  };


  return (
    <main className="App">
      <div className="container">
        <Form getFormData={getFormData} />
        <FirstComponent />
        <section className="cards-container">
          {persosArray[0].pseudo ? persosArray.map((perso : NewCard) => <Cards pseudo={perso.pseudo} persoName={perso.persoName} key={perso.id} />) : <></>}
        </section>
      </div>
    </main>
  )
}
