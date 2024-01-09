import React from 'react';
import Nav from './components/nav/Main';
import Footer from './components/footer/Footer';
import Rutas from './views/Rutas';


import { GrowlScene } from '@crystallize/react-growl';

import { BrowserRouter as Router} from 'react-router-dom'
const App = () =>(
    <Router>
        <Nav />
        <GrowlScene  />
        <Rutas/>
        <Footer />
    </Router>
);

export default App;
