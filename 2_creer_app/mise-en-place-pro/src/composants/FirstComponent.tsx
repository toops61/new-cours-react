type FirstProps = {
    title:string
}

export default function FirstComponent({title}:FirstProps) {
  return (
    <section className="first-component">
        <h1>premier composant</h1>
        <div>{title}</div>
    </section>
  )
}