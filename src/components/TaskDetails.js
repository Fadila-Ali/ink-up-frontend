import React from 'react'
import { DeleteTask } from './DeleteTask'
import { ViewTask } from './ViewTask'
import { EditTask } from './EditTask'

export const TaskDetails = () => {
  return (
    <div>
        <ViewTask/>
        <DeleteTask/>
        <EditTask/>
    </div>
  )
}
