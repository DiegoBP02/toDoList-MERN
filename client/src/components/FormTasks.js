import { Alert, FormRow, FormRowSelect } from "../components";
import { useAppContext } from "../context/appContext";

const FormTasks = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    task,
    taskUrgency,
    taskUrgencyOptions,
    handleChange,
    isLoading,
    createTask,
    editTask,
    getTasks,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task || !taskUrgency) {
      displayAlert();
      return;
    }

    if (isEditing) {
      editTask();
      return;
    }

    createTask();
    getTasks();
  };

  const handleInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <section className="form-container">
      {showAlert && <Alert />}
      <form action="submit" className="form" onSubmit={handleSubmit}>
        <FormRow
          type="text"
          name="task"
          value={task}
          handleChange={handleInput}
          noLabel
        />
        <FormRowSelect
          name="taskUrgency"
          value={taskUrgency}
          handleChange={handleInput}
          list={taskUrgencyOptions}
          noLabel
        />
        <button className="btn btn-hero btn-add" type="submit">
          {isLoading ? "Loading..." : isEditing ? "Edit" : "Add task"}
        </button>
      </form>
    </section>
  );
};

export default FormTasks;
