import React, { Component } from 'react'
import { connect } from 'react-redux';
class StudentList extends Component {
    renderStudent = () => {
        const { students } = this.props;
        return students.map((student, index) => {
            return (
                <tr key={index}>
                    <td>{student.maSV}</td>
                    <td>{student.hoTen}</td>
                    <td>{student.phone}</td>
                    <td>{student.email}</td>

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
        students: state.StudentReducer.students
    }
};


export default connect(mapStatetoProps, null)(StudentList)
