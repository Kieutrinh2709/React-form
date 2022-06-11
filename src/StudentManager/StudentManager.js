import React, { Component } from 'react'
import StudentForm from './StudentForm'
import StudentList from './StudentList'

export default class StudentManager extends Component {
  render() {
    return (
      <div className="container">
        <h3> Quản lý sinh viên</h3>
        <StudentForm/>
        <StudentList/>
        
      </div>
    )
  }
}
