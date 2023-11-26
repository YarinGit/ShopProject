import React from 'react'
import './css/managerRowDes.css'
import { deleteAdmin } from '../../firebaseShop'
const ManagrtRow = ({email, deleteFunction}) => {
  const handleDelete = ()=>{
    deleteAdmin(email)
    deleteFunction()
  }
  return (
    <div className='row'>
    <div className="manager-row">
      <div className="manager-info">
        <p><strong>Email:</strong> {email}</p>
      </div>
      <button onClick={handleDelete} className="delete-button">Delete</button>
    </div>

    </div>
  )
}

export default ManagrtRow