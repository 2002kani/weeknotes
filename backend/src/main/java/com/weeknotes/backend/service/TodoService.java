package com.weeknotes.backend.service;

import com.weeknotes.backend.dto.TodoDto;

public interface TodoService {
    TodoDto getTodoById(Long id);
    TodoDto createTodo(TodoDto todoDto);
}
