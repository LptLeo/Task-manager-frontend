import { useState } from "react";
import "./App.scss";
import Modal from "./components/Modal";
import TaskList from "./components/TaskList";
import { openModal } from "./redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  toggleSelectingStats,
  clearSelectedTasks,
  deleteTasks,
} from "./redux/tasksSlice";

function App() {
  const dispatch = useDispatch();
  const selecting = useSelector((state) => state.tasks.selectingStats);
  const selected = useSelector((state) => state.tasks.selectedTasks);

  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const activeModal = (value) => setShowModal(value);
  const handleSearchClick = () => dispatch(setSearch(searchValue));

  return (
    <>
      <Modal activatedModal={activeModal} showModal={showModal} />
      <div className="bg-container min-w-100 min-vh-100 bg-dark bg-gradient text-light">
        <div className="interface-container w-50 mx-auto">
          <h1 className="mx-auto w-100 text-center fw-bold">Task Manager</h1>
          <div className="interface w-75 mx-auto rounded">
            <header className="toolbar w-100 d-flex justify-content-center">
              <div className="d-flex w-100 mx-1">
                <input
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  value={searchValue}
                  className="form-control rounded-end-0"
                  type="text"
                  placeholder="Filtrar"
                />
                <button
                  onClick={() => {
                    handleSearchClick();
                  }}
                  className="btn btn-secondary rounded-start-0"
                  type="button"
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
              {selecting ? (
                <button
                  onClick={() => {
                    dispatch(deleteTasks(selected));
                    dispatch(toggleSelectingStats());
                  }}
                  className="btn btn-danger mx-1"
                  title="Deletar"
                  type="button"
                >
                  <i className="bi bi-trash"></i>
                </button>
              ) : (
                <button
                  onClick={() => dispatch(openModal())}
                  className="btn btn-success mx-1"
                  title="Adicionar"
                  type="button"
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
              )}
              <button
                onClick={() => {
                  dispatch(toggleSelectingStats());
                  !selecting && dispatch(clearSelectedTasks());
                }}
                className="btn btn-primary mx-1"
                title="Selecionar"
              >
                <i className="bi bi-check-square"></i>
              </button>
            </header>
            <TaskList />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
