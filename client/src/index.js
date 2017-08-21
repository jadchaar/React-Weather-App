import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import registerServiceWorker from 'registerServiceWorker';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'containers/styles/App.css';

// Good article on project structure: https://daveceddia.com/react-project-structure/

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
