import {useEffect, useState} from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import{Link} from 'react-router-dom';

const ListBills = ()=>{

    const [bills, setBills] = useState([]);

    useEffect(()=>{
        getBills();
    },[])

    const getBills = async()=>{
        const {data} = await axios.get('/api/bills/getall');
        setBills(data);
    }
    return(<>
    <div className="container">
        <div className="container mt-5">
            <h2>Bills List</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Total Amount</th>
                        <th scope="col">Participants</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                    <tbody>
                        {bills.map(b=>( 
                        <tr key={b.id}>
                            <th scope="row">{b.id}</th>
                            <td>{dayjs(b.date).format('MM/DD/YYYY')}</td>
                            <td>${b.amount}</td>
                            <td>{b.participantCount}</td>
                            <td><Link to={`/billdetails/${b.id}`} className="btn btn-primary btn-sm">View Details</Link>
                            </td>
                        </tr>))}  
                    </tbody>
            </table>
        </div>
    </div>
    </>)
}

export default ListBills;