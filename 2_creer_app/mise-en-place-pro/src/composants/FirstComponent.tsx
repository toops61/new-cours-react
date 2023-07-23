type FirstProps = {
    pseudo:string,
    persoName:string
}

export default function FirstComponent({pseudo,persoName}:FirstProps) {
  return (
    <section className="first-component">
        <h1>premier composant</h1>
        <p>{pseudo}</p>
        <p>{persoName}</p>
    </section>
  )
}