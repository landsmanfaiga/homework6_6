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

    const onCheck = p => {
        if (checkedPpl.includes(p)) {
            setCheckedPpl([...checkedPpl.filter(i => i !== p)])
        } else {
            setCheckedPpl([...checkedPpl, p])
        }
    }

    const onSubmitClick = async()=>{
        const checkedIds = checkedPpl.map(p => p.id);
        await axios.post('/api/bills/add', {amount, checkedIds})
        navigate('/listbills')
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
                            <div key={p.id}>
                                <input className="form-check-input" type="checkbox" value={p.id} onChange={()=>onCheck(p)}/>
                                <label className="form-check-label">{p.name}</label>
                            </div>
                            ))}                          
                        </div>
                    </div>
                    {checkedPpl.length && 
                    <div className="mt-4">
                        <h3 className="text-center">Split Amounts</h3>
                        <ul className="list-group">
                            {checkedPpl.map(p=>( <li className="list-group-item d-flex justify-content-between align-items-center" key={p.id}>
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