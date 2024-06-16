import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AddParticipant from './Pages/AddParticipant';
import ListParticipants from './Pages/ListParticipants';
import AddBill from './Pages/AddBill';
import ListBills from './Pages/ListBills';

class App extends React.Component {
    render() {
        return (
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/addparticipant' element={<AddParticipant/>}/>
                    <Route path='/listparticipants' element={<ListParticipants/>}/>
                    <Route path='/addbill' element={<AddBill/>}/>
                    <Route path='/listbills' element={<ListBills/>}/>
                </Routes>
            </Layout>
        );
    }

};

export default App;