import { useEffect, useRef, useState } from "react";

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
import Users from "./composants/Users";
import Loader from "./composants/Loader";
import Chrono from "./composants/Chrono";
import ToDoList from "./composants/to-do-app/ToDoList";
import Boxy from "./composants/Boxy-generator/Boxy";
import TestRefForward from "./composants/testForwardRefs/TestRefForward";

export default function App() {
  const generalParams = useAppSelector((state : RootState) => state.generalParamsSlice);
  const persosArrayRedux = useAppSelector((state : RootState) => state.persosSlice);
  const usersLoader = useAppSelector((state : RootState) => state.usersSlice.loading);

  const [openFruity, setOpenFruity] = useState<boolean>(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openChrono, setOpenChrono] = useState(false);
  const [openTodo, setOpenTodo] = useState(false);
  const [openBoxy, setOpenBoxy] = useState(false);
  const [openTestRef, setOpenTestRef] = useState(false);

  const dispatch = useAppDispatch();

  const fruityRef = useRef<HTMLElement>(null);

  const fruityCurrent = fruityRef.current;

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
      {usersLoader ? <Loader /> : <></>}
      <div className="container">
        <Form getFormData={getFormData} />
        <section className="cards-container">
          {persosArray[0]?.pseudo ? persosArray.map((perso : NewCard) => <Cards pseudo={perso.pseudo} persoName={perso.persoName} key={perso.id} />) : <></>}
        </section>
        <section className="fruity-section" ref={fruityRef}>
          <button onClick={() => setOpenFruity(!openFruity)} className="open-close">
            {openFruity ? 'close' : 'open'}
          </button>
          {openFruity ? <Fruity /> : <h3>Fruity</h3>}
        </section>
        <section className="users-section">
          <button onClick={() => setOpenUsers(!openUsers)} className="open-close">
            {openUsers ? 'close' : 'open'}
          </button>
          <Users openUsers={openUsers} />
          {!openUsers ? <h3>Users</h3> : <></>}
        </section>
        <section className="chrono-section">
          <button onClick={() => setOpenChrono(!openChrono)} className="open-close">
            {openChrono ? 'close' : 'open'}
          </button>
          {openChrono ? <Chrono /> : <h3>Chrono</h3>}
        </section>
        <section className="todo-section">
          <button onClick={() => setOpenTodo(!openTodo)} className="open-close">
            {openTodo ? 'close' : 'open'}
          </button>
          {openTodo ? <ToDoList fruityRef={fruityCurrent} /> : <h3>Todo liste</h3>}
        </section>
        <section className="boxy-section">
          <button onClick={() => setOpenBoxy(!openBoxy)} className="open-close">
            {openBoxy ? 'close' : 'open'}
          </button>
          {openBoxy ? <Boxy /> : <h3>Boxy app</h3>}
        </section>
        <section className="testref-section">
          <button onClick={() => setOpenTestRef(!openTestRef)} className="open-close">
            {openTestRef ? 'close' : 'open'}
          </button>
          {openTestRef ? <TestRefForward /> : <h3>Test forwardRef app</h3>}
        </section>
      </div>
    </main>
  )
}
