import BoxResult from "./BoxResult";
import BoxyParams from "./BoxyParams";

export default function Boxy() {
    
  return (
    <>
        <h2>BOXY GENERATOR</h2>
        <div className="boxes">
            <BoxyParams />
            <BoxResult />
        </div>
    </>
  )
}