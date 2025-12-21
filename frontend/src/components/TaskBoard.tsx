'use client'

import { Task } from '@/types/task'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

interface TaskBoardProps {
  tasks: Task[]
}

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'completed', title: 'Done' },
]

export default function TaskBoard({ tasks }: TaskBoardProps) {
  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status)
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    // TODO: Update task status via API
    console.log('Move task', result.draggableId, 'to', result.destination.droppableId)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-4 gap-4">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-4">{column.title}</h3>
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[200px] ${
                    snapshot.isDraggingOver ? 'bg-blue-50' : ''
                  }`}
                >
                  {getTasksByStatus(column.id).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-white p-3 rounded-lg shadow-sm mb-2 ${
                            snapshot.isDragging ? 'shadow-lg' : ''
                          }`}
                        >
                          <h4 className="font-medium text-sm mb-1">{task.title}</h4>
                          {task.priority && (
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                task.priority === 'high'
                                  ? 'bg-red-100 text-red-700'
                                  : task.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {task.priority}
                            </span>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}

