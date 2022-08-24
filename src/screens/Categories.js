import React, {useState, useContext} from 'react'
import {GlobalState} from '../GlobalState'
import axios from 'axios'
import "../styles/categories.css"
import {Button} from "@material-ui/core"
import { toast } from 'react-toastify'

function Categories() {
    const state = useContext(GlobalState)
    const [categories] = state.categoryAPI.category
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.categoryAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createCategory = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`https://backend-emedicine-platform.herokuapp.com/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                // alert(res.data.msg)
                toast.success(res.data.msg);
            }else{
                const res = await axios.post('https://backend-emedicine-platform.herokuapp.com/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                // alert(res.data.msg)
                toast.success(res.data.msg);
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)
            
        } catch (err) {
            // alert(err.response.data.msg)
            toast.error(err.response.data.msg);
        }
    }

    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async id =>{
        try {
            const res = await axios.delete(`https://backend-emedicine-platform.herokuapp.com/api/category/${id}`, {
                headers: {Authorization: token}
            })
            // alert(res.data.msg)
            toast.error(res.data.msg);
            setCallback(!callback)
        } catch (err) {
            // alert(err.response.data.msg)
            toast.error(err.response.data.msg);
        }
    }

    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category}
                onChange={e => setCategory(e.target.value)} />

                <Button type="submit" color='primary' variant='contained'>{onEdit? "Update" : "Create"}</Button>
            </form>
            <div className="col">
                {
                    categories.map(category => (
                        <div className="row" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <Button color='primary' variant='contained' onClick={() => editCategory(category._id, category.name)}>Edit</Button>
                                <Button onClick={() => deleteCategory(category._id)} color='secondary' variant='contained'>Delete</Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
