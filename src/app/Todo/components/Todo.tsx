"use client";
import * as React from 'react';
import styles from './Todo.module.css';

interface Task {
    title: string;
    dueDate: string;
    priority: number;
    completed: boolean;
    imageUrl: string; // New property for image URL
}

interface TodoProps {
    tasks: Task[];
    onToggleTask: (index: number) => void;
    onDeleteTask: (index: number) => void;
    onButtonClick: () => void;
}

function Todo({ tasks, onToggleTask, onDeleteTask, onButtonClick }: TodoProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.headerContainer}>
                <h2 className={styles.heading}>To Do List</h2>
                <button className={styles.addButton} onClick={onButtonClick} aria-label="Add Task">+</button>
            </div>
            <div className={styles.taskList}>
                {tasks.map((task, index) => (
                    <div
                        key={index}
                        className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggleTask(index)}
                            className={styles.checkbox}
                        />
                        {task.imageUrl && (
                            <img src={task.imageUrl} alt={task.title} className={styles.taskImage} />
                        )}
                        <div className={styles.taskDetails}>
                            <span className={styles.taskTitle}>{task.title}</span>
                            {task.dueDate && (
                                <span className={styles.taskDueDate}>Due: {task.dueDate}</span>
                            )}
                            <span className={styles.taskPriority}>Priority: {task.priority}</span>
                        </div>
                        <button
                            className={styles.deleteButton}
                            onClick={() => onDeleteTask(index)}
                            aria-label="Delete Task"
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todo;