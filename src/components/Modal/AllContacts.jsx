import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllContact } from '../../api/Contact';

const AllContacts = () => {

    const [allContactData, setAllContactData] = useState([])

    const allContactRef = useRef()
    const closeAllContactRef = useRef()

    const navigate = useNavigate()

    const fetchAllContact = async () => {
        const response = await getAllContact()
        if (response?.results) {
            setAllContactData(response?.results)
        }

    }

    console.log(allContactData, "v")

    useEffect(() => {
        allContactRef?.current.click()
        fetchAllContact()
    }, [])
    return (
        <>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                    <div className="d-flex justify-content-center gap-3">
                        <button className="btn btn-lg btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" >All Contacts</button>
                        <button className="btn btn-lg btn-outline-warning" type="button" onClick={() => navigate("/problem-2/usContacts")}>US Contacts</button>
                    </div>

                </div>
            </div>


            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={allContactRef}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className='d-flex justify-content-center gap-4 align-items-center w-100'>
                                <button className='btn all_contacts_btn'>All Contacts</button>
                                <button className='btn us_contacts_btn'>Us Contacts</button>
                                <button className='btn close_btn' onClick={() => closeAllContactRef?.current.click()}>Close</button>
                            </div>
                            <button ref={closeAllContactRef} type="button" className="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-striped ">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">PHONE</th>
                                        <th scope="col">COUNTRY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allContactData.length > 0 && allContactData.map((item, idx) => <tr key={idx}>
                                        <td >{item.id}</td>
                                        <td >{item?.phone}</td>
                                        <td >{item?.country.name}</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer justify-content-start">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Only even
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
};

export default AllContacts;