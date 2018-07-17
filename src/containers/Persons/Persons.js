// Dependency imports
import React, {Component} from 'react';
import {connect} from 'react-redux'

// Component imports
import Person from './Person/Person';
import PersonDetails from './PersonDetails/PersonDetails';
import GetRelatives from './PersonDetails/GetRelatives/GetRelatives';
import * as actions from '../../store/actions/actions';

// Asset imports
import classes from './Persons.css';

// Component
class Persons extends Component{
    
    state = {
        currentPersonId: null,
        currentPage: 1,
        elementsPerPage: 10,
        sorting: {
            name: 1,
            lastname: 1,
            birthday: 1
        }
    };

    componentDidMount(){
        this.setState({
            numberOfPages: Math.ceil(this.props.persons.length / this.state.elementsPerPage)
        });
    };

    // Utilities
    sortBy = (param) => {
        let sortedArray = [...this.props.persons];
        let newSorting = {...this.state.sorting};
        let sortingDirection = newSorting[param];
        
        if(param === 'name' || param === 'lastname'){
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
            this.props.onSortPersons(sortedArray);
        });
    };
    
    showPaginationMenu = () => {
        let options = [5, 10, 15, 20];
        let optionSelectors = options.map((option) => {
            return(
                <div onClick={() => this.setElementsPerPage(option)}>
                    {option}
                </div>
            )
        });

        return(
            <div className={classes.paginationContainer}>
                <div>Person per page:</div>
                {optionSelectors}
                <div onClick={() => this.setElementsPerPage(this.props.persons.length)}>Show All</div>
            </div>
        )
    };

    setElementsPerPage = (newElementsPerPage) => {
        this.setState({
            currentPage: 1,
            elementsPerPage: newElementsPerPage,
            numberOfPages: Math.ceil(this.props.persons.length / newElementsPerPage)
        });
    };

    setPage = (nextPage) => {
        if(this.state.currentPage !== nextPage && nextPage !== 0 && nextPage <= this.state.numberOfPages){
            this.setState({
                currentPage: nextPage
            });
        };
    };

    showPageSelectMenu = () => {
        if(this.state.numberOfPages > 1){
            let pageSelectors = [];

            for(let i = 1; i <= this.state.numberOfPages; i++){
                pageSelectors.push((
                    <div className={i === this.state.currentPage ? classes.currentPage : ''} onClick={() => this.setPage(i)}>{i}</div>
                ));
            };
    
            return(
                <div className={classes.paginationContainer}>
                    <div onClick={() => this.setPage(this.state.currentPage-1)}>Previous</div>
                    {pageSelectors}
                    <div onClick={() => this.setPage(this.state.currentPage+1)}>Next</div>
                </div>
            )            
        }else{
            return null;
        }
    };
    
    // Methods
    setCurrentPerson = (person) => {
        this.props.addCurrentPerson(person);
        let persons = this.props.persons.map((person) => {
            return {...person};
        });
        let personRelatives = GetRelatives(person, persons);
        this.props.addCurrentPersonRelatives(personRelatives);

        this.setState({currentPersonId: Math.random()}); /* Force rerender of personDetails if other person details ar displayed */
    };
    
    displayPersonDetails = () => {
        if(this.props.currentPerson){
            return(
                <div className={classes.personDetailsContainer}>
                    <PersonDetails key={this.state.currentPersonId}/>
                </div>
            )
        }else{
            return null;
        };
    };
    
    showPersonsList = () => {
        let personsOnCurrentPage = [];
        let firstElement = this.state.currentPage * this.state.elementsPerPage - this.state.elementsPerPage;
        let lastElement = this.state.currentPage * this.state.elementsPerPage;
               
        for(let i = firstElement; i < lastElement; i++){
            if(this.props.persons[i]){
                personsOnCurrentPage.push(this.props.persons[i]);
            }else{
                break;
            }
        };

        return(
            <table>
                <thead>
                    <tr>
                        <th onClick={() => this.sortBy('name')}>Name</th>
                        <th onClick={() => this.sortBy('lastname')}>Lastname</th>
                        <th onClick={() => this.sortBy('birthday')}>Birthday</th>
                    </tr>
                </thead>
                <tbody>
                    {personsOnCurrentPage.map((person, i) => <Person key={i} person={person} clicked={this.setCurrentPerson}/>)}
                </tbody>
            </table>
        )
    };

    render(){
        return(
            <div className={classes.personsContainer}>
                <div className={classes.personListContainer}>
                    {this.showPaginationMenu()}
                    {this.showPersonsList()}
                    {this.showPageSelectMenu()}
                </div>
                {this.displayPersonDetails()}
            </div>
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
        onSortPersons: (sortedPersons) => dispatch(actions.sortPersons(sortedPersons)),
        addCurrentPerson: (person) => dispatch(actions.addCurrentPerson(person)),
        addCurrentPersonRelatives: (relatives) => dispatch(actions.addCurrentPersonRelatives(relatives))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);