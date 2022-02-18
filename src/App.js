import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from 'react-router-dom';
import React from 'react';

const Home = () => <div><h1>Home</h1></div>;
const P404 = () => <div><h1>404 Not Found</h1></div>;

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