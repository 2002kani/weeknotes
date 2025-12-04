package com.weeknotes.backend.mapper;

import com.weeknotes.backend.dto.TodoDto;
import com.weeknotes.backend.entity.Todo;

public class TodoMapper {
    public static TodoDto mapToTodoDto(Todo todo){
        return new TodoDto(
                todo.getId(),
                todo.getDate(),
                todo.getTask(),
                todo.isCompleted()
        );
    }

    public static Todo mapToTodo(TodoDto todoDto){
        return new Todo(
                todoDto.getId(),
                todoDto.getDate(),
                todoDto.getTask(),
                todoDto.isCompleted()
        );
    }
}
