import {useState, useEffect} from 'react';
import axios from 'axios';

const ListParticipants = ()=>{
    const[participants, setParticipants] = useState([]);

    useEffect(()=>{
        getParticipants();
    },[])

    const getParticipants=async()=>{
        const{data} = await axios.get('/api/participants/getall');
        setParticipants(data);
    }

    return(<>
    <div className="container">
        <div className="container mt-5">
            <h2>Participants List</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
            <tbody>
                {participants.map(p=>(
                        <tr><th scope="row">{p.id}</th><td>{p.name}</td><td>{p.email}</td></tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
    </>)
}

export default ListParticipants;
