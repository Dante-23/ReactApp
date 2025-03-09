import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

const TodoItem = ({ todo, index, completeTodo, removeTodo }) => (
  <ListGroup.Item
    as="li"
    className={`d-flex justify-content-between align-items-center ${todo.isCompleted ? 'bg-light' : ''}`}
  >
    <span
      style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
      onClick={() => completeTodo(index)}
    >
      {todo.text}
    </span>
    <Button variant="danger" size="sm" onClick={() => removeTodo(index)}>
      Delete
    </Button>
  </ListGroup.Item>
);

export default TodoItem;
