
import './App.css';
import  {useState, useEffect} from "react";
import Axios from "axios";

function App() {

  const [description,setDescription]=useState("");
  const [completed,setCompleted]=useState("uncompleted");
  const [date,setDate]=useState("");
  const [newDescription,setNewDescription]=useState("");
  const [newCompleted,setNewCompleted]=useState("uncompleted");
  const [taskList,setTaskList]=useState([]);
  const [groupList,setGroupList]=useState([]);

useEffect(()=>{
  //console.log("useeffect2 called")
  // Axios.get("http://localhost:8080/getTasks").then((response)=>{
  Axios.get("https://sarthakpippaltodoapp.herokuapp.com/getTasks").then((response)=>{
  //console.log("useEffect",response)  
  setTaskList(response.data)
  //setGroupList(response.data)
  //console.log(response.data)
  })
},[])

useEffect(()=>{
  console.log("useeffect2 called")
  Axios.get("https://sarthakpippaltodoapp.herokuapp.com/getGroup2").then((response)=>{
  //Axios.get("https://sarthakpippaltodoapp.herokuapp.com/getTasks").then((response)=>{
  console.log("useEffect2",response)  
  // setTaskList(response.data)
  setGroupList(response.data)
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
function refreshPage() {
  window.location.reload(false);
}

  const submitTask = () => {
    //console.log("tee")
    Axios.post("https://sarthakpippaltodoapp.herokuapp.com/tasks",{
      
      description : description,
      completed : completed,
      date: date,

    }).then((res)=>{
      
      //console.log(res)
    setTaskList([...taskList, {description: description, completed: completed, date: date}])
    //refreshPage()
    })
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
      //new

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
    console.log("urgent calledd")
    //console.log(id)
    Axios.post('https://sarthakpippaltodoapp.herokuapp.com/createGroup2',{
      id:id  
    }); 
  };

  const deleteGroup2 = () => {
    console.log("tee")
    Axios.put('https://sarthakpippaltodoapp.herokuapp.com/deleteGroup2',{
      
    });  
    console.log("deleted group")
  };

  const updateGroup2 = () => {
    console.log("tee")
    Axios.put('https://sarthakpippaltodoapp.herokuapp.com/updateGroup2',{
      
    })};
  //   .then((res)=>{
      
  //     //console.log(res)
  //   setGroupList([...groupList, {description: description, completed: completed, date: date}])
  //   });
  // };

  // const getGroup2 = () => {
  //   //console.log("tee")
  //   Axios.get('https://sarthakpippaltodoapp.herokuapp.com/getGroup2',{
      
  //   }).then((res)=>{
      
  //     //console.log(res)
  //   setGroupList([...groupList, {description: description, completed: completed, date: date}])
  //   });
  // };


  return (
    <div className="App">
      <h1>To-Do App</h1>
        <div className="Task-List">
        <label>Add Task: </label>
        <input 
        type= "text"
        name="description"
        onChange={(e)=>{
          setDescription(e.target.value);
        }}
        />
        {/* <label>Status : </label>
        <input type= "boolean" 
        name="completed" 
        onChange={(e)=>{
          setCompleted(e.target.value);
        }}
        /> */}
        <label>Status : </label>
        <select 
        onChange={(e)=>{
          const selectedval= e.target.value
          setCompleted(selectedval);

        }}
        
        >
        
          <option value="Uncompleted" >Uncompleted</option>
          <option value="completed" >Completed</option>
        </select>
        <label>  Date : </label>
        <input type= "date" 
        name="date" 
        onChange={(e)=>{
          setDate(e.target.value);
        }}
        />
    </div>
        <button onClick={()=>{submitTask()}} >Submit</button>
         <h1>Task-List</h1>
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
         <label>New Status : </label>
         <select 
        onChange={(e)=>{
          const selectedval2= e.target.value
          setNewCompleted(selectedval2);

        }}
        
        >
        
          <option value="Uncompleted" >Uncompleted</option>
          <option value="completed" >Completed</option>
        </select> 
           {/* <input 
          type="text" 
          placeholder="Completed or not"
          onChange={(e)=>{
            //setNewDescription(e.target.value);
            setNewCompleted(e.target.value);
          }} /> */}
          <div>
          <button onClick={()=>{updateTask(val._id);refreshPage(); }} >Update</button>
          <button onClick={()=>{deleteTask(val._id); refreshPage();}} >Delete</button>
          <button onClick={()=>{urgentTask(val._id); refreshPage();}}  >Urgent</button>
          </div>
        </div>
          );
        })}
       <h1>Urgent Tasks</h1>
        {
        groupList.map((val, key)=>{
          return (
            <div key={key} className="group">
          <h1> Description : {val.description} | Status: {val.completed} | Date: {val.date}</h1>
        </div>
          );
        })
        }
        
       <button onClick={()=>{ deleteGroup2();refreshPage(); }} >Delete Group</button>
       {/* <button onClick={()=>{ getGroup2() }} >View Group</button>  */}
       <button onClick={()=>{ updateGroup2() ;refreshPage();}} > All completed</button>  
      </div>
    
  );
}

export default App;
