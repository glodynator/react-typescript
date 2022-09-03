import React, {FormEvent, useRef} from 'react'
import './styles.scss'

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({todo, setTodo, handleAdd}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    handleAdd(event)
    inputRef.current?.blur()
  };

  return (
      <form className='input' onSubmit={onSubmit}>
        <input type="input"
               placeholder="Enter a task"
               className='input__box'
               ref={inputRef}
               value={todo}
               onChange={
                (event) => setTodo(event.target.value)
              }
        />
        <button className='input__submit' type='submit'>Go</button>
      </form>
  );
};

export default InputField;
