"use client";
import * as React from "react";
import styles from "./Form.module.css";

interface FormProps {
    onAddTask: (task: { title: string; dueDate: string; priority: number; imageUrl: string; userId: string; completed: boolean }) => void;
    userId: string; // Add userId to associate tasks with the user
}

function Form({ onAddTask, userId }: FormProps) {
    const [title, setTitle] = React.useState<string>(""); // Initialize with an empty string
    const [dueDate, setDueDate] = React.useState<string>(""); // Initialize with an empty string
    const [priority, setPriority] = React.useState<number>(1); // Default priority is 1
    const [imageUrl, setImageUrl] = React.useState<string>(""); // New state for image URL

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            const newTask = { title, dueDate, priority, imageUrl, userId, completed: false }; // Add 'completed' property

            try {
                // Send task to the backend
                const response = await fetch("/api/tasks", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newTask),
                });

                if (response.ok) {
                    const savedTask = await response.json();
                    console.log("Task saved:", savedTask);
                    onAddTask(savedTask); // Add the task to the UI state
                } else {
                    console.error("Failed to save task");
                }
            } catch (error) {
                console.error("Error saving task:", error);
            }

            // Clear form fields
            setTitle("");
            setDueDate("");
            setPriority(1);
            setImageUrl("");
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
                <label className={styles.label}>
                    Image URL
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Enter image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
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
                <button type="submit" className={styles.submitButton}>
                    Add Task
                </button>
            </form>
        </div>
    );
}

export default Form;



