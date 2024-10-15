import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'


function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputage = useRef()
  const inputemail = useRef()

  
  async function getUsers(){
    const usersFromApi = await api.get('/users')

    setUsers(usersFromApi.data)
    
  }

  async function createUsers(){

    await api.post('/users', {
      name: inputName.current.value,
      age: inputage.current.value,
      email: inputemail.current.value
    })

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])
  
  async function deleteUsers(id){
    await api.delete(`/users/${id}`)
    
    getUsers()
  }



  return (
      <div className='container'>
        <form>
          <h1>Cadastro de Usuário</h1>
          <input name='nome' placeholder="Nome" type="text" ref={inputName}></input>
          <input name='idade' placeholder="Idade" type="text" ref={inputage}></input>
          <input name='email' placeholder="Email "type="email"ref={inputemail}></input>
          <button type="button" onClick={createUsers}>Cadastrar </button>
        </form>

        {users.map((user) => (
            <div key={user.id} className='cards'>
            <div>
              <p>Nome: <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash}/>
            </button>
          </div>
        ))}
      </div>
       

  )
}

export default Home
