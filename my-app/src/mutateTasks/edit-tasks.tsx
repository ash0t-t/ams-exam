import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getTaskById, updateTask } from "../tasks/tasks.slice";

export const EditTask = () => {
  const { id } = useParams<{ id: string }>();
  const task = useAppSelector((state) => state.tasks.task);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState(task?.title || "");
  const [completed, setCompleted] = useState(task?.completed || false);

  useEffect(() => {
    if (id) {
      dispatch(getTaskById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCompleted(task.completed);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateTask({ id: id!, title, completed })).then(() => {
      navigate('/');
    });
  };

  return (
    <>
      <h3>Edit Task</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </>
  );
};