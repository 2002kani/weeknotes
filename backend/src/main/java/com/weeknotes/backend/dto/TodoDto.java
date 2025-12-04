package com.weeknotes.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TodoDto {
    private Long id;
    private LocalDate date;
    private String task;
    private boolean completed;
}
