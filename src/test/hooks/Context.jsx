import React, { useState } from 'react'
import ChildContext from './ChildContext'

export const context = React.createContext();
const Context = () => {
    const [signId, setSignId] = useState(false);

  return (
    <div>
        <context.Provider value={[signId, setSignId]}>
        <ChildContext/>
        <h1>{signId?"sign out": "sign in"}</h1>
        </context.Provider>
    </div>
  )
}

export default Context