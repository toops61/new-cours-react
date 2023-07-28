import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks"
import { RootState } from "../../redux/store"
import { cartFruitFields } from "../../utils/interfaces";

export default function FruityCart() {
    const cart = useAppSelector((state: RootState) => state.cartSlice);
    const [cartTotal, setCartTotal] = useState<number>(0);

    useEffect(() => {
      if (cart.length) {
            let total : number = 0;
            cart.map(fruit => total+=(fruit.quantity*fruit.price));
          setCartTotal(total);
      } else {
        setCartTotal(0);
      }
    }, [cart])
    

  return (
    <div className="cart-container">
        <h3>Cart</h3>
        {cart.length ? <ul className="fruit-list">
            {cart.map((fruit:cartFruitFields) => <li key={fruit.id}>{fruit.quantity + ' ' + fruit.name}</li>)}
        </ul> : <></>}
        <p>total : <span>{cartTotal}</span> $</p>
    </div>
  )
}