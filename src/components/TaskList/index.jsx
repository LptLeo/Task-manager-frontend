import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  deleteTask,
  getTasks,
  removeTask,
} from '../../redux/tasksSlice';
import './TaskList.scss';
import { openModal, selectTask, setUpdating } from '../../redux/modalSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasksData, status, error } = useSelector((state) => state.tasks);
  const search = useSelector((state) => state.tasks.search);
  const selecting = useSelector((state) => state.tasks.selectingStats);
  const selected = useSelector((state) => state.tasks.selectedTasks);
  const filter = useSelector((state) => state.tasks.filter);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  function handleFilterTasks() {
    switch (filter) {
      case 'Z-A':
        return tasksData
          .filter((task) => task.title.toLowerCase().includes(search))
          .sort((a, b) => b.title.localeCompare(a.title));
      case 'Mais-recentes':
        return tasksData
          .filter((task) => task.title.toLowerCase().includes(search))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'Menos-recentes':
        return tasksData
          .filter((task) => task.title.toLowerCase().includes(search))
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      default:
        return tasksData
          .filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  if (status === 'loading') return <h4>Carregando...</h4>;
  if (status === 'failed') return <h4>Erro: {error}</h4>;

  return (
    <div className="task-list mt-3 text-black">
      {tasksData.length === 0 ? (
        <h4>Nenhuma tarefa encontrada</h4>
      ) : (
        handleFilterTasks().map((task) => (
          <div key={task._id} className="task-container d-flex">
            <div className="task rounded-start-2 bg-light w-100">
              <h4>{task.title}</h4>
              <span>{task.description}</span>
            </div>
            <div className="d-flex flex-column">
              {selecting ? (
                <button
                  className="btn btn-secondary rounded-circle rounded-start-0 h-100"
                  title="Deletar"
                  type="button"
                >
                  {selected.includes(task._id) ? (
                    <i
                      onClick={() => {
                        dispatch(removeTask(task._id));
                      }}
                      className="bi bi-check-square"
                    ></i>
                  ) : (
                    <i
                      onClick={() => {
                        dispatch(addTask(task._id));
                      }}
                      className="bi bi-square"
                    ></i>
                  )}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => dispatch(deleteTask(task._id))}
                    className="btn btn-danger rounded-circle rounded-start-0 rounded-bottom-0 h-50"
                    title="Deletar"
                    type="button"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button
                    onClick={() => {
                      dispatch(selectTask(task));
                      dispatch(openModal());
                      dispatch(setUpdating(true));
                    }}
                    className="btn btn-secondary rounded-circle rounded-start-0 rounded-top-0 h-50"
                    title="Editar"
                    type="button"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
