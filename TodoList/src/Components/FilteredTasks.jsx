import React, { useState } from "react";
import {Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { MdAutoDelete } from "react-icons/md";
import { MdAssignmentAdd } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import Data from "../Data.js";
import "../Styles/AppStyle.css";

const FilteredTasks = (props) => {
  const [data, setData] = useState(Data);
  const [newTask, setNewTask] = useState(""); // State to hold the new task message
  const [category, setCategory] = useState(""); // State to hold the category of the new task

  console.clear();

  const handleAddTask = () => {
    if (newTask && category && category !== "--Select--") {
      const newTaskData = {
        id: data.length + 1, // Generate a new ID
        message: newTask,
        category: category,
        dateGen:
          new Date().toLocaleTimeString() + " " + new Date().toDateString(), // Set the current date
        completed: false,
        state: false,
      };
      setData([...data, newTaskData]);
      setNewTask(""); // Clear the input field after adding the task
      setCategory(""); // Clear the category selection after adding the task
    } else {
      alert("Please enter a task and select a valid category");
    }
  };

  const handleComplete = (id) => {
    const updatedData = data.map((task, index) => {
      if (index === id) {
        return { ...task, completed: !task.completed, state: !task.state }; // Toggle the 'completed' status
      } else {
        return task;
      }
    });
    setData(updatedData);
  };

  const handleDelete = (id) => {
    const newData = data.filter((task, index) => index !== id);
    setData(newData);
  };

  const handleTaskChange = (e) => setNewTask(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  return (
    <>
      <div className="wrapper sm:flex sm:justify-center sm:items-center sm:w-screen sm:h-screen ">
        <div className="TodoApp sm:grid sm:grid-cols-12 sm:text-2xl sm:grid-rows-12 sm:w-[80vw] sm:h-[80vh]  sm:rounded-3xl sm:font-mono">
          <div className="navbar sm:flex sm:justify-center sm:row-span-2 sm:col-span-12">
            <ul className="ListBox sm:flex sm:gap-5 sm:mt-5 sm:text-2xl sm:font-bold">
              <li>
                <Link className="sm:active:text-red-600 sm:visited:text-red-500" to="/All">
                  All
                </Link>
              </li>
              <li>
                <Link className="sm:active:text-red-500 sm:text-white " to="/General ">
                  General
                </Link>
              </li>
              <li>
                <Link className="sm:active:text-red-500 sm:text-white" to="/Meeting">
                  Meeting
                </Link>
              </li>
              <li>
                <Link className="sm:active:text-red-500 sm:text-white" to="/Today">
                  Today
                </Link>
              </li>
              <li>
                <Link className="sm:active:text-red-500 sm:text-white" to="/Tomorrow">
                  Tomorrow Tasks
                </Link>
              </li>
            </ul>
          </div>

          <div className="TodoForm sm:col-span-12 sm:row-span-2 sm:flex sm:justify-evenly sm:relative sm:mt-5 sm:items-center">
            <div className="left sm:flex sm:gap-6 sm:items-center">
              <span>
                <input
                  type="text"
                  placeholder="Enter your todo"
                  value={newTask}
                  onChange={handleTaskChange}
                  className="sm:w-[20vw] sm:border-2 sm:p-1 sm:rounded-lg sm:bg-[#00245C] sm:caret-slate-200  sm:text-center sm:text-white"
                />
              </span>

              <span>
                <select
                  className="sm:border-2 sm:p-1 sm:rounded-lg sm:text-[#fff] sm:bg-[#00245C]"
                  value={category}
                  onChange={handleCategoryChange}
                  name="select"
                  id=""
                >
                  <option className="sm:text-center" value="--Select--">
                    --Select--
                  </option>
                  <option className="sm:text-center " value="All">
                    All
                  </option>
                  <option className="sm:text-center" value="General">
                    General
                  </option>
                  <option className="sm:text-center" value="Meeting">
                    Meeting
                  </option>
                  <option className="sm:text-center" value="Today">
                    Today Task
                  </option>
                  <option className="sm:text-center" value="Tomorrow">
                    Tomorrow Task
                  </option>
                </select>
              </span>
            </div>

            <span>
              <button
                className="sm:p-1 sm:rounded-lg sm:border-2 sm:bg-[#3F6AD8] sm:text-white btnAdd"
                onClick={handleAddTask}
              >
                <MdAssignmentAdd size={24} />
              </button>
            </span>
          </div>

          <div className="ListTodo sm:col-span-12 sm:flex sm:flex-col sm:gap-4 sm:row-span-8 sm:mb-6 sm:text-2xl">
            <div className="headline sm:relative sm:pl-6 sm:uppercase sm:flex sm:gap-2 sm:items-center sm:font-bold">
              <FaTasks size={20} /> <h1>Task List</h1>
            </div>
            <ul className="sm:overflow-y-scroll sm:overflow-x-hidden">
              {data.map((ele, idn) => {
                if (props.type === "All" || props.type === ele.category) {
                  return (
                    <li
                      key={idn}
                      className="sm:p-6 sm:border sm:rounded-3xl sm:border-[#dfdede] sm:flex sm:justify-between sm:text-xl"
                    >
                      <span
                        className={`sm:flex sm:justify-around sm:gap-12 ${
                          ele.completed ? "line-dec sm:line-through" : ""
                        }`}
                      >
                        <span className="sm:text-red-400 sm:font-extrabold">
                          Task No: {ele.id}
                        </span>
                        <span className="sm:w-[30vw] sm:text-white">{ele.message}</span>
                        <span className="sm:text-teal-200">{ele.dateGen}</span>
                      </span>
                      <span className="sm:mr-16 sm:flex sm:gap-6 sm:items-center">
                        <button
                          className="sm:text-green-500 sm:font-extrabold"
                          onClick={() => handleComplete(idn)}
                        >
                          {ele.completed ? "Completed" : <TiTick size={24} />}
                        </button>
                        <button
                          className="sm:text-red-500 sm:font-extrabold"
                          onClick={() => handleDelete(idn)}
                        >
                          {ele.state ? <MdAutoDelete size={24} /> : " "}
                        </button>
                      </span>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilteredTasks;
