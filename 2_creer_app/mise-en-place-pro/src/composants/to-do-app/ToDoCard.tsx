import { taskFields } from "../../utils/interfaces";

interface cardProps {
    todoObject:taskFields;
    deleteTask:((obj:taskFields) => void);
    setModifiedObject:((obj:taskFields) => void);
}

export function TodoCard ({todoObject,deleteTask,setModifiedObject}:cardProps) {
    return (
      <div className="todo-card">
        <h4>{todoObject.value}</h4>
        <div className="modif-sup-btn">
          <div className="modif-btn" onClick={() => setModifiedObject(todoObject)}>
            <p className="hover-infos">modifier</p>
          </div>
          <div className="delete-btn" onClick={() => deleteTask(todoObject)}>
            <p className="hover-infos">supprimer</p>
          </div>
        </div>
      </div>
    )
  }