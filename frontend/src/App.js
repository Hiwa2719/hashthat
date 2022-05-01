import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import 'bootstrap/dist/css/bootstrap.min.css'
import Account from './pages/Account'
import Modal from './components/Modal'
import {useState} from "react";


function App() {
    const [openModal, setOpenModal] = useState(false)
    const [modalInner, setModalInner] = useState(null)
    const toggleOpenModal = (ob) => {
        setModalInner(ob)
        setOpenModal(true)
    }

    const onClose = () => setOpenModal(false)
    return (
        <div className="App">
            <Router>
                <div className="vh-100 d-flex align-items-center justify-content-center bg-dark">
                    <Routes>
                        <Route path="/account/" element={<Account toggleOpenModal={toggleOpenModal} onclose={onClose}/>}/>
                        <Route path="/" element={<IndexPage toggleOpenModal={toggleOpenModal} onclose={onClose}/>}/>
                    </Routes>
                    <Modal openModal={openModal} onClose={onClose} modalInner={modalInner}/>
                </div>
            </Router>
        </div>
    );
}

export default App;
