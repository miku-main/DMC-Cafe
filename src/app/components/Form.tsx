"use client";
import * as React from 'react';
import styles from './Form.module.css';

interface FormProps {
    onAddTask: (task: { title: string; dueDate: string; priority: number }) => void;
}

function Form({ onAddTask }: FormProps) {
    const [title, setTitle] = React.useState<string>(""); // Initialize with empty string
    const [dueDate, setDueDate] = React.useState<string>(""); // Initialize with empty string
    const [priority, setPriority] = React.useState<number>(1); // Default priority is 1

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Check if title is not empty
        if (title.trim()) {
            onAddTask({ title, dueDate, priority });
            setTitle(""); // Clear the title input
            setDueDate(""); // Clear the due date input
            setPriority(1); // Reset priority to default
        } else {
            alert("Please enter a task title.");
        }
    };

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.heading}>Add a New Task</h2>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Task
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Enter task"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label className={styles.label}>
                    Due Date
                    <input
                        type="date"
                        className={styles.input}
                        value={dueDate || ""}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </label>
                <div className={styles.prioritySection}>
                    <span className={styles.label}>Priority</span>
                    <div className={styles.priorityOptions}>
                        {[1, 2, 3, 4].map((level) => (
                            <label key={level}>
                                <input
                                    type="radio"
                                    name="priority"
                                    value={level}
                                    checked={priority === level}
                                    onChange={() => setPriority(level)}
                                />
                                <span>{level}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <button type="submit" className={styles.submitButton}>Add Task</button>
            </form>
        </div>
    );
}

export default Form;