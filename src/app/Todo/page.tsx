"use client";
import * as React from "react";
import { useSession } from "next-auth/react"; // Import to get the logged-in user's session
import Todo from "./components/Todo";
import Form from "./components/Form";

interface Task {
    title: string;
    dueDate: string;
    priority: number;
    completed: boolean;
    imageUrl: string;
    userId: string; // Include userId to associate tasks with the logged-in user
}

function Home() {
    const { data: session } = useSession(); // Get the logged-in user's session
    const [showForm, setShowForm] = React.useState(false);
    const [tasks, setTasks] = React.useState<Task[]>([]); // Initialize with an empty array

    const fetchTasks = async () => {
        if (!session?.user?.id) return; // Only fetch tasks if the user is logged in
        try {
            const response = await fetch(`/api/tasks?userId=${session.user.id}`);
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
        fetchTasks(); // Fetch tasks on initial render
    }, [session]);

    const handleAddTask = (task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task]); // Add the task with the 'completed' property
        setShowForm(false); // Return to the task list view
    };

    const handleToggleTask = (index: number) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const handleButtonClick = () => {
        setShowForm(true); // Show the form to add a new task
    };

    if (!session) {
        return <div>Please log in to manage your tasks.</div>;
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

