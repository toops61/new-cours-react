import { ChangeEvent, FormEvent, useState } from "react";

interface persoFields {
    pseudo:string;
    persoName:string;
}
interface FormProps {
    getFormData: (data:persoFields) => void;
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
        const tempObject: {
            [key:string]:string
        } = {};
        const target = e.target as HTMLInputElement;
        tempObject[target.name] = target.value;
        setInput({...input,...tempObject});
    }


    const submitForm : ((e:FormEvent) => void) = e => {
        e.preventDefault();
        /* const target0 = (e.target as HTMLInputElement).childNodes[0] as HTMLInputElement;
        const target1 = (e.target as HTMLInputElement).childNodes[1] as HTMLInputElement;
        const newPerso = new NewPerso(target0.value,target1.value); */
        props.getFormData(input);
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