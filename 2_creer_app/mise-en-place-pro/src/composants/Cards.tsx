import { dataFields } from "../utils/interfaces";

export default function Cards({pseudo,persoName}:dataFields) {
  return (
    <div className="card">
        <p>{pseudo}</p>
        <p>{persoName}</p>
    </div>
  )
}