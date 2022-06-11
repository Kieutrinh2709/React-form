const initialState ={
    students : [{
        maSV: 1851050155,
        hoTen: 'Hồ Thị Kiều Trinh',
        phone: '0917803105',
        email: 'Hothikieutrinh@gmail.com'}],
        // selectedStudent: null,
};


export const StudentReducer = (state = initialState, action) => {

  switch(action.type)
  {
    case 'ADD_STUDENT':{
      const students = [...state.students, action.student];
      return {...state, students};
    }
    // case "DELETE_STUDENT":{
    //   const students = state.students.filter(
    //     (student) => student.maSV !== action.studentId
    //   );
    //   return {...state, students};
    // }
    // case "SELECT_STUDENT":{
    //   return {...state, selectedStudent:action.student};

    // }
    // case "UPDATE_STUDENT":{
    //     const students = state.students.map((student) =>{
    //         if(student.maSV === action.studentId){
    //             return{...action.student, maSV: action.studentId};
    //         }
    //         return student;
    //     })
    //     return{...state, students, selectedStudent: {}};
    // }
    default:{
      return {...state};
      
    }
  }
  
};
