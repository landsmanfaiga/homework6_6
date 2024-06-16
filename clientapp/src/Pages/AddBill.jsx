import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const AddBill =()=>{

    const navigate= useNavigate();
    const[amount, setAmount] = useState(0);
    const[participants, setParticipants] = useState([]);
    const[checkedPpl, setCheckedPpl] = useState([]);
    let dividedTotal = amount / checkedPpl.length;

    useEffect(()=>{
        getParticipants();
    },[])

    const getParticipants=async()=>{
        const{data} = await axios.get('/api/participants/getall');
        setParticipants(data);
    }

    const onCheck =(p)=>{
        const copy = checkedPpl;
        if(!(checkedPpl.includes(p))){
            copy.push(p);
            setCheckedPpl(copy);
        }
        else{
            copy.filter(i=> i !== p);
            setCheckedPpl(copy);
        }
    }

    const onSubmitClick = async()=>{
        await axios.post('/api/bills/add', {amount})
        checkedPpl.forEach(p=>submitId(p.id))
        navigate('/listbills')
    }

    const submitId=async id =>{
        await axios.post('/api/bills/addpb', id)
    }

    return(<>
    <div className="container">
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card shadow p-4">
                <h2 className="card-title text-center mb-4">Add Bill</h2>
                <div className="mb-3">
                    <label className="form-label">Total Amount</label>
                    <input type="number" className="form-control" id="totalAmount" placeholder="Enter total bill amount" value={amount} onChange={e=>setAmount(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Select Participants</label>
                        <div className="form-check">
                            {participants.map(p=>(
                            <div>
                                <input className="form-check-input" type="checkbox" value={p.id} onChange={()=>onCheck(p)}/>
                                <label className="form-check-label">{p.name}</label>
                            </div>
                            ))}                          
                        </div>
                    </div>
                    {checkedPpl && 
                    <div className="mt-4">
                        <h3 className="text-center">Split Amounts</h3>
                        <ul className="list-group">
                            {checkedPpl.map(p=>( <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span>{p.name}</span>
                                <span>${dividedTotal}</span>
                            </li>))}
                           
                        </ul>
                    </div>}
                    <button className="btn btn-primary w-100 mt-4"onClick={onSubmitClick}>Submit</button>
                </div>
            </div>
        </div>
    </>)
}

export default AddBill;