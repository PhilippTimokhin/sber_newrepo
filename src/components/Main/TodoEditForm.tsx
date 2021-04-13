import React from "react";

interface EditProps {
    id: number;
    closeEdit: () => void;
    setEditingTask?: (task: string) => void;
    submitEditsTask: (id: number) => void;
    editingTask: string;
}
const TodoEditForm: React.FunctionComponent<EditProps> = ({
    id,
    closeEdit,
    setEditingTask,
    submitEditsTask,
    editingTask
}) => {
    const changeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditingTask(event.target.value);
    };
    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        submitEditsTask(id);
        closeEdit();
    };
    return (
        <form className="formEdit form--edit">
            <input
                name="age"
                placeholder="Body of your note..."
                className="formEdit_task"
                onChange={changeTask}
                value={editingTask}
            />
            <div className="formEdit__buttons">
                <button className="formEdit_s" onClick={handleSubmit}>
                    save
                </button>
                <button className="formEdit_c" onClick={closeEdit}>
                    cancel
                </button>
            </div>
        </form>
    );
};

export default TodoEditForm;
