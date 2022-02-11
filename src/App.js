
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
  //const [groupList,setGroupList]=useState([]);

useEffect(()=>{
  console.log("useeffect called")
  Axios.get("http://localhost:8080/getTasks").then((response)=>{
  console.log("useEffect",response)  
  setTaskList(response.data)
  //setGroupList(response.data)
  console.log(response.data)
  })
},[])

// useEffect(()=>{
//   //console.log("useeffect called")
//   Axios.get("http://localhost:8080/getGroup2").then((response)=>{
//   //console.log("useEffect",response)  
//   setGroupList(response.data)
//   //setGroupList(response.data)
//   //console.log(response.data)
//   })
// },[])

  const submitTask = () => {
    //console.log("tee")
    Axios.post("http://localhost:8080/tasks",{
      
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
    Axios.put("http://localhost:8080/updateTasks",{
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
    Axios.put('http://localhost:8080/deleteTasks',{
      id:id
    });    
  };

  const urgentTask = (id) => {
    console.log("urgent calledd")
    //console.log(id)
    Axios.post('http://localhost:8080/createGroup2',{
      id:id  
    }); 
  };

  const deleteGroup2 = () => {
    console.log("tee")
    Axios.put('http://localhost:8080/deleteGroup2',{
      
    });  
    console.log("deleted group")
  };

  const updateGroup2 = () => {
    console.log("tee")
    Axios.put('http://localhost:8080/updateGroup2',{
      
    })};
  //   .then((res)=>{
      
  //     //console.log(res)
  //   setGroupList([...groupList, {description: description, completed: completed, date: date}])
  //   });
  // };

  // const getGroup2 = () => {
  //   //console.log("tee")
  //   Axios.get('http://localhost:8080/getGroup2',{
      
  //   }).then((res)=>{
      
  //     //console.log(res)
  //   setGroupList([...groupList, {description: description, completed: completed, date: date}])
  //   });
  // };


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
          <h1> Description : {val.description} | Status: {val.completed} | Date: {val.date}</h1>
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
          <div>
          <button onClick={()=>{ updateTask(val._id) }} >Update</button>
          <button onClick={()=>{deleteTask(val._id)} } >Delete</button>
          <button onClick={()=>{urgentTask(val._id)} } >Urgent</button>
          </div>
        </div>
          );
        })}
       
        {/* {
        groupList.map((val, key)=>{
          return (
            <div key={key} className="group">
          <h1> Description : {val.description} | Status: {val.completed} | Date: {val.date}</h1>
        </div>
          );
        })
        
        } */}
       <button onClick={()=>{ deleteGroup2() }} >Delete Group</button>
       {/* <button onClick={()=>{ getGroup2() }} >View Group</button>  */}
       <button onClick={()=>{ updateGroup2() }} > All completed</button>  
      </div>
    
  );
}

export default App;
