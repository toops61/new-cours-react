import { useState } from "react";
import FirstComponent from "./composants/FirstComponent";
import Form from "./composants/Form";

export default function App() {
  const [formContent, setFormContent] = useState('')

  const getFormData : ((data: string) => void) = data => {
    setFormContent(data);
  };

  return (
    <main className="App">
      <div className="container">
        <Form getFormData={getFormData} />
        <FirstComponent title={formContent} />
      </div>
    </main>
  )
}
