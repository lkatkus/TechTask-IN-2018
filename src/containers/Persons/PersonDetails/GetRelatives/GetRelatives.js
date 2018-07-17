import {AgeFromDateString} from 'age-calculator';

const getRelatives = (current, persons) => {
    let currentPerson = current;
    let currentPersonAge = new AgeFromDateString(currentPerson.birthday).age;
    let lastnameRoot;
    let personRelatives = [];

    // Set lastnameRoot
    if(currentPerson.gender === 'female'){
        if(currentPerson.lastname.includes('ienė')){
            // Get married name
            let marriedName = currentPerson.lastname.substr(
                currentPerson.lastname.indexOf('-') + 1,
                currentPerson.lastname.length
            );
            lastnameRoot = marriedName.substr(0, marriedName.length - 4); /* All female names end with -ienė. Married name used for finding relatives */
        }else{
            if(currentPerson.lastname.includes('ytė') || currentPerson.lastname.includes('ūtė') || currentPerson.lastname.includes('utė')){
                lastnameRoot = currentPerson.lastname.substr(0, currentPerson.lastname.length - 3);
            }else if(currentPerson.lastname.includes('aitė')){
                lastnameRoot = currentPerson.lastname.substr(0, currentPerson.lastname.length - 4);
            }
        }
    }else{
        lastnameRoot = currentPerson.lastname.substr(0, currentPerson.lastname.length - 2); /* All male names end with -as,us,is */
    }

    personRelatives = persons.filter((person) => {
        if(person.lastname.includes(lastnameRoot)){
            // Check if not same person
            if(currentPerson.name === person.name && currentPerson.lastname === person.lastname && currentPerson.birthday === person.birthday){
                return null;
            }else{
                let personAge = new AgeFromDateString(person.birthday).age;
                let ageDifference = currentPersonAge - personAge;
                
                // SET RELATIONSHIP STATUS
                // CURRENT PERSON IS OLDER
                if(ageDifference >= 0){
                    // AGE DIFFERENCE 0-15
                    if(ageDifference >= 0 && ageDifference < 15){
                        // CURRENT PERSON - MALE
                        if(currentPerson.gender === 'male'){
                            // COMPARED PERSON - MALE
                            if(person.gender === 'male'){
                                person.relationship = 'brother';
                            }
                            // COMPARED PERSON - FEMALE
                            else{
                                // FEMALE IS MARRIED
                                if(person.lastname.includes('ienė')){
                                    if(person.lastname.substr(0, person.lastname.indexOf('-')).includes(lastnameRoot)){
                                        person.relationship = 'sister';
                                    }else{
                                        person.relationship = 'wife';
                                    };
                                }
                                // FEMALE IS NOT MARRIED
                                else{
                                    person.relationship = 'sister';
                                };
                            };
                        // CURRENT PERSON - FEMALE
                        }else{
                            // COMPARED PERSON - MALE
                            if(person.gender === 'male'){
                                // FEMALE IS MARRIED
                                if(currentPerson.lastname.includes('ienė')){
                                    if(person.lastname.substr(0, person.lastname.indexOf('-')).includes(lastnameRoot)){
                                        person.relationship = 'brother';
                                    }else{
                                        person.relationship = 'husband';
                                    }
                                }
                                // FEMALE IS NOT MARRIED
                                else{
                                    person.relationship = 'brother';
                                };
                            }
                            // COMPARED PERSON - FEMALE
                            else{
                                if(currentPerson.lastname.includes('ienė')){
                                    person.relationship = 'sister-in-law';
                                }else{
                                    person.relationship = 'sister';
                                };
                            };
                        };
            
                    // AGE DIFFERENCE 15-40
                    }else if(ageDifference >= 15 && ageDifference < 40){
                        // CURRENT PERSON - MALE
                        if(currentPerson.gender === 'male'){
                            // COMPARED PERSON - MALE
                            if(person.gender === 'male'){
                                person.relationship = 'son';                                
                            // COMPARED PERSON - FEMALE
                            }else{
                                if(person.lastname.includes('ienė')){
                                    if(person.lastname.substr(0, person.lastname.indexOf('-')).includes(lastnameRoot)){
                                        person.relationship = 'daughter';
                                    }else{
                                        person.relationship = 'daughter-in-law';
                                    };
                                }else{
                                    person.relationship = 'daughter';
                                }; 
                            };
                        // CURRENT PERSON - FEMALE
                        }else{
                            // COMPARED PERSON - MALE
                            if(person.gender === 'male'){
                                if(currentPerson.lastname.includes('ienė')){
                                    if(currentPerson.lastname.substr(0, person.lastname.indexOf('-')).includes(lastnameRoot)){
                                        person.relationship = 'nephew';
                                    }else{
                                        person.relationship = 'son';
                                    };
                                }else{
                                    person.relationship = 'nephew';
                                };                          
                            // COMPARED PERSON - FEMALE
                            }else{
                                if(currentPerson.lastname.includes('ienė')){
                                    if(person.lastname.includes('ienė')){
                                        if(person.lastname.substr(0, person.lastname.indexOf('-')).includes(lastnameRoot)){
                                            person.relationship = 'daughter';
                                        }else{
                                            person.relationship = 'daughter-in-law';
                                        };
                                    }else{
                                        person.relationship = 'daughter';
                                    };
                                }else{
                                    if(person.lastname.includes('ienė')){
                                        if(person.lastname.substr(0, person.lastname.indexOf('-')).includes(lastnameRoot)){
                                            person.relationship = 'niece';
                                        }else{
                                            person.relationship = 'niece-in-law';
                                        };
                                    }else{
                                        person.relationship = 'niece';
                                    };
                                };
                            };
                        }

                    // AGE DIFFERENCE > 40
                    }else if(ageDifference >= 40){
                        if(currentPerson.gender === 'male'){
                            if(person.gender === 'male'){
                                person.relationship = 'grandson';
                            }else{
                                person.relationship = 'granddaughter';
                            };
                        }else{
                            if(currentPerson.lastname.includes('ienė')){
                                if(person.gender === 'male'){
                                    person.relationship = 'grandson';
                                }else{
                                    person.relationship = 'granddaughter';
                                };
                            }else{
                                person.relationship = 'distant relative';
                            };
                        };
                    };

                }else{
                // CURRENT IS YOUNGER
                    ageDifference = -ageDifference;
                    // AGE DIFFERENCE 0-15
                    if(ageDifference > 0 && ageDifference < 15){
                        // CURRENT PERSON - MALE
                        if(currentPerson.gender === 'male'){
                            // COMPARED PERSON - MALE
                            if(person.gender === 'male'){
                                person.relationship = 'brother';
                            }
                            // COMPARED PERSON - FEMALE
                            else{
                                // FEMALE IS MARRIED
                                if(person.lastname.includes('ienė')){
                                    if(person.lastname.substr(0, person.lastname.indexOf('-')).includes(lastnameRoot)){
                                        person.relationship = 'sister';
                                    }else{
                                        person.relationship = 'wife';
                                    };
                                }
                                // FEMALE IS NOT MARRIED
                                else{
                                    person.relationship = 'sister';
                                };
                            };
                        // CURRENT PERSON - FEMALE
                        }else{
                            // COMPARED PERSON - MALE
                            if(person.gender === 'male'){
                                // FEMALE IS MARRIED
                                if(currentPerson.lastname.includes('ienė')){
                                    person.relationship = 'husband';
                                }
                                // FEMALE IS NOT MARRIED
                                else{
                                    person.relationship = 'brother';
                                };
                            }
                            // COMPARED PERSON - FEMALE
                            else{
                                if(currentPerson.lastname.includes('ienė')){
                                    person.relationship = 'sister-in-law';
                                }else{
                                    person.relationship = 'sister';
                                };
                            };
                        };

                    // AGE DIFFERENCE 15-40
                    }else if(ageDifference >= 15 && ageDifference < 40){
                        if(currentPerson.gender === 'male'){
                            if(person.gender === 'male'){
                                person.relationship = 'father';
                            }else{
                                if(person.lastname.includes('ienė')){
                                    if(person.lastname.substr(0, person.lastname.indexOf('-')).includes(lastnameRoot)){
                                        person.relationship = 'aunt';
                                    }else{
                                        person.relationship = 'mother';
                                    }
                                }else{
                                    person.relationship = 'aunt';
                                };
                            };
                        }else{
                            if(person.gender === 'male'){
                                if(currentPerson.lastname.includes('ienė')){
                                    person.relationship = 'father-in-law';
                                }else{
                                    person.relationship = 'father';
                                };
                            }else{
                                if(currentPerson.lastname.includes('ienė')){
                                    if(person.lastname.substr(0, person.lastname.indexOf('-')).includes(lastnameRoot)){
                                        person.relationship = 'aunt-in-law';
                                    }else{
                                        person.relationship = 'mother-in-law';
                                    }
                                }else{
                                    person.relationship = 'mother';
                                };
                            };
                        };
                    // AGE DIFFERENCE >40
                    }else if(ageDifference >= 40){
                        if(person.gender === 'male'){
                            person.relationship = 'grandfather';
                        }else{
                            if(person.lastname.includes('ienė')){
                                if(person.lastname.substr(0, person.lastname.indexOf('-')).includes(lastnameRoot)){
                                    person.relationship = 'great-aunt';
                                }else{
                                    person.relationship = 'grandmother';
                                }
                            }else{
                                person.relationship = 'great-aunt';
                            };
                        };
                    };
                }
                return person;
            }
        }
    });    
    return personRelatives;
};

export default getRelatives;