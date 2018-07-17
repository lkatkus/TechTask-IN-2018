// Dependency imports
import React, {Component} from 'react';
import {connect} from 'react-redux'

// Component imports
import Person from '../Person/Person';
import * as actions from '../../../store/actions/actions';
import GetRelatives from './GetRelatives/GetRelatives';

// Asset imports
import classes from './PersonDetails.css'

// Component
class PersonDetails extends Component{
    state = {
        sorting: {
            name: 1,
            lastname: 1,
            birthday: 1,
            relationship: 1
        },
        formData: {
            name: '',
            lastname: '',
            birthday: ''
        }
    }
    
    // Life-cycle hooks
    componentWillMount(){
        this.setState({
            formData: {
                name: this.props.currentPerson.name,
                lastname: this.props.currentPerson.lastname,
                birthday: this.props.currentPerson.birthday
            }
        });
    };

    componentDidMount(){
        document.querySelector('#personDetails').scrollIntoView({block: 'start', behavior: 'smooth'});
    };

    // Utilities
    sortBy = (param) => {
        let sortedArray = [...this.props.currentPersonRelatives];
        let newSorting = {...this.state.sorting};
        let sortingDirection = newSorting[param];

        if(param === 'name' || param === 'lastname' || param === 'relationship'){
            sortedArray.sort((a, b) => {
                if(a[param] > b[param]){
                    return 1 * sortingDirection;
                }
                if(a[param] < b[param]){
                    return -1 * sortingDirection;
                }else{
                    return 0;
                }
            })
        };
        if(param === 'birthday'){
            sortedArray.sort((a, b) => {
                let birthday1 = Date.parse(a[param]);
                let birthday2 = Date.parse(b[param]);
                if(birthday1 > birthday2){
                    return 1 * sortingDirection;
                }
                if(birthday1 < birthday2){
                    return -1 * sortingDirection;
                }else{
                    return 0;
                }
            })
        };

        newSorting[param] = -newSorting[param];

        this.setState({
            sorting: newSorting
        }, () => {
            this.props.onSortRelatives(sortedArray);
        });
    };

    onChangeHandler = (event) => {
        let newFormData = {...this.state.formData};
        newFormData[event.target.name] = event.target.value;
        this.setState({formData: newFormData});
    };

    formSubmitHandler = (event) => {
        event.preventDefault();

        let updatedPerson = {
            name: event.target.name.value,
            lastname: event.target.lastname.value,
            birthday: event.target.birthday.value
        };
        
        let persons = this.props.persons.map((person) => {
            return {...person};
        });

        let updatedPersonIndex = persons.findIndex((person) => {
            return JSON.stringify(person) === JSON.stringify(this.props.currentPerson);
        });

        persons[updatedPersonIndex] = updatedPerson;
        this.props.updateCurrentPerson(persons);
    };

    getCurrentDate = () => {
        let date = new Date();
        let today = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getDate()}`;
        return today;
    }

    
    // Methods
    setCurrentPerson = (person) => {
        this.props.addCurrentPerson(person);
        let persons = this.props.persons.map((person) => {
            return {...person};
        });
        let personRelatives = GetRelatives(person, persons);
        this.props.addCurrentPersonRelatives(personRelatives);
        
        this.setState({
            formData: {
                name: person.name,
                lastname: person.lastname,
                birthday: person.birthday
            }
        });
    };
    
    showRelatives = () => {
        if(this.props.currentPersonRelatives){
            return(
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => this.sortBy('name')}>Name</th>
                            <th onClick={() => this.sortBy('lastname')}>Lastname</th>
                            <th onClick={() => this.sortBy('birthday')}>Birthday</th>
                            <th onClick={() => this.sortBy('relationship')}>Relationship</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.currentPersonRelatives.map((person) => <Person person={person} clicked={this.setCurrentPerson}/>)}
                    </tbody>
                </table>
            )            
        }else{
            return <div>Loading...</div>
        }
    }
    
    removePersonDetails = () => {
        this.props.addCurrentPerson(null);
    };

    render(){
        return(
            <React.Fragment>
                <div id="personDetails" className={classes.personDetails}>
                    <div className={classes.personDetailsTitle}>
                        <h3>{this.props.currentPerson.name} {this.props.currentPerson.lastname} details</h3>
                        <div onClick={this.removePersonDetails}>Close</div>
                    </div>
                    <form className={classes.detailsForm} onSubmit={this.formSubmitHandler}>
                        <div className={classes.inputsContainer}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" minlength="2" maxlength="50" value={this.state.formData.name} onChange={this.onChangeHandler} required/>
                            </div>
                            <div>
                                <label htmlFor="lastname">Lastname</label>
                                <input type="text" id="lastname" name="lastname" minlength="2" maxlength="50" value={this.state.formData.lastname} onChange={this.onChangeHandler} required/>
                            </div>
                            <div>
                                <label htmlFor="name">Birthday</label>
                                <input type="date" id="birthday" name="birthday" max={this.getCurrentDate()} value={this.state.formData.birthday} onChange={this.onChangeHandler} required/>
                            </div>
                        </div>
                        <div className={classes.btnContainer}>
                            <input type="submit" value="Update"/>
                        </div>
                    </form>
                </div>
                <div className={classes.personRelatives}>
                    <h3>{this.props.currentPerson.gender === 'female' ? 'Her' : 'His'} relatives</h3>
                    {this.showRelatives()}
                </div>
            </React.Fragment>
        )
    };
}

// Redux setup
const mapStateToProps = (state) => {
    return{
        persons: state.persons,
        currentPerson: state.currentPerson.data,
        currentPersonRelatives: state.currentPerson.relatives
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        onSortRelatives: (relatives) => dispatch(actions.sortRelatives(relatives)),
        addCurrentPerson: (person) => dispatch(actions.addCurrentPerson(person)),
        updateCurrentPerson: (updatedPersons) => dispatch(actions.updateCurrentPerson(updatedPersons)),
        addCurrentPersonRelatives: (relatives) => dispatch(actions.addCurrentPersonRelatives(relatives))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);