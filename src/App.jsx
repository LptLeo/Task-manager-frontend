import { useState } from 'react';
import './App.scss';
import Modal from './components/Modal';
import TaskList from './components/TaskList';
import { openModal } from './redux/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearch,
  toggleSelectingStats,
  clearSelectedTasks,
  deleteTasks,
  setFilter,
  selectAllTasks,
} from './redux/tasksSlice';

function App() {
  const dispatch = useDispatch();
  const selecting = useSelector((state) => state.tasks.selectingStats);
  const selected = useSelector((state) => state.tasks.selectedTasks);

  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  const activeModal = (value) => setShowModal(value);
  const handleSearchClick = () => dispatch(setSearch(searchValue));
  const handleClearSearch = () => {
    setSearchValue('');
    dispatch(setSearch(''));
  };

  return (
    <>
      <Modal activatedModal={activeModal} showModal={showModal} />
      <div className="bg-container min-w-100 min-vh-100 bg-dark bg-gradient text-light">
        <div className="interface-container mx-auto">
          <h1 className="mx-auto w-100 text-center fw-bold">Task Manager</h1>
          <div className="interface mx-auto rounded">
            <header className="toolbar w-100">
              <div className="d-flex w-100 mx-1 position-relative">
                <input
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  value={searchValue}
                  className="form-control rounded-end-0"
                  type="text"
                  placeholder="Filtrar"
                />
                {searchValue && (
                  <button
                    className="d-flex flex-column-reverse position-absolute bg-transparent border-0 end-0 top-50 bottom-50 me-5 mt-2 pt-1"
                    onClick={() => handleClearSearch()}
                    type="button"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
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
              <div className="w-100 d-flex justify-content-center align-items-center">
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
                {selecting ? (
                  <button
                    onClick={() => dispatch(selectAllTasks())}
                    className="select-all btn btn-light mx-1"
                    type="button"
                  >
                    Selecionar tudo
                  </button>
                ) : (
                  <select
                    className="form-select mx-1"
                    onChange={(e) => dispatch(setFilter(e.target.value))}
                    defaultValue="A-Z"
                  >
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                    <option value="Mais-recentes">Mais recentes</option>
                    <option value="Menos-recentes">Menos recentes</option>
                  </select>
                )}
              </div>
            </header>
            <TaskList />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
