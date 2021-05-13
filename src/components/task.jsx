import { nanoid } from 'nanoid';
import { useState } from 'react';
import '../css/task.css'

function Task({task, OnDelete, OnUpdate, OnSwitch}){

    const titleEditId = nanoid();
    const checkboxId = 'chbx' + nanoid();
    
    const [titleReadOnly, setTitleReadOnly] = useState(true);

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
                </>
            }
            {task.completed &&
                <>
                <button className="task-container-btn restore" disabled={task.completed} onClick={()=>OnSwitch(task.id)}></button>
                </>
            }
        </div>
    </div>);
}

export default Task;