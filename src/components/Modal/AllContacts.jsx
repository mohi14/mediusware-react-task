import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllContact } from '../../api/Contact';

const AllContacts = () => {

    const [allContactData, setAllContactData] = useState([])
    const [isEven, setIsEven] = useState(false)
    const [page, setPage] = useState(2)
    const [selectedContact, setSelectedContact] = useState(null)

    const allContactRef = useRef()
    const closeAllContactRef = useRef()
    const modalBodyRef = useRef()

    const navigate = useNavigate()

    const fetchAllContact = async (params) => {

        const response = await getAllContact(params)
        if (response?.results) {
            setAllContactData(response?.results)
        }

    }

    const handleFiltering = (data) => {
        if (isEven) {
            return data?.id % 2 === 0
        }
        else {
            return true
        }
    }



    const handleInputChange = async (e) => {
        fetchAllContact(`?search=${e.target.value}`)
    }


    const handleModalBodyScroll = () => {
        const modalBody = modalBodyRef.current;
        if (modalBody.scrollHeight - modalBody.scrollTop === modalBody.clientHeight) {
            fetchAllContact(`?page=${page}`)
            modalBodyRef.current.scrollTop = 0;
            setPage(prev => prev + 1)
        }

    }


    console.log(selectedContact, "selectedContact")


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
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className='d-flex justify-content-center gap-4 align-items-center w-100'>
                                <button className='btn all_contacts_btn' >All Contacts</button>
                                <button className='btn us_contacts_btn' onClick={() => {
                                    closeAllContactRef?.current.click()
                                    navigate("/problem-2/usContacts")
                                }}>Us Contacts</button>
                                <button className='btn close_btn' onClick={() => closeAllContactRef?.current.click()}>Close</button>
                            </div>
                            <button ref={closeAllContactRef} type="button" className="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" ref={modalBodyRef} onScroll={handleModalBodyScroll} >
                            <div className="mb-3">
                                <input type="search" className="form-control " placeholder="Search Contact..." name="Search" onChange={handleInputChange} />
                            </div>
                            <table className="table table-striped ">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">PHONE</th>
                                        <th scope="col">COUNTRY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allContactData.length > 0 && allContactData.filter(handleFiltering).map((item, idx) => <tr key={idx}>
                                        <td >{item.id}</td>
                                        <td data-bs-toggle="modal" data-bs-target="#exampleModalAll" onClick={() => setSelectedContact(item)} style={{ cursor: "pointer" }}>{item?.phone}</td>
                                        <td >{item?.country.name}</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer justify-content-start">
                            <div className="form-check" >
                                <input style={{ cursor: "pointer" }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => setIsEven(!isEven)} />
                                <label style={{ cursor: "pointer" }} className="form-check-label" htmlFor="flexCheckDefault">
                                    Only even
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="exampleModalAll" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-body">
                            <div className='d-flex justify-content-between'>
                                <p className='fs-4 fw-bold'>Details</p> <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className='mt-4'>

                                <p><span className='fw-semibold'>PHONE:</span> {selectedContact?.phone} </p>
                                <p> <span className='fw-semibold'>COUNTRY:</span> {selectedContact?.country?.name} </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
};

export default AllContacts;