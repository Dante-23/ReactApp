import React from 'react';
import { ListGroup } from 'react-bootstrap';
import TodoItem from './TodoItem';

const TodoList = ({ todos, completeTodo, removeTodo }) => (
  <ListGroup as="ol" numbered>
    {todos.map((todo, index) => (
      <TodoItem
        key={index}
        index={index}
        todo={todo}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />
    ))}
  </ListGroup>
);

export default TodoList;
