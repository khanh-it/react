import PropTypes from 'prop-types';
import Todo from './Todo.js';

/**
 * 
 * @component
 * @param {object} props 
 * @returns 
 */
export default function TodoList({
    // Events
    onTodoClick,
    // Data
    todos = []
}) {
    return <div>
        <h2>Todo List:</h2>
        <ul>{todos.map((todo, index) => {
            return <Todo key={todo.id} {...todo} onClick={e => onTodoClick(todo.id)} />
        })}</ul>
    </div>;
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      done: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func
}
