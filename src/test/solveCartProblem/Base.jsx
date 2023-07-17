import React, { createContext, useState } from 'react'
import Base2 from './Base2'
export const sendConext = createContext();

const Base = () => {
  const [temp, setTemp] = useState([1,2,3,4,5]);
  return (
    <div>
      <sendConext.Provider value={temp}>
      <Base2/>

      </sendConext.Provider>
    </div>
  )
}

export default Base