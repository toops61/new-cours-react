import { useState } from "react";
import { taskFields } from "../../utils/interfaces";

interface cardProps {
    todoObject:taskFields;
    deleteTask:((obj:taskFields) => void);
    setModifiedObject:((obj:taskFields) => void);
    addRemoveRefFunc:((e:HTMLDivElement) => void);
}

export function TodoCard ({todoObject,deleteTask,setModifiedObject,addRemoveRefFunc}:cardProps) {
    const [done, setDone] = useState(false);

    return (
      <div className={"todo-card" + (todoObject.priority && !done ? " urgent" : "") + (done ? " done" : "")} ref={addRemoveRefFunc} >
        <h4 onClick={() => setDone(!done)}>{todoObject.value}</h4>
        <div className="modif-sup-btn">
          <div className="modif-btn" onClick={() => setModifiedObject(todoObject)}>
            <p className="hover-infos">modifier</p>
          </div>
          <div className="delete-btn" onClick={() => deleteTask(todoObject)}>
            <p className="hover-infos">supprimer</p>
          </div>
        </div>
        {todoObject.priority && !done ? <p className="urgent-text">urgent</p> : <></>}
      </div>
    )
  }