// Dependency imports
import React, {Component} from 'react';

// Component imports
import Layout from './hoc/Layout/Layout';
import Persons from './containers/Persons/Persons';

// Asset imports

// Component
class App extends Component{
    render(){
        return(
            <Layout>
                <Persons/>
            </Layout>
        )
    }
}

export default App;