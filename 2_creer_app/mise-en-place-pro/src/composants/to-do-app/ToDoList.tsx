import { ChangeEvent, useEffect, useState } from "react"
import { taskFields } from "../../utils/interfaces";
import { v4 as uuidv4 } from 'uuid';
import { replaceArray } from "../../utils/utilsFuncs";
import { TodoCard } from "./ToDoCard";

export default function ToDoList() {
  const [inputField, setInputField] = useState<string>('');
  const [modifiedObject, setModifiedObject] = useState<taskFields|null>(null);
  const [arrayTasks, setArrayTasks] = useState<taskFields[]>([]);

  const handleChange : ((e:ChangeEvent) => void) = e => {
    const target = e.target as HTMLInputElement;
    setInputField(target.value);
  }

  const handleSubmit : ((e:React.SyntheticEvent) => void) = e => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      addtask:{value:string}
    }
    const newTask = target.addtask.value;
    let tempArray = [...arrayTasks];
    const tempObject : taskFields = modifiedObject ? modifiedObject : {value:'',id:''};
    tempObject.value = newTask;
    if (!modifiedObject) {
      tempObject.id = uuidv4();
      tempArray.push(tempObject);
    } else {
      tempArray = replaceArray(tempArray,tempObject,'');
    }    
    newTask && setArrayTasks(tempArray);
    setInputField('');
    setModifiedObject(null);
  }

  const deleteTask : ((obj:taskFields) => void) = obj => {
    const newArray = replaceArray(arrayTasks,obj,'delete');
    confirm('voulez vous supprimer cette tâche ?') && setArrayTasks(newArray);
  }

  useEffect(() => {
    if (modifiedObject) {
      const name = modifiedObject.value ? modifiedObject.value : '';
      setInputField(name);
    }
  }, [modifiedObject])
  
  return (
    <div className="todo-main">
      <h2>To-do liste</h2>
      <form className="todo-form" onSubmit={handleSubmit}>
        <label htmlFor="addtask">Ajouter une tâche à effectuer</label>
        <input type="text" name="addtask" onChange={handleChange} value={inputField} />
        <button className="add-button">{modifiedObject ? 'modifier' : 'Ajouter'}</button>
      </form>
      {
        arrayTasks.length ? 
        <ul className="todo-list">
          {arrayTasks.map(task => 
            <TodoCard
              todoObject={task} 
              deleteTask={deleteTask}
              setModifiedObject={setModifiedObject}
              key={task.id} 
            />)}
        </ul> : <p>Pas de tâche pour le moment</p>
      }
    </div>
  )
}