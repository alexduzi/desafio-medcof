import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { cleanTaskState, createTask, deleteTask, getTasks, updateTask } from '../slices/taskSlice';

const options = [
    { value: 0, label: 'Todas' },
    { value: 1, label: 'Concluídas' },
    { value: 2, label: 'Pendentes' },
  ];

function TasksEdit () {
    const [selectedOption, setSelectedOption] = useState<{ value: number; label: string; } | null>({ value: 0, label: 'Todas' });
    
    const [task, setTask] = useState<string | undefined>("");
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const taskObj = useAppSelector((state) => state.task?.tasks?.find((task) => task._id === id));

    const tasksState = useAppSelector((state) => state.task);

    const [taskDescription, setTaskDescription] = useState(taskObj?.description ?? "");

    function dismissError(event: React.MouseEvent<HTMLDivElement>) {
        dispatch(cleanTaskState()).unwrap();
    }

    const renderLoginError = () => {
        if (tasksState.error) {
            return (<div className="mb-3 alert alert-danger" onClick={dismissError}>
                        {tasksState.error}
                    </div>);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(updateTask({
            _id: taskObj?._id ?? '',
            description: taskDescription,
            status: taskObj?.status ?? 0,
            createdAt: taskObj?.createdAt ?? new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: taskObj?.userId ?? ''
        })).unwrap();
        navigate('/tasks');
    }

    const renderForm = () => {
        if (!taskObj) {
            return (<div className="mb-3 alert alert-danger">
                        <div>Tarefa não encontrada</div>
                        <Link to="/tasks">Voltar</Link>
                    </div>);
        }

        return (
            <form onSubmit={handleSubmit} className='row g-3'>
                <div className="col-md-12">
                    <label htmlFor="taskFormControlInput1" className="form-label">Tarefa</label>
                    <input
                        type="text"
                        className="form-control"
                        id="taskFormControlInput1"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                </div>
                <div className="col-md-12 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">Editar tarefa</button>
                </div>
                <Link to="/tasks">Voltar</Link>
            </form>
        );
    }

    return (
        <div className='container min-vh-100 d-flex flex-column justify-content-center align-items-center'>
            {renderForm()}
            {renderLoginError()}
        </div>
    );
}

export default TasksEdit;