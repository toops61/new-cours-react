import { ChangeEvent, FormEvent, useState } from "react";

interface FormProps {
    getFormData: (data:string) => void;
}

export default function Form(props:FormProps) {
    const [input, setInput] = useState('');

    const handleChange : ((e:ChangeEvent) => void) = e => {
        const value = (e.target as HTMLInputElement).value;
        setInput(value);
    }

    const submitForm : ((e:FormEvent) => void) = e => {
        e.preventDefault();
        const target = (e.target as HTMLInputElement).childNodes[0] as HTMLInputElement;
        props.getFormData(target.value);
    }

  return (
    <form onSubmit={submitForm}>
        <input type="text" name="title" id="title" onChange={handleChange} value={input} />
        <button type="submit">Envoyer</button>
    </form>
  )
}