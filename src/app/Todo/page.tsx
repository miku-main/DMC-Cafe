"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import Login from "./components/Login"

interface Task {
    _id: string;
    title: string;
    dueDate: string;
    priority: number;
    completed: boolean;
    imageUrl: string;
    userId: string;
}


function Home() {
    const { data: session } = useSession();
    const [showForm, setShowForm] = React.useState(false);
    const [tasks, setTasks] = React.useState<Task[]>([]);

    const fetchTasks = async () => {
        if (!session?.user?.id) return;
        try {
            const response = await fetch("/api/tasks");
            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            } else {
                console.error("Failed to fetch tasks");
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    React.useEffect(() => {
        if (session) fetchTasks();
    }, [session]);

    const handleAddTask = async (task: Omit<Task, "_id">) => {
        try {
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });
            if (response.ok) {
                const savedTask = await response.json();
                setTasks((prevTasks) => [...prevTasks, savedTask]);
            } else {
                console.error("Failed to add task");
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleToggleTask = async (index: number) => {
        const updatedTask = { ...tasks[index], completed: !tasks[index].completed };
        try {
            const response = await fetch(`/api/tasks/${updatedTask._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: updatedTask.completed }),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setTasks((prevTasks) =>
                    prevTasks.map((task, i) => (i === index ? updatedData : task))
                );
            } else {
                console.error("Failed to update task");
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDeleteTask = async (index: number) => {
        const taskToDelete = tasks[index];
        try {
            const response = await fetch(`/api/tasks/${taskToDelete._id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log("Task deleted successfully");
                setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
            } else {
                const error = await response.json();
                console.error("Failed to delete task:", error.message);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleButtonClick = () => {
        setShowForm(true);
    };

    if (!session) {
        return <div> <Login /> </div>;
    }

    return (
        <div>
            {showForm ? (
                <Form onAddTask={handleAddTask} userId={session.user.id} />
            ) : (
                <Todo
                    tasks={tasks}
                    onToggleTask={handleToggleTask}
                    onDeleteTask={handleDeleteTask}
                    onButtonClick={handleButtonClick}
                />
            )}
        </div>
    );
}

export default Home;


