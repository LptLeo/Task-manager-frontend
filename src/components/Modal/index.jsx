import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Modal.scss';
import { closeModal, selectTask, setUpdating } from '../../redux/modalSlice';
import { createTask, updateTask } from '../../redux/tasksSlice';

const initialState = {
  createdAt: '',
  description: '',
  title: '',
  _id: '',
};

const Modal = () => {
  const dispatch = useDispatch();
  const modalStats = useSelector((state) => state.modalStats.isOpen);
  const selectedTask = useSelector((state) => state.modalStats.selectedTask);
  const updateStats = useSelector((state) => state.modalStats.isUpdating);

  const [register, setRegister] = useState(initialState);

  useEffect(() => {
    if (modalStats) {
      setRegister({
        createdAt: selectedTask.createdAt ?? '',
        description: selectedTask.description ?? '',
        title: selectedTask.title ?? '',
        _id: selectedTask._id ?? '',
      });
    } else {
      setRegister(initialState);
    }
  }, [modalStats, selectedTask]);

  return (
    <>
      {modalStats && (
        <div className="modal-overlay d-flex w-100 h-100 position-fixed bg-secondary bg-opacity-50 z-1">
          <div className="add-modal bg-light rounded">
            <div className="top-modal d-flex justify-content-between border-bottom border-color-secondary py-1 px-2">
              <h4 className="m-0 p-2">{register.title || 'Nova tarefa'}</h4>
              <i
                className="bi bi-x-lg"
                onClick={() => {
                  dispatch(closeModal());
                  dispatch(selectTask({}));
                  dispatch(selectTask({}));
                }}
              ></i>
            </div>
            <div className="form-content px-3 py-2">
              <form className="w-75 mx-auto">
                <label className="form-label ps-1 mb-1">Nome</label>
                <input
                  onChange={(e) =>
                    setRegister({ ...register, title: e.target.value })
                  }
                  value={register.title}
                  type="text"
                  className="form-control mb-3"
                  placeholder="Nome"
                />
                <label className="form-label ps-1 mb-1">Descrição</label>
                <textarea
                  onChange={(e) =>
                    setRegister({ ...register, description: e.target.value })
                  }
                  value={register.description}
                  className="form-control mb-3"
                  rows="4"
                  placeholder="Descrição"
                />
              </form>
            </div>
            <div className="d-flex justify-content-end w-100 border-top border-color-secondary py-2 px-3">
              {updateStats ? (
                <button
                  onClick={() => {
                    dispatch(
                      updateTask({
                        id: register._id,
                        updatedData: {
                          createdAt: register.createdAt,
                          description: register.description,
                          title: register.title,
                        },
                      })
                    );
                    dispatch(closeModal());
                    dispatch(setUpdating(false));
                    setRegister(initialState);
                    dispatch(selectTask({}));
                  }}
                  type="button"
                  className="btn btn-success"
                >
                  Atualizar
                </button>
              ) : (
                <button
                  onClick={() => {
                    dispatch(
                      createTask({
                        description: register.description,
                        title: register.title,
                      })
                    );
                    dispatch(closeModal());
                    setRegister(initialState);
                    dispatch(selectTask({}));
                  }}
                  type="button"
                  className="btn btn-success"
                >
                  Registrar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
