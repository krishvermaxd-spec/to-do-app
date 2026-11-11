import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const Task = () => {
  const [editingId, setEditingId] = useState(null)
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks")
    return saved ? JSON.parse(saved) : []
  })

  const doneCount = tasks.filter(item => item.isCompleted).length
  const total = tasks.length


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])


  const handleAdd = () => {
    if (!task.trim()) return
    if (editingId) {
      let newTasks = tasks.map(item => {
        return item.id === editingId ? { ...item, task: task } : item
      })
      setTasks(newTasks)
      setEditingId(null)
    }
    else {
      setTasks([...tasks, { id: uuidv4(), task, isCompleted: false }])
    }
    setTask("")

  }
  const handleChange = (e) => {
    setTask(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = tasks.findIndex(item => {
      return item.id === id;
    })
    let newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks)

  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd()
    }
  }



  const handleEdit = (e, id) => {
    let t = tasks.filter(i => i.id === id)
    setTask(t[0].task)
    setEditingId(id)

  }

  const handleDelete = (e, id) => {
    let newTasks = tasks.filter(item => {
      return item.id !== id
    });
    setTasks(newTasks)

    if (id === editingId) {
      setEditingId(null)
      setTask("")
    }

  }

  const today = new Date()

  const month = today.toLocaleDateString('en-IN', { month: 'short' })
  const day = today.getDate()
  const weekday = today.toLocaleDateString('en-IN', { weekday: 'long' })


  return (
    <div className='relative overflow-hidden container bg-white min-h-[60vh] md:min-h-[80vh] w-[95%] h-fit mx-auto rounded-2xl my-5 shadow-2xl md:w-3/4 lg:w-1/2 max-w-3xl sm:p-5'>
      <div className="flex items-center gap-3 m-3 p-2">
        <div className="w-14 overflow-hidden rounded-lg border border-slate-200 bg-white text-center shadow-sm">
          <div className="bg-blue-600 py-0.5 text-xs font-bold text-white">{month}</div>
          <div className="py-1 text-2xl font-bold text-slate-900">{day}</div>
        </div>
        <div>
          <h1 className="text-4xl font-bold">Today</h1>
          <p className="text-sm text-gray-600">{weekday}</p>
        </div>
      </div>

      <div className='flex gap-2 sm:gap-3 justify-center items-center my-3'>
        <input onChange={handleChange} onKeyDown={handleKeyDown} value={task} type='text' placeholder='Add a task' className='bg-white w-3/4 rounded-2xl p-1 border min-w-0'
        />
        <button onClick={handleAdd} className='bg-blue-500 w-fit h-fit rounded-full p-2 text-white font-extrabold cursor-pointer shrink-0 '><IoMdAdd /></button>
      </div>
      <div className='tasks mx-5 '>
        <h1 className='text-gray-500 font-bold text-2xl'>Your tasks</h1>
        {total > 0 && (
          <p className='text-sm text-gray-600'>{doneCount} of {total} done</p>
        )}
        {total > 0 && (
          <div className='my-2 h-2 rounded-full bg-gray-200'>
            <div
              className='h-2 rounded-full bg-blue-500 transition-all'
              style={{ width: `${(doneCount / total) * 100}%` }}
            />
          </div>
        )}

        {tasks.length === 0 && <div className='flex flex-col w-full my-4 items-center'>
          <img className='w-1/4 opacity-50 ' src='https://cdn-icons-png.flaticon.com/512/5058/5058446.png'></img>
        </div>}

        {tasks.map(item => (
          <div key={item.id} className='my-3 flex w-full items-center justify-between gap-2 rounded-sm border bg-yellow-300 p-2'>
            <div className='flex min-w-0 flex-1 items-center gap-4 font-semibold'>
              <input type='checkbox' onChange={handleCheckbox} checked={item.isCompleted} name={item.id} className='h-5 w-5 shrink-0 cursor-pointer accent-black' />
              <div className={`wrap-break-word ${item.isCompleted ? 'line-through text-gray-600' : ''}`}>{item.task}</div>
            </div>
            <div className='flex shrink-0 gap-3'>
              <button aria-label={`Edit ${item.task}`} onClick={(e) => handleEdit(e, item.id)} className='cursor-pointer rounded-sm bg-blue-500 p-1.5 text-white'><MdEdit /></button>
              <button aria-label={`Delete ${item.task}`} onClick={(e) => handleDelete(e, item.id)} className='cursor-pointer rounded-sm bg-blue-500 p-1.5 text-white'><MdDelete /></button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Task
