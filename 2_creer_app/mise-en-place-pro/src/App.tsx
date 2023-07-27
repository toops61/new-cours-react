import { useEffect, useState } from "react";

import Form from "./composants/Form";
import Cards from "./composants/Cards";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import { updateGeneralParams } from "./redux/generalParamsSlice";
import { updatePersos } from "./redux/persosSlice";
import Fruity from "./composants/Fruity-app/Fruity";
import { dataFields, persoCard } from "./utils/interfaces";
import { NewCard } from "./utils/classes";

export default function App() {
  const generalParams = useAppSelector((state : RootState) => state.generalParamsSlice);
  const persosArrayRedux = useAppSelector((state : RootState) => state.persosSlice);
  
  const dispatch = useAppDispatch();

  const [persosArray, setPersosArray]: [persoCard[], React.Dispatch<React.SetStateAction<NewCard[]>>] = useState<persoCard[]>([]);

  const getFormData : ((data: dataFields) => void) = data => {
    const tempObject = new NewCard(data.pseudo,data.persoName,'');
    const newArray : persoCard [] = persosArray.length ? persosArray.map(e => {return{...e}}) : [];
    const previousInd : number = persosArray.findIndex((perso : persoCard) => perso.pseudo === data.pseudo || perso.persoName === data.persoName);
    if (persosArray.length && previousInd !== -1) {
      tempObject.id = persosArray[previousInd].id;
      newArray.splice(previousInd,1,tempObject);
    } else {
      tempObject.id = uuidv4();
      newArray.push(tempObject);
      dispatch(updateGeneralParams({numberPersos:generalParams.numberPersos+1}));
    }
    setPersosArray(newArray);
    dispatch(updatePersos({...tempObject}));
  };

  useEffect(() => {
    persosArrayRedux.length && setPersosArray(persosArrayRedux.map(e => {return{...e}}));
  }, [])
  

  return (
    <main className="App">
      <div className="container">
        <Form getFormData={getFormData} />
        <section className="cards-container">
          {persosArray[0]?.pseudo ? persosArray.map((perso : NewCard) => <Cards pseudo={perso.pseudo} persoName={perso.persoName} key={perso.id} />) : <></>}
        </section>
        <section className="Fruity-section">
          <Fruity />
        </section>
      </div>
    </main>
  )
}
