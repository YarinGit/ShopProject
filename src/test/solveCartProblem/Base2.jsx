import React, { useContext } from 'react'
import { sendConext } from './Base'

const Base2 = () => {
    const temp = useContext(sendConext);
    for (let i = 0; i < temp.length; i++) {
        console.log(temp[i]) 
        
    }
    return (
    <div>
        
    </div>
  )
}

export default Base2