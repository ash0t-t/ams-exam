import { useAppDispatch } from "../app/hooks";
import { useForm } from "react-hook-form";
import { addTask } from "../tasks/tasks.slice";
import { useNavigate } from "react-router-dom";

interface TaskFormData {
  title: string;
}

export const AddTask = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: TaskFormData) => {
    dispatch(addTask({
      title: data.title, completed: false,
      id: Date.now().toString(),
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
          <label htmlFor="title">Task Title</label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "Task title is required" })}
            placeholder="Enter task title"
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <button type="submit">Add Task</button>
      </form>
    </>
  );
};