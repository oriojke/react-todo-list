function AddButton({OnClick, ButtonText}){
    return <button className="add-btn" onClick={()=>OnClick()}>{ButtonText}</button>
}

export default AddButton;