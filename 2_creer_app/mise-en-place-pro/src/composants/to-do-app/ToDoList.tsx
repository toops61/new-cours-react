import { ChangeEvent, useEffect, useRef, useState } from "react"
import { taskFields } from "../../utils/interfaces";
import { replaceArray } from "../../utils/utilsFuncs";
import { TodoCard } from "./ToDoCard";
import { nanoid } from "nanoid";

export default function ToDoList() {
  const [inputField, setInputField] = useState<string>('');
  const [inputCheck, setInputCheck] = useState(false);
  const [modifiedObject, setModifiedObject] = useState<taskFields|null>(null);
  const [arrayTasks, setArrayTasks] = useState<taskFields[]>([]);
  const [alert, setAlert] = useState(false);

  const tasksRef = useRef<HTMLDivElement[]>([]);

  const addRemoveRefFunc = (el:HTMLDivElement) => {
    el ? tasksRef.current.push(el) : tasksRef.current.shift();
  }

  const handleChange : ((e:ChangeEvent) => void) = e => {
    const target = e.target as HTMLInputElement;    
    target.name === 'priority' ? setInputCheck(target.checked) : setInputField(target.value);
    if (target.name === 'addtask' && !target.value) setModifiedObject(null);
  }

  const showAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }

  const handleSubmit : ((e:React.SyntheticEvent) => void) = e => {
    e.preventDefault();
    
    const target = e.target as typeof e.target & {
      addtask:{value:string},
      priority:{checked:boolean}
    }
    const newTask = target.addtask.value;
    const priority = target.priority.checked;
    let tempArray = [...arrayTasks];
    const tempObject : taskFields = modifiedObject ? modifiedObject : {id:''};
    tempObject.value = newTask;
    tempObject.priority = priority ? 'urgent' : '';
    if (!modifiedObject) {
      tempObject.id = nanoid(10);
      tempArray.push(tempObject);
    } else {
      tempArray = replaceArray(tempArray,tempObject,'');
    }
    tempArray.sort((a,b) => {
      const priorityA = a.priority ? a.priority : '';
      const priorityB = b.priority ? b.priority : '';
      return priorityA < priorityB ? 1 : -1;
    })
    newTask ? setArrayTasks(tempArray) : showAlert();
    setInputField('');
    setInputCheck(false);
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
      setInputCheck(modifiedObject.priority ? true : false);
    }
  }, [modifiedObject])

  useEffect(() => {
    console.log(tasksRef);
    
    tasksRef?.current && tasksRef.current.map(e => console.log(e.children[0].textContent?.length));
    
  }, [arrayTasks])
  
  
  return (
    <div className="todo-main">
      <h2>To-do liste</h2>
      <form className="todo-form" onSubmit={handleSubmit}>
        <label htmlFor="addtask">Ajouter une tâche à effectuer</label>
        <input type="text" name="addtask" className="text-input" onChange={handleChange} value={inputField} />
        {alert ? <p className="alert">Vous devez d'abord ajouter une tâche</p> : <></>}
        <label htmlFor="priority">Urgent</label>
        <input type="checkbox" name="priority" className="check-input" onChange={handleChange} checked={inputCheck} />
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
              addRemoveRefFunc={addRemoveRefFunc}
            />)}
        </ul> : <p>Pas de tâche pour le moment</p>
      }
    </div>
  )
}