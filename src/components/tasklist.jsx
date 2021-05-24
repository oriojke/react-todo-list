import { useEffect, useState } from "react";
import AddButton from "./addbutton";
import Task from "./task";
import '../css/tasklist.css'

function TaskList({taskList}){
    const [todoList, changeList] = useState(taskList);

    const apiUrl = 'http://185.246.66.84:3000/ndidyk/tasks';
    const apiUrlSubtasks = 'http://185.246.66.84:3000/ndidyk/subtasks';

    useEffect(()=>{
        getTasksList();
      }, []);

      
    const getTasksList = () => {
        fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => changeList(data));
    };

    const RemoveTask = (id) => {
        const requestOptions = {
            method: 'DELETE'
        };
        fetch(apiUrl + '/' + id, requestOptions)
            .then(() => getTasksList());
    };

    const AddTask = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Новая задача', completed: false })
        };
        fetch(apiUrl, requestOptions)
            .then(resp => resp.json())
            .then(data => changeList([...todoList, data]));
    };

    const FinishSubtasks = (taskId) => {
        fetch(apiUrlSubtasks + '?taskId=' + taskId)
            .then((res) => res.json())
            .then((data) => {
                if(data.length === 0) getTasksList();
                data.forEach(e => {
                    const requestOptions = {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                    };
                    e.completed = true;
                    requestOptions.body = JSON.stringify(e);
                    fetch(apiUrlSubtasks + '/' + e.id, requestOptions)
                        .then(() => getTasksList());
                });
            })
    };

    const SwitchTask = (id) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };
        todoList.forEach(e => {
            if(e.id === id){
                e.completed = !e.completed;
                requestOptions.body = JSON.stringify(e);
            }
        });
        fetch(apiUrl + '/' + id, requestOptions)
            .then(() => FinishSubtasks(id));
    };

    const UpdateTask = (id, newTitle) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };
        todoList.forEach(e => {
            if(e.id === id){
                e.title = newTitle;
                requestOptions.body = JSON.stringify(e);
            }
        });
        fetch(apiUrl + '/' + id, requestOptions)
            .then(() => getTasksList());
    };

    function LoadingView(){
        return <div className="tasklist">Подождите, идет загрузка данных...</div>;
    }

    function ReadyView(){
        return <div className="tasklist">
        <AddButton OnClick={AddTask} ButtonText="Добавить задачу"></AddButton>
            {todoList.filter(e => e.completed === false).map(elem => 
                <Task key={elem.id} task={elem} OnDelete={RemoveTask} OnUpdate={UpdateTask} OnSwitch={SwitchTask}></Task>
            )}
            {todoList.filter(e => e.completed === true).length > 0 && 
                <div className="finished-banner">Завершенные задачи</div>
            }
            {todoList.filter(e => e.completed === true).map(elem => 
                <Task key={elem.id} task={elem} OnDelete={RemoveTask} OnUpdate={UpdateTask} OnSwitch={SwitchTask}></Task>
            )}
    </div>
    }

    return todoList.length > 0 ? ReadyView() : LoadingView();
}


export default TaskList; 