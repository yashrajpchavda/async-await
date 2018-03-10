const users = [ {
  id: 1,
  name: "Yashraj",
  schoolId: 101
}, {
  id: 2,
  name: "Rupam",
  schoolId: 102
} ];

const grades = [ {
  id: 1,
  schoolId: 101,
  grade: 90
}, {
  id: 2,
  schoolId: 102,
  grade: 100
}, {
  id: 3,
  schoolId: 101,
  grade: 80
} ];

const getUser = ( id ) => {

  return new Promise( ( resolve, reject ) => {

    const user = users.find( user => user.id === id );

    if ( user ) {
      resolve( user );
    } else {
      reject( `Unable to find user with id ${id}` );
    }

  } );

};

const getGrades = ( schoolId ) => {

  return new Promise( ( resolve, reject ) => {

    const grade = grades.filter( grade => grade.schoolId === schoolId );
    resolve( grade );

  } );

};

// Rupal has a 100% in the class.
const getStatus = ( userId ) => {
  let user;
  return getUser( userId ).then( ( tempUser ) => {
    user = tempUser;
    return getGrades( user.schoolId ).then( ( userGrades ) => {
      const average = userGrades.map( grade => grade.grade ).reduce( ( a, b ) => a + b ) / userGrades.length;
      return `${user.name} has a ${average}% in the class.`;
    } );
  } );
};

const getStatusAlt = async ( userId ) => {
  const user = await getUser( userId );
  const userGrades = await getGrades( user.schoolId );

  const average = userGrades.map( grade => grade.grade ).reduce( ( a, b ) => a + b ) / userGrades.length;
  return `${user.name} has a ${average}% in the class.`;
};

getStatusAlt( 2 ).then( ( name ) => {
  console.log( name );
} ).catch( ( err ) => {
  console.log( err );
} );

// getStatus( 3 ).then( ( status ) => {
//   console.log( status );
// } ).catch( ( err ) => {
//   console.log( err );
// } );