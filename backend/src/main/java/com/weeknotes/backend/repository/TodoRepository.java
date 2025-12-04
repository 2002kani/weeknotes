package com.weeknotes.backend.repository;

import com.weeknotes.backend.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByDateBetweenOrderByDateAsc(LocalDate startDate, LocalDate endDate);
}
