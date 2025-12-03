package com.weeknotes.backend.service.Impl;

import com.weeknotes.backend.dto.TodoDto;
import com.weeknotes.backend.entity.Todo;
import com.weeknotes.backend.exception.ResourceNotFoundException;
import com.weeknotes.backend.mapper.TodoMapper;
import com.weeknotes.backend.repository.TodoRepository;
import com.weeknotes.backend.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {
    private TodoRepository todoRepository;

    @Override
    public List<TodoDto> getAllTodos(){
        List<Todo> todos = todoRepository.findAll();
        return todos.stream()
                .map(TodoMapper::mapToTodoDto)
                .collect(Collectors.toList());
    }

    @Override
    public TodoDto getTodoById(Long todoId){
       Todo  todoToFind = todoRepository.findById(todoId)
               .orElseThrow(() -> new ResourceNotFoundException("Employee with ID " + todoId + " not found."));
       return TodoMapper.mapToTodoDto(todoToFind);
    }

    @Override
    public TodoDto createTodo(TodoDto todoDto) {
        Todo todo = TodoMapper.mapToTodo(todoDto); //Map to Entity for Repo
        Todo savedTodo = todoRepository.save(todo);
        return TodoMapper.mapToTodoDto(savedTodo); //Map it back to give out dto
    }

    @Override
    public TodoDto updateTodo(Long todoId, TodoDto updatedTodo){
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee with ID " + todoId + " not found."));

        todo.setDay(updatedTodo.getDay());
        todo.setTask(updatedTodo.getTask());

        Todo updatedTodoObj = todoRepository.save(todo);
        return TodoMapper.mapToTodoDto(updatedTodoObj);
    }

    @Override
    public void deleteTodoById(Long todoId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee with ID \" + todoId + \" not found."));

        todoRepository.deleteById(todoId);
    }
}
