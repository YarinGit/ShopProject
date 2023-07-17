import React, { useContext } from 'react'
import { context } from './Context';

const ChildContext = () => {
    const [signId, setSignId] = useContext(context);
  return (
    <div>
        <button onClick={()=>setSignId(!signId)}>{signId?"sign out": "sign in"}</button>
    </div>
  )
}

export default ChildContext