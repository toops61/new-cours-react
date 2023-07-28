import { addOne, removeOne } from "../../redux/cartSlice";
import { useAppDispatch } from "../../redux/hooks"
import { fruitFields } from "../../utils/interfaces"

type fruitProps = {
    fruit:fruitFields
}

export default function FruityCard({fruit}: fruitProps) {
    const dispatch = useAppDispatch();

    const addFunc = () => dispatch(addOne(fruit));
    const removeFunc = () => dispatch(removeOne(fruit));

  return (
    <li className="fruity-card">
        <div className="fruit-image">
            <img src={fruit.url} alt={fruit.name} />
        </div>
        <div className="infos-part">
            <h4>{fruit.name}</h4>
            <p>Unit price : <span>{fruit.price}</span> $</p>
        </div>
        <div className="buttons-part">
            <button className="fruity-button" onClick={addFunc}>Add one</button>
            <button className="fruity-button red" onClick={removeFunc}>Remove one</button>
        </div>
    </li>
  )
}