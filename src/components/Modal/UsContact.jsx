import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsContact } from '../../api/Contact';

const UsContact = () => {
    const navigate = useNavigate()
    const [usContactData, setUsContactData] = useState([])
    const [isEven, setIsEven] = useState(false)
    const [page, setPage] = useState(2)
    const [selectedContact, setSelectedContact] = useState(null)

    const usContactRef = useRef()
    const closeUsContactRef = useRef()
    const usContactModalBodyRef = useRef()

    const fetchUsContact = async (params) => {
        const response = await getUsContact(params)
        if (response?.results) {
            setUsContactData(response?.results)
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
        fetchUsContact(`?search=${e.target.value}`)
    }

    const handleModalBodyScroll = () => {
        const modalBody = usContactModalBodyRef.current;
        if (modalBody.scrollHeight - modalBody.scrollTop === modalBody.clientHeight) {
            fetchUsContact(`?page=${page}`)
            usContactModalBodyRef.current.scrollTop = 0;
            setPage(prev => prev + 1)
        }

    }


    useEffect(() => {
        fetchUsContact()
        usContactRef?.current.click()
    }, [])
    return (
        <>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                    <div className="d-flex justify-content-center gap-3">
                        <button className="btn btn-lg btn-outline-primary" type="button" onClick={() => {
                            navigate("/problem-2/allContacts")

                        }} >All Contacts</button>
                        <button className="btn btn-lg btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal1">US Contacts</button>
                    </div>

                </div>
            </div>


            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal1" ref={usContactRef}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1> */}
                            <div className='d-flex justify-content-center gap-4 align-items-center w-100'>
                                <button className='btn all_contacts_btn' onClick={() => {
                                    closeUsContactRef?.current.click()
                                    navigate("/problem-2/allContacts")
                                }}>All Contacts</button>
                                <button className='btn us_contacts_btn' >Us Contacts</button>
                                <button className='btn close_btn' onClick={() => closeUsContactRef.current.click()}>Close</button>
                            </div>
                            <button ref={closeUsContactRef} type="button" className="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" ref={usContactModalBodyRef} onScroll={handleModalBodyScroll}>
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
                                    {usContactData?.length > 0 && usContactData.filter(handleFiltering).map((item, idx) => <tr key={idx}>
                                        <td >{item.id}</td>
                                        <td data-bs-toggle="modal" data-bs-target="#exampleModalUs" style={{ cursor: "pointer" }} onClick={() => setSelectedContact(item)}>{item?.phone}</td>
                                        <td >{item?.country.name}</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer justify-content-start">
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
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


            <div className="modal fade" id="exampleModalUs" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

export default UsContact;