// Dependency imports
import React from 'react';

// Component
const person = (props) => {
    return(
        <tr onClick={() => props.clicked(props.person)}>
            <td>{props.person.name}</td>
            <td>{props.person.lastname}</td>
            <td>{props.person.birthday}</td>
            {props.person.relationship ? <td>{props.person.relationship}</td> : null}
        </tr>
    )
}

export default person;