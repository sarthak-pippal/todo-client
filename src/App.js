
import './App.css';
import  {useState, useEffect} from "react";
import Axios from "axios";

function App() {

  const [description,setDescription]=useState("");
  const [completed,setCompleted]=useState("");
  const [date,setDate]=useState("");
  const [newDescription,setNewDescription]=useState("");
  const [newCompleted,setNewCompleted]=useState("");
  const [taskList,setTaskList]=useState([]);

useEffect(()=>{
  console.log("useeffect called")
  Axios.get("https://sarthakpippaltodoapp.herokuapp.com/getTasks").then((response)=>{
  console.log("useEffect",response)  
  setTaskList(response.data)
  console.log(response.data)
  })
},[])

  const submitTask = () => {
    //console.log("tee")
    Axios.post("https://sarthakpippaltodoapp.herokuapp.com/tasks",{
      
      description : description,
      completed : completed,
      date: date,

    }).then((res)=>{
      
      //console.log(res)
    setTaskList([...taskList, {description: description, completed: completed, date: date}])
    });
  };

  // const updateTask = () => {
  //   //console.log("tee")
  //   Axios.post("http://localhost:8080/updateTasks",{
      
  //     description : description,
  //     completed : completed,
  //     date: date,

  //   }).then((res)=>{
      
  //     //console.log(res)
  //   setTaskList([...taskList, {description: description, completed: completed, date: date}])
  //   });
  // };

  const updateTask = (id) => {
    console.log(id)
    Axios.put("https://sarthakpippaltodoapp.herokuapp.com/updateTasks",{
      id: id,
      newDescription : newDescription,
      newCompleted : newCompleted,
      //date: date,

    }).then((res)=>{
      
      //console.log(res)
    setTaskList([...taskList, {description: newDescription, completed: newCompleted, date: date}])
    });
  };

  const deleteTask = (id) => {
    console.log("tee")
    Axios.put('https://sarthakpippaltodoapp.herokuapp.com/deleteTasks',{
      id:id
    });
      
  };

  const urgentTask = (id) => {
    console.log("tee")
    Axios.put('https://sarthakpippaltodoapp.herokuapp.com/createGroup',{
      id:id
    });
      
  };


  return (
    <div className="App">
      <h1>To-Do App</h1>

        <label>Add Task: </label>
        <input 
        type= "text"
        name="description"
        onChange={(e)=>{
          setDescription(e.target.value);
        }}
        />
        <label>Status : </label>
        <input type= "text" 
        name="completed" 
        onChange={(e)=>{
          setCompleted(e.target.value);
        }}
        />
        <label>Date : </label>
        <input type= "date" 
        name="date" 
        onChange={(e)=>{
          setDate(e.target.value);
        }}
        />

        <button onClick={submitTask}>Submit</button>

        {
        taskList.map((val, key)=>{
          return (
            <div key={key} className="task">
          <h1>Task List : {val.description} | Description: {val.completed} | Date: {val.date}</h1>
          <input 
          type="text" 
          placeholder="new description"
          onChange={(e)=>{
            setNewDescription(e.target.value);
            //setNewCompleted(e.target.value);
          }} />

           <input 
          type="text" 
          placeholder="Completed or not"
          onChange={(e)=>{
            //setNewDescription(e.target.value);
            setNewCompleted(e.target.value);
          }} />
          <button onClick={()=>{ updateTask(val._id) }} >Update</button>
          <button onClick={()=>{deleteTask(val._id)} } >Delete</button>
          <button onClick={()=>{urgentTask(val._id)} } >Urgent</button>
        </div>
          );
        })}

      </div>
    
  );
}

export default App;
