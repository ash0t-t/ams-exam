import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { deleteTask, getTaskById, updateTask } from "../tasks/tasks.slice"

export const EditTask = () => {
  const { id } = useParams<{ id: string }>()
  const task = useAppSelector(state => state.tasks.task)
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [text, setTitle] = useState(task?.text || "")
  const [status, setStatus] = useState(task?.status || "pending")
  const [date, setDate] = useState(task?.date || "1970-01-01")

  useEffect(() => {
    if (!tasks.find(elm => elm.id === id)) {
      navigate('/');
    } else if (id) {
      dispatch(getTaskById(id))
    }
  }, [dispatch, id, navigate, tasks])

  useEffect(() => {
    if (task) {
      setTitle(task.text)
      setStatus(task.status)
      setDate(task.date)
    }
  }, [task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(updateTask({ id: id!, text, status, date })).then(() => {
      navigate("/")
    })
  }

  const handleDelete = () => {
    dispatch(deleteTask(id!)).then(() => {
      navigate("/")
    })
  }

  return (
    <>
      <h3>Edit Task</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter task text"
          required
        />
        <select onChange={e => setStatus(e.target.value)} value={status}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="onProgress">On Progress</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          placeholder="Enter task date"
          required
        />
        <button type="submit">Save Changes</button>
      </form>
      <button onClick={handleDelete}>Delete Task</button>
    </>
  )
}
