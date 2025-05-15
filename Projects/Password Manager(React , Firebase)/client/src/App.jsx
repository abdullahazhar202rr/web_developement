import React from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import { getDatabase, ref, set } from 'firebase/database'
import { app } from './firebase'
const db = getDatabase(app)

function App() {

const putdata=()=>{
  set(ref(db, 'users/Abdullah'), {
    id:1,
    username: 'Abdullah Azhar',
    age:19
  });
  alert('Data has been sent to the database')
}

  return (
   <div className="bg-green-100 min-h-screen">
   <Navbar/>
   <Manager/>
   <button onClick={putdata} className='bg-green-400 border-2 cursor-pointer'>Put data</button>
   
   </div>
  )
}

export default App