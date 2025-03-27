"use client";

import { InTask } from '@/types/tasks';
import React, { FormEventHandler, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { deleteTodo, editTodo } from '@/api';

interface TaskProps {
    task: InTask
}

const Tasks: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text)

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.id,
            text: taskToEdit
        })
        setOpenModalEdit(false);
        router.refresh();
    }

    const handleDeleteTodo = async (id: string) => {
        await deleteTodo(id);
        setOpenModalDelete(false);
        router.refresh()
    }

    return (
        <tr key={task.id}>
            <td className='w-full'>{task.text}</td>
            <td className='flex gap-5'>
                {/* Edit Data */}
                <FiEdit onClick={() => setOpenModalEdit(true)}
                    cursor='pointer' className='text-blue-500' size={25}
                />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className='font-bold text-lg'>Edit Task</h3>
                        <div className='modal-action'>
                            <input
                                value={taskToEdit}
                                onChange={e => setTaskToEdit(e.target.value)}
                                type="text"
                                placeholder="Type here"
                                className="input input-border w-full"
                            />
                            <button type='submit' className='btn'>Submit</button>
                        </div>
                    </form>
                </Modal>
                {/* Delete Data */}
                <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor='pointer' className='text-red-500' size={25} />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <h3 className='text-lg'>Are You Sure?</h3>
                    <div className='modal-action'>
                        <button
                            className='btn'
                            onClick={() => handleDeleteTodo(task.id)}
                        >
                            Yes
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    );
}

export default Tasks;
