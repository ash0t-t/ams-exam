import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { Tasks } from "./tasks/tasks"
import { EditTask } from "./mutateTasks/edit-tasks"
import { AddTask } from "./mutateTasks/add-tasks"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

const container = document.getElementById("root")

const router = createBrowserRouter([
  {
    path: "/",
    element: <Tasks />,
  },
  {
    path: "/add",
    element: <AddTask />,
  },
  {
    path: "/edit/:id",
    element: <EditTask />,
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
