import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const UsContact = () => {
    const navigate = useNavigate()

    const usContactRef = useRef()
    const closeUsContactRef = useRef()

    useEffect(() => {
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
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1> */}
                            <div className='d-flex justify-content-center gap-4 align-items-center w-100'>
                                <button className='btn all_contacts_btn'>All Contacts</button>
                                <button className='btn us_contacts_btn'>Us Contacts</button>
                                <button className='btn close_btn' onClick={() => closeUsContactRef.current.click()}>Close</button>
                            </div>
                            <button ref={closeUsContactRef} type="button" className="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer justify-content-start">
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" for="flexCheckDefault">
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

export default UsContact;