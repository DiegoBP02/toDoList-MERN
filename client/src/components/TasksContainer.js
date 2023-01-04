import { useEffect } from "react";
import { Loading, SingleTask } from ".";
import { useAppContext } from "../context/appContext";

const TasksContainer = () => {
  const { isLoading, getTasks, tasks } = useAppContext();

  useEffect(() => {
    getTasks();
  }, []);

  const categories = ["Task", "Date", "Urgency", "Action"];

  if (isLoading) {
    return <Loading center />;
  }

  if (tasks.length === 0) {
    return <h2>No tasks to display...</h2>;
  }

  return (
    <>
      <article className="tasks">
        {categories.map((category, index) => {
          return <p key={index}>{category}</p>;
        })}
      </article>
      <section className="tasks-container">
        {tasks.map((task) => {
          return <SingleTask key={task._id} {...task} />;
        })}
      </section>
    </>
  );
};
export default TasksContainer;
