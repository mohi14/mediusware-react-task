import React, { useState } from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');

    const handleClick = (val) => {
        setShow(val);
    }

    const [submittedDatas, setSubmittedDatas] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;

        const name = form.name.value;
        const status = form.status.value;

        const data = {
            name,
            status
        }

        setSubmittedDatas(current => [...current, data])

    }

    const handleStatusFilter = (data) => {
        if (show === "active") {
            return show.toLocaleLowerCase() === data?.status.toLocaleLowerCase()
        }
        else if (show === "completed") {
            return show.toLocaleLowerCase() === data?.status.toLocaleLowerCase()
        }
        else {
            return true
        }
    }


    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
                        <div className="col-auto" >
                            <input type="text" className="form-control" placeholder="Name" name="name" required />
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status" name="status" required />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submittedDatas.length > 0 && submittedDatas.sort((a, b) => {
                                const statusOrder = { Active: 1, Completed: 2 };
                                return statusOrder[a.status] - statusOrder[b.status];
                            }).filter(handleStatusFilter).map((item, idx) => <tr key={idx}>
                                <td >{item.name}</td>
                                <td >{item?.status}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;