import { InTask } from '@/types/tasks'
import React from 'react'
import Tasks from './Tasks'

interface TodoListProps {
  tasks: InTask[]
}

const TodoList: React.FC<TodoListProps> = ({tasks}) => {
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        {/* head */}
        <thead>
            <tr>
                <th>Tasks</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {tasks.map(tasks => (
            <Tasks key={tasks.id} task={tasks}/>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoList
