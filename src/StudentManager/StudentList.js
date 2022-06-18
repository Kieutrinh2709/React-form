import React, { Component } from 'react'
import { connect } from 'react-redux';
class StudentList extends Component {
    renderStudent = () => {
        const { students, onDeleteStudent, onSelectStudent } = this.props;
        return students.map((student, index) => {
            return (
                <tr key={index}>
                    <td>{student.id}</td>
                    <td>{student.hoTen}</td>
                    <td>{student.phone}</td>
                    <td>{student.email}</td>
                    <td>
                        <button
                            className="btn btn-success"
                            onClick={() => onSelectStudent(student)}
                        >
                            Update
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => onDeleteStudent(student.id)}
                        >
                            Delete
                        </button>
                    </td>

                </tr>
            )
        })
    }
    render() {
        return (
            <div className="container">
                <table className="table">
                    <thead>
                        <tr className="bg-dark text-white">
                            <th>Mã SV</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.renderStudent()}
                    </tbody>

                </table>


            </div>
        )
    }
}
const mapStatetoProps = (state) => {
    return {
        students: state.student.students
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteStudent: (studentId) => {
            const action = { type: "DELETE_STUDENT", studentId };
            dispatch(action);
        },
        onSelectStudent: (student) => {
            const action = { type: "SELECT_STUDENT", student };
            dispatch(action);
        },
    };
};


export default connect(mapStatetoProps, mapDispatchToProps)(StudentList)
