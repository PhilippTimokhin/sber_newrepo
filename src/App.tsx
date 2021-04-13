import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import TodoForm from "components/Main/TodoForm";
import TodoList from "components/Main/TodoList";
import React, {useEffect, useState} from "react";
import {Switch, Route} from "react-router-dom";
import {ITodo} from "../interface";
import {v4 as uuidv4} from "uuid";

import {initialData} from "../initialData.d";

const App: React.FunctionComponent = () => {
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [todos, setTodos] = useState<ITodo[]>(initialData);
    const [search, setSearch] = useState<string>("");
    const [editingTitle, setEditingTitle] = useState<string>("");
    const [editingTask, setEditingTask] = useState<string>("");

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("todos") || "[]") as ITodo[];
        setTodos(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const filteredList = todos.filter((inner) =>
        inner.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    const removeHandler = (id: number) => {
        setTodos((prev) => prev.filter((inner) => inner.id !== id));
    };

    const addHandler = (title: string, task: string) => {
        const newTodo = {title: title, task: task, id: uuidv4(), completed: false};
        setTodos((prev) => [newTodo, ...prev]);
    };

    const toggleHandler = (id: number) => {
        setTodos((prev) =>
            prev.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        );
    };

    const submitEdits = (id: number) => {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.title = editingTitle;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const submitEditsTask = (id: number) => {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.task = editingTask;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <>
            <Header
                todos={filteredList}
                setModal={setModal}
                search={search}
                setSearch={setSearch}
            />
            <TodoList
                submitEdits={submitEdits}
                setEditingTitle={setEditingTitle}
                setEditingTask={setEditingTask}
                editingTitle={editingTitle}
                todos={filteredList}
                onDelete={removeHandler}
                onToggle={toggleHandler}
                active={modalEdit}
                setModal={setModalEdit}
                submitEditsTask={submitEditsTask}
                editingTask={editingTask}
            />
            <TodoForm active={modal} setModal={setModal} onAdd={addHandler} />
        </>
    );
};

export default App;
