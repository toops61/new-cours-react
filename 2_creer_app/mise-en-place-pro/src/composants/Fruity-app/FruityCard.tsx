import { fruitFields } from "../../utils/interfaces"

type fruitProps = {
    fruit:fruitFields
}

export default function FruityCard({fruit}: fruitProps) {
  return (
    <li>
        <div className="fruit-image">
            <img src={fruit.url} alt={fruit.name} />
        </div>
    </li>
  )
}