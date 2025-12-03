package com.weeknotes.backend.service;

import com.weeknotes.backend.dto.TodoDto;

import java.util.List;

public interface TodoService {
    List<TodoDto> getAllTodos();
    TodoDto getTodoById(Long id);
    TodoDto createTodo(TodoDto todoDto);
    TodoDto updateTodo(Long todoId, TodoDto updatedTodo);
    void deleteTodoById(Long id);
}
