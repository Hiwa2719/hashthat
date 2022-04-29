import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import IndexPage from "./components/IndexPage";
import 'bootstrap/dist/css/bootstrap.min.css'
import Account from './components/Account'

function App() {
    return (
        <div className="App">
            <Router>
                <div className="vh-100 d-flex align-items-center justify-content-center bg-dark">
                    <Routes>
                        <Route path="/account/" element={<Account/>}/>
                        <Route path="/" element={<IndexPage/>}/>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
