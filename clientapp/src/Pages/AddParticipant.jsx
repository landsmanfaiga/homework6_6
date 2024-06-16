import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddParticipant = () => {

    const navigate = useNavigate();

  const[name, setName] = useState('');
  const[email, setEmail] = useState('');

    let participant = {
        name: name,
        email: email
    }

    const onSubmitClick = async () => {
        await axios.post('/api/participants/add', participant);
        navigate('/listparticipants');
    }


    return (
        <div className="container">
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card shadow p-4">
                    <h2 className="card-title text-center mb-4">Add Participant</h2>
                    <div className="mb-3">
                    <label className="form-label">Name</label>
                                <input type="text"
                                        className="form-control"
                                        placeholder="Enter participant name"
                                        value={name}
                                        onChange={e=>setName(e.target.value)}
                                />
                        </div>
                        <div className="mb-3">
                        <label className="form-label">Email (optional)</label>
                                <input type="email"
                                        className="form-control"
                                        placeholder="Enter participant email"
                                        value={email}
                                        onChange={e=>setEmail(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary w-100" onClick={onSubmitClick}>Add Participant</button>
                        </div>
                    </div>
                </div>
    )
}


export default AddParticipant;