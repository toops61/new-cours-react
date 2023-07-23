import { useState } from "react";
import FirstComponent from "./composants/FirstComponent";
import Form from "./composants/Form";

export default function App() {
  const [formContent, setFormContent] = useState({});

  const getFormData : ((data: object) => void) = data => {
    setFormContent(data);
  };

  class NewCard {
    constructor (
      public pseudo:string,
      public persoName:string,
      public id:string
    ) {}
  }

  return (
    <main className="App">
      <div className="container">
        <Form getFormData={getFormData} />
        <FirstComponent pseudo="test" persoName="test2" />
      </div>
    </main>
  )
}
