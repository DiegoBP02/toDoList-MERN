import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import moment from "moment";
import { useAppContext } from "../context/appContext";

const SingleTask = ({ task, urgency, createdAt, _id }) => {
  const { setEditTask, deleteTask } = useAppContext();

  const firstLetter = task.charAt(0);

  let date = moment(createdAt);
  date = date.format("MMMM Do, YYYY");

  return (
    <article className="single-job">
      <span className="icon">{firstLetter}</span>
      <p>{task}</p>
      <p>{date}</p>
      <p className={`status ${urgency}`}>{urgency}</p>
      <div className="action-div">
        <span className="icon-add" onClick={() => setEditTask(_id)}>
          <AiFillEdit />
        </span>
        <span className="icon-delete" onClick={() => deleteTask(_id)}>
          <AiFillDelete />
        </span>
      </div>
    </article>
  );
};
export default SingleTask;
