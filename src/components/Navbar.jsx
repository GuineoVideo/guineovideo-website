import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
//import logo from '../assets/logo.png';


function Navbar() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  return (
    <>
        <nav className="navbar navbar-expand-lg p-0 m-0">
                <div className="container-fluid bg-dark">
	  		<Link className="navbar-brand" to="/"> <img className="img-fluid" alt="Logo" src="guineo.jpeg" style={{width:"100px"}}/> </Link>
                        <button 
                                        className="navbar-toggler" 
                                        type="button" 
                                        data-bs-toggle="collapse" 
                                        data-bs-target="#navbarNav" 
                                        aria-controls="navbarNav" 
                                        aria-expanded="false" 
                                        aria-label="Toggle navigation"
                        >
                        <span className="navbar-toggler-icon"></span>
                        </button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav ms-auto">
					<li className="nav-item">
						<Link className="nav-link text-white" to="/">Inicio</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white" to="/about">Sobre Nosotrxs</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white" to="/proyects">Proyectos</Link>
					</li>
				</ul>
			</div>
        	</div>
      	</nav>
    </>
  );
}
export default Navbar;
