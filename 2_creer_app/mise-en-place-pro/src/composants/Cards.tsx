type PersoProps = {
    pseudo:string,
    persoName:string
}

export default function Cards({pseudo,persoName}:PersoProps) {
  return (
    <div className="card">
        <p>{pseudo}</p>
        <p>{persoName}</p>
    </div>
  )
}