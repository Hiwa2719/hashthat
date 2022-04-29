import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import IndexPage from "./components/IndexPage";
import 'bootstrap/dist/css/bootstrap.min.css'
import Account from './components/Account'
import Modal from './components/Modal'
import {useState} from "react";


function App() {
    const [openModal, setOpenModal] = useState(false)
    const [modalInner, setModalInner] = useState(null)
    const toggleOpenModal = (ob) => {
        setModalInner(ob)
        setOpenModal(true)
    }

    return (
        <div className="App">
            <Router>
                <div className="vh-100 d-flex align-items-center justify-content-center bg-dark">
                    <Routes>
                        <Route path="/account/" element={<Account/>}/>
                        <Route path="/" element={<IndexPage toggleOpenModal={toggleOpenModal}/>}/>
                    </Routes>
                    <Modal openModal={openModal} onClose={()=> setOpenModal(false)} modalInner={modalInner}/>
                </div>
            </Router>
        </div>
    );
}

export default App;
