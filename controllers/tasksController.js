import Task from "../Models/TaskSchema.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createTask = async (req, res) => {
  const { task } = req.body;
  if (!task) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user.userId;
  const taskCreated = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json(taskCreated);
};

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ tasks, totalTasks: tasks.length, numOfPages: 1 });
};

const updateTask = async (req, res) => {
  const { id: taskId } = req.params;
  const { task, urgency } = req.body;

  if (!task || !urgency) {
    throw new BadRequestError("Please provide all values!");
  }

  const taskUpdate = await Task.findOne({ _id: taskId });
  if (!taskUpdate) {
    throw new NotFoundError(`No task with id: ${taskId}`);
  }

  checkPermissions(req.user, taskUpdate.createdBy);

  const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedTask });
};

const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    throw new NotFoundError(`No task with id: ${taskId}`);
  }

  checkPermissions(req.user, task.createdBy);

  await task.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Task removed!" });
};

export { createTask, deleteTask, getAllTasks, updateTask };
