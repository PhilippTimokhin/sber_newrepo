import {ITodo} from "interface";
import React, {useState} from "react";
import AlertDialog from "./AlertDialog";
import TodoEditForm from "./TodoEditForm";

interface ListProps {
    submitEdits?: (id: number) => void;
    submitEditsTask: (id: number) => void;
    setEditingTitle?: (title: string) => void;
    editingTitle: string;
    todos: ITodo[];
    onDelete(id: number): void;
    onToggle(id: number): void;
    active?: boolean;
    setModal?: (value: boolean) => void;
    setEditingTask?: (task: string) => void;
    editingTask: string;
}

const TodoList: React.FunctionComponent<ListProps> = ({
    setModal,
    todos,
    onDelete,
    onToggle,
    editingTitle,
    setEditingTitle,
    submitEdits,
    setEditingTask,
    submitEditsTask,
    editingTask
}) => {
    const [modalDelete, setModalDelete] = useState(false);
    const [reverse, setReverse] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

    const open = () => setShowModal(true);
    const close = () => setShowModal(false);

    const openEdit = () => setShowModalEdit(true);
    const closeEdit = () => setShowModalEdit(false);

    const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditingTitle(event.target.value);
    };
    const enabled = editingTitle.length > 3;
    return (
        <div>
            {todos.map((inner, index) => (
                <section key={inner.id} className="list list--wrapper">
                    {showModalEdit && (
                        <TodoEditForm
                            closeEdit={closeEdit}
                            id={inner.id}
                            setEditingTask={setEditingTask}
                            submitEditsTask={submitEditsTask}
                            editingTask={editingTask}
                        />
                    )}
                    {showModal && (
                        <AlertDialog
                            close={close}
                            onDelete={onDelete}
                            id={inner.id}
                            title={inner.title}
                        />
                    )}
                    <div className="todo list__todo">
                        {reverse ? (
                            <div className="todoEdit__header">
                                <input
                                    name="name"
                                    value={editingTitle}
                                    onChange={changeTitle}
                                    placeholder="Name of your note..."
                                    type="text"
                                    className="todoEdit__name"
                                />
                                <button
                                    className="todoEdit__ok"
                                    onClick={() => {
                                        submitEdits(inner.id);
                                        setReverse(!reverse);
                                    }}
                                    disabled={!enabled}
                                >
                                    ✔️
                                </button>
                                <button
                                    className="todoEdit__cancel"
                                    onClick={() => setReverse(!reverse)}
                                >
                                    ❌
                                </button>
                            </div>
                        ) : (
                            <div className="todo__header">
                                <span className="todo__title">{inner.title}</span>
                                <button
                                    className="todoEdit__edit"
                                    onClick={() => setReverse(!reverse)}
                                >
                                    🖊️
                                </button>
                            </div>
                        )}

                        <div className="todo__body">
                            <input
                                type="checkbox"
                                checked={inner.completed}
                                className="todo__completed"
                                onChange={onToggle.bind(null, inner.id)}
                            />
                            <span className="todo__task">{inner.task}</span>
                        </div>
                        <div className="todo__buttons">
                            <button className="button__delete" onClick={open}>
                                delete
                            </button>
                            <button className="button__edit" onClick={openEdit}>
                                edit
                            </button>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default TodoList;
