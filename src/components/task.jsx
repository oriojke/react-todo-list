import { nanoid } from 'nanoid';
import { useEffect, useState } from "react";
import '../css/task.css'
import Subtask from './subtask';

function Task({task, OnDelete, OnUpdate, OnSwitch}){

    const titleEditId = nanoid();
    const checkboxId = 'chbx' + nanoid();
    
    const [titleReadOnly, setTitleReadOnly] = useState(true);
    const [subtaskList, setSubtasks] = useState([]);

    const apiUrlSubtasks = 'http://185.246.66.84:3000/ndidyk/subtasks';

    const getSubTasksList = () => {
            fetch(apiUrlSubtasks + '?taskId=' + task.id)
            .then((res) => res.json())
            .then((data) => setSubtasks(data
                                        .sort((a, b) => a.completed ? 1 : -1))
            );
    };

    useEffect(()=>{
        getSubTasksList();
      }, []);

    const RemoveSubTask = (id) => {
        const requestOptions = {
            method: 'DELETE'
        };
        fetch(apiUrlSubtasks + '/' + id, requestOptions)
            .then(() => getSubTasksList());
    };

    const AddSubTask = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Новая подзадача', completed: false, taskId: task.id }) //добавить taskId
        };
        fetch(apiUrlSubtasks, requestOptions)
            .then(resp => resp.json())
            .then(data => setSubtasks([...subtaskList, data]));
    };

    const SwitchSubTask = (id) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };
        subtaskList.forEach(e => {
            if(e.id === id){
                e.completed = !e.completed;
                requestOptions.body = JSON.stringify(e);
            }
        });
        fetch(apiUrlSubtasks + '/' + id, requestOptions)
            .then(() => getSubTasksList());
    };

    const UpdateSubTask = (id, newTitle) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };
        subtaskList.forEach(e => {
            if(e.id === id){
                e.title = newTitle;
                requestOptions.body = JSON.stringify(e);
            }
        });
        fetch(apiUrlSubtasks + '/' + id, requestOptions)
            .then(() => getSubTasksList());
    };

    

    const beginEditTitle = () => {
        if(task.completed) return;
        setTitleReadOnly(false);
        document.getElementById(titleEditId).focus();
    };

    const endEditTitle = (event) => {
        if(titleReadOnly) return;
        setTitleReadOnly(true);
        OnUpdate(task.id, event.target.value);
    }

    return(<div className="task-container__flex">
        <div className="task-container">
            <input type="checkbox" id={checkboxId} className="task-container-checkbox" readOnly={task.completed} defaultChecked={task.completed} onChange={()=>OnSwitch(task.id)}></input>
            <label htmlFor={checkboxId}></label>
            <input type="text" id={titleEditId} onBlur={endEditTitle} className="task-container-input" defaultValue={task.title} readOnly={titleReadOnly}></input>
            {!task.completed &&
                <>
                <button className="task-container-btn edit" disabled={task.completed} onClick={()=>beginEditTitle()}></button>
                <button className="task-container-btn delete" disabled={task.completed} onClick={() => OnDelete(task.id)}></button>
                <button className="task-container-btn subtask" disabled={task.completed} onClick={() => AddSubTask()}></button>
                </>
            }
        </div>
        {subtaskList && subtaskList.length > 0 && subtaskList.map(e => <Subtask key={e.id} task={e} parTaskCompleted={task.completed} OnUpdate={UpdateSubTask} OnSwitch={SwitchSubTask} OnDelete={RemoveSubTask}></Subtask>)}
    </div>);
}

export default Task;