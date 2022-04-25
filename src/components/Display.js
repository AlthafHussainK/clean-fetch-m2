import { useCallback, useRef, useState } from 'react'
import './Display.css'
import { useData } from '../hooks/useData'

export default function Display() {
  const [noOfResults, setNoOfResults] = useState(40)

  // fetch data from the custom Hook
  const [loading, users] = useData(noOfResults);

  const observer = useRef()
  const lastBookRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setNoOfResults(prevResult => prevResult + 30)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading])

  return (
    <div className='main-container'>
      <div className='title-section'>
        <h1>Random Users</h1>
      </div>

      { loading && <h4 style={{color: '#A0A0A0'}}>Loading...</h4> }
      
      <div className='books-container'>
        {
          users.map((item, index) => {
            if (users.length === index + 1) {
              return (
                <div ref={lastBookRef} className='book-box' key={index}>
                  <img src={item.picture.medium} className='book-cover' alt='' />
                  <p className='book-title'>{item.name.first + ' ' + item.name.last}</p>  
                </div>
              )
            } else {
              return (
                <div className='book-box' key={index}>
                  <img src={item.picture.medium} className='book-cover' alt='' />
                  <p className='book-title'>{item.name.first + ' ' + item.name.last}</p>  
                </div>
              )
            }
          })
        }
      </div>
      
    </div>
  )
}