import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import FruityCard from "./FruityCard";
import FruityCart from "./FruityCart";

export default function Fruity() {
  const fruitList = useAppSelector((state: RootState) => state.fruitsSlice);

  return (
    <>
        <h1>Fruity</h1>
        <p>Pick your fruits</p>
        <ul>
            {fruitList.map(fruit => <FruityCard key={fruit.id} fruit={fruit} />)}
        </ul>
        <FruityCart />
    </>
  )
}