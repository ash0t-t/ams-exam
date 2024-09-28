import { useAppDispatch } from "../app/hooks";
import { useForm } from "react-hook-form";
import { addTask } from "../tasks/tasks.slice";
import { useNavigate } from "react-router-dom";
import type { TaskFormData } from "../utils/types";

export const AddTask = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: TaskFormData) => {
    dispatch(addTask({
      id: Date.now().toString(),
      text: data.text,
      status: data.status,
      date: data.date,
    })).then(() => {
      reset(); 
      navigate('/');
    });
  };

  return (
    <>
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="text">Task Text</label>
          <input
            id="text"
            type="text"
            {...register("text", { required: "Task text is required" })}
            placeholder="Enter task title"
          />
          <select id="status" {...register("status")}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="onProgress">On Progress</option>
          </select>
          <input
            id="date"
            type="date"
            {...register("date", { required: "Task date is required" })}
          />
          {errors.text && <span>{errors.text.message}</span>}
          {errors.date && <span>{errors.date.message}</span>}
        </div>

        <button type="submit">Add Task</button>
      </form>
    </>
  );
};