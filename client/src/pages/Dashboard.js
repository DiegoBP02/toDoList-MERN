import { FormTasks, TasksContainer } from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
const Dashboard = () => {
  return (
    <Wrapper>
      <FormTasks />
      <TasksContainer />
    </Wrapper>
  );
};
export default Dashboard;
