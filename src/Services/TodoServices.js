export const getTodo = () =>{
    let todo = localStorage.getItem('todo')
    let list = JSON.parse(todo)
    return list;
} 




export const addToDo = (todo) => {
    let todoList = getTodo()
    if(todoList==null){
        todoList=[]
    }
    return new Promise((resolve, reject)=>{
      const  {title} = todo
        if(title){
            todoList.push(todo)
            localStorage.setItem("todo", JSON.stringify(todoList))
            resolve(todo)
            
        }else{
            reject({
                msg:"Something wrong!"
            })
        }
    })
}


export const deleteTodo = (todo) =>{
    const todoList = getTodo()
    return new Promise((resolve, reject)=>{
        const  {title} = todo
        if(title){

            const filteredTodo=todoList.filter(n=>n.title!==title)
        
            localStorage.setItem("todo", JSON.stringify(filteredTodo))
            resolve(todo)
            
        }else{
            reject({
                msg:"Something wrong!"
            })
        }
    })
    

}


export const editTodo = (todo) =>{
    const todoList = getTodo()
    return new Promise((resolve, reject)=>{
        const  {title} = todo
        if(title){

            const filteredTodo=todoList.filter(n=>n.title!==title)
            filteredTodo.push(todo)
            localStorage.setItem("todo", JSON.stringify(filteredTodo))
            resolve(todo)
            
        }else{
            reject({
                msg:"Something wrong!"
            })
        }
    })
    

}