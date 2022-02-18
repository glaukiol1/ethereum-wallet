import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from 'react-router-dom';
import React from 'react';

import Home from './routes/Home'
const P404 = () => <h1>Not found</h1> 
// We give each route either a target `component`, or we can send functions in `render` or `children` 
// that return valid nodes. `children` always returns the given node whether there is a match or not.
const App = () => (
  <Router>
    <div>
      <Link to="/">Home</Link>{' '}
      <Link to="/404">404</Link>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/*" element={<P404 />} />
      </Routes>
    </div>
  </Router>
);

export default App;