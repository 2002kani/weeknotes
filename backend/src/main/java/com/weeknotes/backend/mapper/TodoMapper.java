package com.weeknotes.backend.mapper;

import com.weeknotes.backend.dto.TodoDto;
import com.weeknotes.backend.entity.Todo;

public class TodoMapper {
    public static TodoDto mapToTodoDto(Todo todo){
        return new TodoDto(
                todo.getId(),
                todo.getDay(),
                todo.getTask()
        );
    }

    public static Todo mapToTodo(TodoDto todoDto){
        return new Todo(
                todoDto.getId(),
                todoDto.getDay(),
                todoDto.getTask()
        );
    }
}
