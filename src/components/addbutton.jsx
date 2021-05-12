function AddButton({OnClick}){
    return <button onClick={()=>OnClick()}>Добавить задачу</button>
}

export default AddButton;