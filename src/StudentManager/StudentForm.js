import React, { Component } from 'react'
import { connect } from 'react-redux';

class StudentForm extends Component {

  state = {
    values:{
      id: '',
      hoTen: '',
      phone: '',
      email: ''
    }, 
    errors:{
      id: '',
      hoTen: '',
      phone: '',
      email: ''
    }
    
  }
  handleChange = (evt) => {
    //lấy giá trị từ ô input
    let { value, name, type } = evt.target;

    let errMessage ='';

    //Kiểm tra trường rỗng
    if(value.trim() === '')
    {
      errMessage = 'Trường bắt buộc nhập!'
    }
    //Kiểm tra email
    if(type === 'email'){
      const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if(!regex.test(value)){
        errMessage = 'Email không đúng định dạng!'
      }
    }
    //Kiểm tra số điện thoại
    if(name === 'phone'){
      const regex = /^[0-9]+$/;
      if(!regex.test(value)){
        errMessage = 'Số điện thoại không hợp lệ!'
      }
    }

    let values = {...this.state.values, [name]:value};
    //cập nhật giá trị của values cho state
    let errors = {...this.state.errors, [name]:errMessage};
    //báo lỗi cho state
    this.setState({
      values:values,
      errors:errors
    }, () => {
      console.log(this.state);
    })

  }
  handleSubmit = (evt) =>{
    evt.preventDefault();
    if (this.props.student.id) {
      // Cập nhật
      this.props.onUpdateStudent(this.props.student.id, this.state.values);
    } else {
      // Tạo mới
      const id = Math.floor(Math.random() * 100);
      const student = { ...this.state.values, id };
      this.props.onAddStudent(student);
    }

  };
  componentDidUpdate(prevProps, prevState) {
    // Vì hàm componentDidUpdate luôn luôn được chạy sau khi props hoặc state thay đổi
    // Ta sẽ kiểm tra nếu props user thay đổi sẽ set state lại cho object values
    if (prevProps.student.id !== this.props.student.id) {
      this.setState({ values: { ...this.props.student } });
    }
  };

  renderSubmit=()=>{
    let validate = true;
    for(let key in this.state.errors){
      if(this.state.errors[key] !== '')
      {
        validate = false;
      }
    }
    if(validate){
      return <button type="submit" className="btn btn-success "  >Thêm sinh viên</button>
    }
    return <button type="submit" className="btn btn-success " disabled >Thêm sinh viên</button>
  }
  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header text-white bg-dark">
            <h3>Thông tin sinh viên</h3>
          </div>
          <div className="card-body ">
            <form onSubmit={this.handleSubmit}>
              <div className="row ">
                <div className="form-group col-6">
                  <label htmlFor="id" className="form-label">Mã SV</label>
                  <input type="text" id="id" name="id" className="form-control" value={this.state.values.id} onChange={this.handleChange} />
                  <p className="text-danger">
                    {this.state.errors.id}
                  </p>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="hoTen" className="form-label">Họ tên</label>
                  <input type="text" id="hoTen" name="hoTen" className="form-control" value={this.state.values.hoTen} onChange={this.handleChange} />
                  <p className="text-danger">
                    {this.state.errors.hoTen}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <label htmlFor="phone" className="form-label">Số điện thoại</label>
                  <input type="text" id="phone" name="phone" className="form-control" value={this.state.values.phone} onChange={this.handleChange} />
                  <p className="text-danger">
                    {this.state.errors.phone}
                  </p>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" id="email" name="email" className="form-control" value={this.state.values.email} onChange={this.handleChange} />
                  <p className="text-danger">
                    {this.state.errors.email}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                {this.renderSubmit()}
                {/* <button type="submit" className="btn btn-success "  >Thêm sinh viên</button>  */}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    student: state.student.selectedStudent,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddStudent: (student) => {
      const action = {
        type: 'ADD_STUDENT', 
        student
      }
      dispatch(action);
    },
    onUpdateStudent:(studentId, student)=>{
      const action = { 
        type: "UPDATE_STUDENT", 
        studentId, student };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)
