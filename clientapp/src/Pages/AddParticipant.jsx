import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddParticipant = () => {

    const navigate = useNavigate();

    const [participant, setParticipant] = useState({
        name: '',
        email: '' 
    });

    const onTextChange = e => {
        const copy = {...participant};
        copy[e.target.name] = e.target.value;
        setParticipant(copy);
    }

    const onSubmitClick = async () => {
        await axios.post('/api/participants/add', participant);
        navigate('/');
    }

    const {name, email} = participant;

    return (
        <div className="container">
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card shadow p-4">
                    <h2 className="card-title text-center mb-4">Add Participant</h2>
                    <div className="mb-3">
                        <label for="participantName" className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Enter participant name" value={name} onChange={onTextChange}/>
                        </div>
                        <div className="mb-3">
                            <label for="participantEmail" className="form-label">Email (optional)</label>
                            <input type="email" className="form-control" placeholder="Enter participant email" value={email} onChange={onTextChange}/>
                            </div>
                            <button className="btn btn-primary w-100" onClick={onSubmitClick}>Add Participant</button>
                        </div>
                    </div>
                </div>
    )
}


export default AddParticipant;