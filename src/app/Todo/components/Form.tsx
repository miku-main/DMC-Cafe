import React, { useState } from "react";
import styles from "./Form.module.css";

interface Task {
    title: string;
    dueDate: string;
    priority: number;
    completed: boolean;
    imageUrl: string;
    userId: string;
}

interface FormProps {
    onAddTask: (task: Omit<Task, "_id">) => void; // Task without `_id`
    userId: string;
}

function Form({ onAddTask, userId }: FormProps) {
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState(1);
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onAddTask({
                title,
                dueDate,
                priority,
                completed: false,
                imageUrl,
                userId,
            });
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



