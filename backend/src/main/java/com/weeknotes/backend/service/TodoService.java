package com.weeknotes.backend.service;

import com.weeknotes.backend.dto.TodoDto;

public interface TodoService {
    TodoDto createTodo(TodoDto todoDto);
}
