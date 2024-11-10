"use client";
import * as React from 'react';
import Todo from './components/Todo';
import Form from './components/Form';

interface Task {
    title: string;
    dueDate: string;
    priority: number;
    completed: boolean;
}

function Home() {
    const [showForm, setShowForm] = React.useState(false);
    const [tasks, setTasks] = React.useState<Task[]>([]);

    const handleAddTask = (task: Omit<Task, 'completed'>) => {
        setTasks([...tasks, { ...task, completed: false }]);
        setShowForm(false); // Return to the task list view
    };

    const handleToggleTask = (index: number) => {
        setTasks(tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleDeleteTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const handleButtonClick = () => {
        setShowForm(true); // Show the form to add a new task
    };

    return (
        <div>
            {showForm ? (
                <Form onAddTask={handleAddTask} />
            ) : (
                <Todo tasks={tasks} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} onButtonClick={handleButtonClick} />
            )}
        </div>
    );
}

export default Home;