function Wrapper(Component){
    return function TaskListWrapper({isLoading, ...props}){
        if(!isLoading) return <Component {...props} />;
        return <div>Подождите, идет загрузка списка задач</div>;
    }
   /* const [taskList, setTaskList] = useState([]);

    fetch('http://185.246.66.84:3000/ndidyk/tasks')
        .then((res) => {
            alert(234);
            setTaskList(JSON.parse(res));
        });

    function emptyList(){
        return <div>Подождите, идет загрузка списка задач</div>
    }

    function nonEmptyList(){
        return <TaskList taskList={taskList.sort((a, b) => {
            return a.sequence > b.sequence ? 1 : -1;
        })}></TaskList>
    }

    return taskList.length === 0 ? emptyList() : nonEmptyList();*/
}

export default Wrapper;