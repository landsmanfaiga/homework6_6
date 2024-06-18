import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const BillDetails = ()=>{

    const{id} = useParams();
    const[bill, setBill] = useState({});
    const[amount, setAmount] = useState(0);
    const[participants, setParticipants] = useState([]);

    useEffect(()=>{
        getBill();
        getPAmount();
    },[])

    const getBill = async()=>{
        const{data} = await axios.get(`/api/bills/get/${id}`)
        setBill({ amount: data[0].amount, date: data[0].date })
        setParticipants(data.map(d => ({ name: d.name })).filter(b => b.name))
    }
    const getPAmount = async()=>{
        const{data} = await axios.get(`/api/bills/getPAmount/${id}`)
        const total = bill.amount / data;
        setAmount(total);
    }


    return(<>
    <div className="container">
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-lg">
                <div className="card-header bg-dark text-white">
                    <h2 className="card-title text-center mb-0">Bill Details</h2>
                    </div>
                    <div className="card-body">
                        <p><strong>Date:</strong>{dayjs(bill.date).format('MM/DD/YYYY')}</p>
                        <p><strong>Total Amount:</strong>${bill.amount}</p>
                        <h3 className="mt-4">Participants</h3>
                        <ul className="list-group">
                            {participants.map(p=>(
                                 <li className="list-group-item d-flex justify-content-between align-items-center" key={p.id}>
                                 <span>{p.name}</span>
                                 <span className="badge bg-success rounded-pill">${amount}</span>
                                 </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default BillDetails;