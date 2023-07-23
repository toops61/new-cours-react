import { ChangeEvent, FormEvent, useState } from "react";

interface FormProps {
    getFormData: (data:object) => void;
}

export default function Form(props:FormProps) {
    class NewPerso {
        constructor (
          public pseudo:string,
          public persoName:string
        ) {}
    }

    const [input, setInput] = useState(new NewPerso('',''));

    const handleChange : ((e:ChangeEvent) => void) = e => {
        const tempObject = {...input};
        const target = e.target as HTMLInputElement;
        //tempObject[target.name] = target.value;
        console.log(target.name);
        
        //setInput(value);
    }


    const submitForm : ((e:FormEvent) => void) = e => {
        e.preventDefault();
        const target0 = (e.target as HTMLInputElement).childNodes[0] as HTMLInputElement;
        const target1 = (e.target as HTMLInputElement).childNodes[1] as HTMLInputElement;
        const newPerso = new NewPerso(target0.value,target1.value)
        props.getFormData(newPerso);
    }

  return (
    <form onSubmit={submitForm}>
        <label htmlFor="pseudo">Pseudo</label>
        <input type="text" name="pseudo" id="pseudo" onChange={handleChange} value={input.pseudo} />
        <label htmlFor="persoName">Nom</label>
        <input type="text" name="persoName" id="persoName" onChange={handleChange} value={input.persoName} />
        <button type="submit">Envoyer</button>
    </form>
  )
}