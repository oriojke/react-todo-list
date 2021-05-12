import { nanoid } from "nanoid";
import { useState } from "react";
import AddButton from "./addbutton";
import Task from "./task";
import '../css/tasklist.css'

function TaskList({taskList}){

    const [todoList, changeList] = useState(taskList);

    const RemoveTask = (id) => (
        changeList(todoList.filter((e) =>  e.id !== id))
    );

    const AddTask = () => (
        changeList(
            [...todoList,
            {
                id: nanoid(),
                title: 'Новая задача',
                completed: false
            }]
        )
    );

    const SwitchTask = (id) => (
        changeList(todoList.map(e => e.id === id ? {...e, completed : !e.completed} : e))
    );

    const UpdateTask = (id, newTitle) => {
        changeList(todoList.map(e => e.id === id ? {...e, title : newTitle} : e));
    };

    return <div className="tasklist">
        <AddButton OnClick={AddTask}></AddButton>
            {todoList.filter(e => e.completed === false).map(elem => 
                <Task key={elem.id} task={elem} OnDelete={RemoveTask} OnUpdate={UpdateTask} OnSwitch={SwitchTask}></Task>
            )}
            <div>Завершенные задачи</div>
            {todoList.filter(e => e.completed === true).map(elem => 
                <Task key={elem.id} task={elem} OnDelete={RemoveTask} OnUpdate={UpdateTask} OnSwitch={SwitchTask}></Task>
            )}
    </div>
}


export default TaskList; 