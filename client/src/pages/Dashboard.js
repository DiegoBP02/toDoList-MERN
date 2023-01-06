import { useEffect, useState } from "react";
import { FormTasks, Loading, TasksContainer } from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import { useAppContext } from "../context/appContext";

const Dashboard = () => {
  const { getTasks, page } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks().then(() => {
      setLoading(false);
    });
  }, [page]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <FormTasks />
      <TasksContainer />
    </Wrapper>
  );
};
export default Dashboard;
