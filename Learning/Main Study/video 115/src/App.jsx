import React from 'react'
import Navbar from './components/Navbar'
import Card from './components/Card'
import About from './components/About'

function App() {
 
  return (
    <>
    <Navbar/>
    
    
    <div className='flex m-auto w-fit flex-wrap'>
    <Card title={"Card-1"} text={" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat soluta cum eveniet laudantium. Provident sint, ea velit autem labore aliquid?"}/>
    <Card title={"Card-2"} text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vitae fugiat quia, eos ratione veritatis aliquam ab velit et quasi cupiditate autem. Similique itaque iusto aspernatur autem, sunt ut hic earum eos eius suscipit! Dignissimos accusamus mollitia velit officia dolorum."}/>
    <Card title={"Card-3"} text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem vitae fugiat quia, eos ratione veritatis aliquam ab velit et quasi cupiditate autem. Similique itaque iusto aspernatur autem, sunt ut hic earum eos eius suscipit! Dignissimos accusamus mollitia velit officia dolorum."}/>
    </div>
    </>
  )
}

export default App