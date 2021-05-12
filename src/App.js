import { useEffect, useState } from "react";
import TaskList from "./components/tasklist";
import Wrapper from "./components/wrapper";



function App() {
  /*const TaskWrapper = Wrapper(TaskList);
  const [appState, setAppState] = useState({
    loading: false,
    taskList: null
  });

  useEffect(()=>{
    setAppState({ loading: true });
    const apiUrl = 'http://185.246.66.84:3000/ndidyk/tasks';
    fetch(apiUrl)
      .then((res) => JSON.parse(res))
      .then((_taskList) => {console.log(_taskList); setAppState({loading: false, taskList: _taskList});});
  }, [setAppState]);

  return (
    <TaskWrapper isLoading={appState.loading} taskList={appState.taskList}></TaskWrapper>
  );*/
  var tskString = '[{"id": 1,"sequence": 1,"title": "Task 1","completed": true},{"completed": false,"title": "Task 2","id": 2,"sequence": 2},{    "completed": false,"title": "Task 3","id": 3,"sequence": 3},  {'+
    '"id": 4},{"title": "Task 63","sequence": 5,"completed": false,"id": 5},[{"id": 1,"sequence": 1,"title": "Task 1","completed": true},{"completed": false,"title": "Task 2","id": 2,'+
    '"sequence": 2},{"completed": false,"title": "Task 3","id": 3,"sequence": 3}],[{"id": 1,"sequence": 1,"title": "Task 1 Changed","completed": true},{"completed": false,"title": "Task 2","id": 2,'+
    '"sequence": 2},{"completed": false,"title": "Task 3","id": 3,"sequence": 3}],[{"id": 1,"sequence": 1,"title": "Task 1 Changed","completed": true},{"completed": true,"title": "Task 2","id": 2,'+
    '"sequence": 2},{"completed": false,"title": "Task 3","id": 3,"sequence": 3}]]';
  //GET
  //POST - новый объект без id
  
  return (
    <TaskList taskList={JSON.parse(tskString).sort((a, b) => {
        return a.sequence > b.sequence ? 1 : -1;
    })}></TaskList>
  );
}

export default App;
