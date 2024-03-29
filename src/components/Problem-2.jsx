import React, { useEffect } from 'react';
import { getAllContact, getUsContact } from '../api/Contact';
import { useNavigate } from 'react-router-dom';

const Problem2 = () => {

    const fetchData = async () => {
        const data = await getAllContact()

        // console.log(data?.results, 'ddd')
    }

    const fetchUsData = async () => {
        const data = await getUsContact()
        console.log(data?.results, 'us')
    }

    useEffect(() => {
        fetchData()
        fetchUsData()
    }, [])

    const navigate = useNavigate()

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-lg btn-outline-primary" type="button" onClick={() => navigate("/problem-2/allContacts")} >All Contacts</button>
                    <button className="btn btn-lg btn-outline-warning" type="button" onClick={() => navigate("/problem-2/usContacts")}>US Contacts</button>
                </div>

            </div>
        </div>
    );
};

export default Problem2;