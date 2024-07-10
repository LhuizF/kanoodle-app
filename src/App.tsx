import './App.css'

const totalItems = 66


function App() {
  const  masterList = Array.from({ length: totalItems }, (_, i) => i)

  return (
    <main>
      <div className='grid'>
        {masterList.map((item, index) => (
          <div className='box' key={index}>{item}</div>
        ))}
      </div>

    </main>
  )
}

export default App
