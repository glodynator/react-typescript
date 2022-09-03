import React, {useState, useRef, useEffect} from 'react';
import {Todo} from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

import './styles.scss'

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDone = (id: number) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleEdit = (todo: Todo) => {
    if (!edit && !todo.isDone) {
      setEdit(!edit)
    }
  }

  const handleEditSubmit = (event: React.FormEvent, id: number) => {
    event.preventDefault()
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, todo: editTodo } : todo))
    setEdit(false)
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  return (
      <form className='todos__single' onSubmit={(event) => handleEditSubmit(event, todo.id)}>
        {edit ? (
            <input
                type="text"
                value={editTodo}
                onChange={(event) => setEditTodo(event.target.value)}
                className='todos__single--text'
            />
        ) : (
            todo.isDone ? (
                  <s className='todos__single--text'>{todo.todo}</s>
              ) : (
                  <span className='todos__single--text'>{todo.todo}</span>
              )
        )}


        <div>
          <span className='icon' onClick={() => handleEdit(todo)}>
            <AiFillEdit />
          </span>
          <span className='icon' onClick={() => handleDelete(todo.id)}>
            <AiFillDelete />
          </span>
          <span className='icon' onClick={() => handleDone(todo.id)}>
            <MdDone />
          </span>
        </div>
      </form>
  );
};

export default SingleTodo;
