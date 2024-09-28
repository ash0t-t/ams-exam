import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTasks, filterTasksByProgress } from "./tasks.slice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export const Tasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.filteredTasks);
  const [progressFilter, setProgressFilter] = useState<"all" | "completed" | "incomplete">("all");

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value as "all" | "completed" | "incomplete";
    setProgressFilter(filter);
    dispatch(filterTasksByProgress(filter));
  };

  return (
    <>
      <h3>Tasks</h3>
      <Link to="/add-task">Add New Task</Link>
      <select value={progressFilter} onChange={handleFilterChange}>
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.completed ? "Completed" : "Incomplete"}</td>
              <td>
                <Link to={`/edit-task/${task.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};