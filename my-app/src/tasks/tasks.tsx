import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTasks, filterTasksByProgress } from "./tasks.slice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export const Tasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.filteredTasks);
  const [progressFilter, setProgressFilter] = useState<"pending" | "completed" | "onProgress" | "all">("all");
  const [count, setCount] = useState(tasks.length || 0);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  useEffect(() => {
    setCount(tasks.length);
  }, [tasks.length]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value as "pending" | "completed" | "onProgress";
    setProgressFilter(filter);
    dispatch(filterTasksByProgress(filter));
  };

  return (
    <>
      <h3>Tasks</h3>
      <Link to="/add">Add New Task</Link>
      <h1>{count} tasks</h1>
      <select value={progressFilter} onChange={handleFilterChange}>
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="onProgress">On progress</option>
        <option value="pending">Pending</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Date</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.text}</td>
              <td>{task.status}</td>
              <td>{task.date}</td>
              <td>
                <Link to={`/edit/${task.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};