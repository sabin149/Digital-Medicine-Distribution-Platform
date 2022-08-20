import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div  style={{ minHeight: 'calc(100vh - 70px)', position:"relative" }} >
            <h2 className="position-absolute text-secondary" 
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position:"absolute", color:"grey"}} >
                404 | Not Found.
              
            </h2>
            <Link to="/" className="position-absolute" 
                style={{ top: '55%', left: '50%', transform: 'translate(-50%, -50%)',position:"absolute" }}>
                <Button variant='text' color='primary'>Go to Homepage</Button>
                </Link>
        </div>
    )
}

export default NotFound
