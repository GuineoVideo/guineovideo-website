import { Routes, Route } from 'react-router-dom';
import "./App.css";
import "./styles/custom.scss"

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home";
import About from "./pages/About";
import Proyects from "./pages/Proyects";

function App() {
  	return (
		<div className="container-fluid min-vh-100 d-flex justify-content-center align-items-start bg-secondary px-md-5 px-lg-0 pt-5">
			<div className="bg-primary rounded shadow-lg w-100" style={{ maxWidth: '850px', maxHeight: '90vh', overflowY: 'auto', overflowX: 'hidden'}}>
				<Navbar />
				<div className="d-flex p-1">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/proyects" element={<Proyects />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</div>
  	);
}

export default App;
