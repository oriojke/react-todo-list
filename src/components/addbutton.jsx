function AddButton({OnClick}){
    return <button className="add-btn" onClick={()=>OnClick()}>Добавить задачу</button>
}

export default AddButton;