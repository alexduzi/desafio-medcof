import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { cleanTaskState, createTask, getTasks } from '../slices/taskSlice';

const options = [
    { value: 0, label: 'Todas' },
    { value: 1, label: 'Concluídas' },
    { value: 2, label: 'Pendentes' },
  ];

function Tasks () {
    const [selectedOption, setSelectedOption] = useState<{ value: number; label: string; } | null>({ value: 0, label: 'Todas' });
    const [task, setTask] = useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const tasksState = useAppSelector((state) => state.task);

    useEffect(() => {
        if (tasksState.tasks?.length === 0) {
            console.log('getTasks');
            dispatch(getTasks({ status: 0 })).unwrap();
        }
        
      }, [dispatch, tasksState?.tasks?.length]);

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

    function renderTasks() {
        if (tasksState.tasks && tasksState.tasks.length > 0) {
            return tasksState.tasks.map((task) => {
                return (<li key={task._id} className="list-group-item">{task.description}</li>);
            });
        }

        return (<li className="list-group-item">Nenhuma tarefa encontrada</li>);
    }

    function addNewTask() {
        const dateNow = new Date().toISOString();
        dispatch(createTask({ description: task, status: 2, _id: '', createdAt: dateNow, updatedAt: dateNow, userId: '' })).unwrap();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (task !== "") {
            addNewTask();
        }
    }

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(options[+event.target.value]);
        dispatch(getTasks({ status: +event.target.value })).unwrap();
    }

    return (
        <div className='container min-vh-100 d-flex flex-column justify-content-center align-items-center'>
            <form onSubmit={handleSubmit} className='row g-3'>
                <div className="col-auto">
                    <label htmlFor="taskFormControlInput1" className="visually-hidden">Nova tarefa</label>
                    <input className="form-control" id="taskFormControlInput1" onChange={(e) => setTask(e.target.value)} />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary" onClick={addNewTask}>Adicionar Tarefa</button>
                </div>
            </form>
            
            <hr />

            <div className="col-auto mb-3">
                <label htmlFor="filterSelect" className="form-label">Filtrar Tarefas</label>
                <select className="form-select" id="filterSelect" onChange={handleFilterChange}>
                    {
                        options.map((option) => {
                            return (<option key={option.value} value={option.value}>{option.label}</option>);
                        })
                    }
                </select>
            </div>
            
            <div className="card w-100 mt-3">
                <div className="card-header">
                    Lista de Tarefas
                </div>
                <ul className="list-group list-group-flush">
                    {renderTasks()}
                </ul>
            </div>
            <hr />
            {renderLoginError()}
        </div>
    );
}

export default Tasks;