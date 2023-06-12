import axios from 'axios';
import React, { useEffect, useState } from 'react'

function CrudOperation() {

    const [modalTitle, setmModalTitle] = useState("Add New Role")
    const [disabled, setDisabled] = useState(true)

    const [id, setId] = useState(undefined)

    const [role, setRole] = useState({
        role: ""
    })

    const [data, setData] = useState([])

    function handleChange(e) {
        e.preventDefault()
        setRole({ ...role, [e.target.name]: e.target.value })

        if (role === !undefined) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }

    function handleSubmit() {
        if (id === undefined) {
            axios.post("https://64830ed3f2e76ae1b95be158.mockapi.io/crudeoperations", role)
                .then((res) => {
                    setRole({
                        role: ""
                    })
                    loadData()
                })
        } else {
            axios.put(`https://64830ed3f2e76ae1b95be158.mockapi.io/crudeoperations/${id}`, role)
                .then((res) => {
                    // console.log(res.data);
                    setRole({
                        role: ""
                    })
                    loadData()
                    setId(undefined)
                })
        }

    }

    function loadData() {
        axios.get("https://64830ed3f2e76ae1b95be158.mockapi.io/crudeoperations")
            .then((res) => {
                // console.log(res.data);
                setData(res.data)
            })
        // console.log(data);
    }

    function handleDelete(e) {
        e.preventDefault()
        axios.delete(`https://64830ed3f2e76ae1b95be158.mockapi.io/crudeoperations/${id}`)
            .then((res) => {
                console.log(res.data);
                loadData()
            })
    }

    function handleUpdate(e, id) {
        e.preventDefault()
        axios.get(`https://64830ed3f2e76ae1b95be158.mockapi.io/crudeoperations/${id}`)
            .then((res) => {
                console.log(res.data);
                setRole({
                    role: res.data.role
                })
                setId(res.data.id)
                if (role === !undefined) {
                    setDisabled(true)
                } else {
                    setDisabled(false)
                }
            })
        setmModalTitle("Update Role")
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <h1>Crud Operation</h1><br /><br />

            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-end mb-2">
                        <button type="button" onClick={(e) => setmModalTitle("Add New Role")} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add</button>
                    </div>
                    <table className="table">
                        <thead className='bg bg-light'>
                            <tr>
                                <th scope="col">Name of the Role</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((eachData) => {
                                    return (
                                        <tr key={eachData.id}>
                                            <td>{eachData.role}</td>
                                            <td>
                                                <button className='btn btn-primary mx-2' onClick={(e) => handleUpdate(e, eachData.id)} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                                                <button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>setId(eachData.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>


            {/* Modal */}
            <div className="modal fade" id="exampleModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content ">
                        <div className="modal-header bg bg-primary text-white">
                            <h5 className="modal-title " id="exampleModalLabel">{modalTitle}</h5>
                            <button type="button" className="btn-close text-light" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <input name='role' type="text" value={role.role} onChange={(e) => handleChange(e)} className="form-control border-top-0 border-start-0 border-end-0" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Name of the Role'/>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={(e) => handleSubmit(e)} className="btn btn-primary" data-bs-dismiss="modal" disabled={disabled}>Save</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Delete Confirmation Modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Confirm to Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={(e)=>handleDelete(e)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CrudOperation