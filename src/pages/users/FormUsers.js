import {useEffect, useState} from "react";
import axios from "axios";
import '../../Custom.css'
import * as React from 'react';
import {
    Button,
} from "@mui/material";

import {
    MDBCol,
    MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle,
    MDBInput,
    MDBRow,
} from "mdb-react-ui-kit";
import {Link, useNavigate,} from "react-router-dom";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import {DataGrid} from "@mui/x-data-grid";


function FormUsers() {
    useEffect(() => {

        getList()
    }, []);

    const [listUsers, setListUsers] = useState([]);

    const navigate = useNavigate()

    // List
    const columns = [
        {
            field: 'id',
            headerName: 'Mã nhân viên',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'header-column'
        },
        {
            field: 'full_name',
            headerName: 'Tên nhân viên',
            width: 230,
            headerAlign: 'center',
            headerClassName: 'header-column'
        },
        {
            field: 'address',
            headerName: 'Địa chỉ',
            width: 150,
            align: 'right',
            headerAlign: 'center',
            headerClassName: 'header-column'
        },
        {
            field: 'birthday',
            headerName: 'Ngày sinh',
            width: 150,
            align: 'right',
            headerAlign: 'center',
            headerClassName: 'header-column'
        },
        {
            field: 'branch',
            headerName: 'Chi nhánh',
            width: 90,
            align: 'right',
            headerAlign: 'center',
            headerClassName: 'header-column'
        },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 130,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'header-column'
        },
        {
            field: 'facebook',
            headerName: 'Facebook',
            minWidth: 130,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'header-column'
        },
        {
            field: 'gender_name',
            headerName: 'Giới tính',
            minWidth: 130,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'header-column'
        },
        {
            field: 'id_card',
            headerName: 'Số CMND/CCCD',
            minWidth: 130,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'header-column'
        },
        {
            field: 'phone_number',
            headerName: 'Số điện thoại',
            minWidth: 130,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'header-column'
        },
        {
            field: 'start_day',
            headerName: 'Ngày vào làm',
            minWidth: 130,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'header-column'
        },
        {
            field: 'username',
            headerName: 'Tên người dùng',
            minWidth: 130,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'header-column'
        },
        {
            field: 'password',
            headerName: 'Mật khẩu',
            minWidth: 130,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'header-column'
        },

        {
            field: 'edit',
            headerName: 'Edit',
            sortable: false,
            width: 100,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'header-column',
            renderCell: (params) => (
                <strong>
                    <Link to={`/edit/${params.id}`} className='btn btn-success mb-2'>Edit</Link>

                </strong>
            ),

        },
        {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            width: 100,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'header-column',
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contaied"
                        size="smaill"
                        tabIndex={params.hasFocus ? 0 : -1}
                        style={{backgroundColor: '#bd1a29', color: 'white'}}
                        onClick={del}
                        value={params.id}
                    >Delete
                    </Button>
                </strong>
            ),
        },

    ];

//  Update Users -----------------------------------------------------------------------------------------------------

//  Delete Users -----------------------------------------------------------------------------------------------------

    const del = (e) => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.delete('/users/' + e.target.value, {headers: headers})
            .then(() => {
                console.log("XOA THANH CONG")
                getList()
            })
            .catch(e => {
                console.log(e)
                navigate("/")
            })
    }
//  List Users -------------------------------------------------------------------------------------------------------

    const getList = () => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/users', {headers: headers})
            .then(resp => {
                setListUsers(resp.data.data)
            })
            .catch(e => {
                console.log(e)
                navigate("/")
            })
    }

//  Save Users -------------------------------------------------------------------------------------------------------

    const [usersSave, setUsersSave] = useState({
        usersId: '',
        fullName: '',
        address: '',
        birthday: '',
        branch: '',
        email: '',
        facebook: '',
        genderId: '',
        idCard: '',
        phoneNumber: '',
        startDay: '',
        username: '',
        password: ''
    })
    const onSave = () => {
        let data = {
            fullName: usersSave.fullName,
            address: usersSave.address,
            birthday: usersSave.birthday,
            branch: usersSave.branch,
            email: usersSave.email,
            facebook: usersSave.facebook,
            genderId: usersSave.genderId,
            idCard: usersSave.idCard,
            phoneNumber: usersSave.phoneNumber,
            startDay: usersSave.startDay,
            username: usersSave.username,
            password: usersSave.password

        }

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }

        axios.post('/users', data, {headers: headers})
            .then(() => {
                getList()
                toggleOpen()
            })
    }

    // Modal
    const [centredModal, setCentredModal] = useState(false);

    const toggleOpen = () => setCentredModal(!centredModal);

    const inputData = (e) => {
        setUsersSave({...usersSave, [e.target.name]: e.target.value})
    }
//  Search ID ----------------------------------------------------------------------------------------------------------
    const [searchUsersId, setSearchUsersId] = useState({
        usersId: ''
    })
    const onSearchUsersId = () => {
        let data = {
            usersId: searchUsersId.usersId,
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/users/id/' + data.usersId, {headers: headers})
            .then(resp => {
                setListUsers(resp.data.data)
                console.log(data)
                // console.log(e.target.value)
            })
            .catch(e => {
                console.log(e)
            })

    }

//  Search name --------------------------------------------------------------------------------------------------------
    const [searchUsersName, setSearchUsersName] = useState({
        fullName: ''
    })
    const onSearchName = () => {
        let data = {
            fullName: searchUsersName.fullName,
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/users/name/' + data.fullName, {headers: headers})
            .then(resp => {
                setListUsers(resp.data.data)
                console.log(data)
                // console.log(e.target.value)
            })
            .catch(e => {
                console.log(e)
            })
    }
//----------------------------------------------------------------------------------------------------------------------
    const handleDropdownItemClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };
    return (
        <div
            style={{background: '#e8eaed', fontSize: "13px", fontFamily: "sans-serif,arial,helvetica", color: "black"}}>
            <MDBContainer>
                <MDBRow>
                    <MDBCol size='md-2 mt-3'>
                        <MDBRow>
                            <MDBCol>
                                <h5 style={{color: "black"}}><b>Nhân viên</b></h5>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol size='md-10 mt-3'>
                        <MDBRow>
                            <MDBCol size='md-5'>
                                <MDBDropdown className='mb-4'>
                                    <MDBDropdownToggle className='form-control text-dark bg-white text-start'>Theo mã,
                                        tên
                                        hàng</MDBDropdownToggle>
                                    <MDBDropdownMenu className='form-control'>
                                        <MDBContainer>
                                            <MDBDropdownItem className='mt-4 mb-2' onClick={handleDropdownItemClick}>
                                                <MDBRow>
                                                    <MDBCol md='8'>
                                                        <MDBInput className={"bg-white"}
                                                                  name={"usersId"}
                                                                  value={searchUsersId.usersId}
                                                                  onChange={inputData} wrapperClass='mb-4'
                                                                  label='Mã nhân viên' size='lg'
                                                                  type='text'/>
                                                    </MDBCol>
                                                    <MDBCol>
                                                        <MDBBtn className='btn btn-success mb-5 text-end'
                                                                onClick={onSearchUsersId}>Tìm kiếm</MDBBtn>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol md='8'>
                                                        <MDBInput className={"bg-white"}
                                                                  name={"fullName"}
                                                                  value={searchUsersName.fullName}
                                                                  onChange={inputData} wrapperClass='mb-4'
                                                                  label='Tên nhân viên'
                                                                  size='lg'
                                                                  type='text'/>
                                                    </MDBCol>
                                                    <MDBCol>
                                                        <MDBBtn className='btn btn-success mb-5 text-end'
                                                                onClick={onSearchName}>Tìm kiếm</MDBBtn>
                                                    </MDBCol>
                                                </MDBRow>

                                            </MDBDropdownItem>
                                        </MDBContainer>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBCol>
                            <MDBCol>
                                <MDBBtn onClick={toggleOpen} className='btn btn-success'>Thêm mới</MDBBtn>
                                <MDBModal tabIndex='-1' open={centredModal} onClose={() => setCentredModal(false)}>
                                    <MDBModalDialog size='xl'>
                                        <MDBModalContent>
                                            <MDBModalHeader>
                                                <MDBModalTitle><b>Thêm nhân viên</b></MDBModalTitle>
                                                <MDBBtn className='btn-close' color='none'
                                                        onClick={toggleOpen}></MDBBtn>
                                            </MDBModalHeader>
                                            <MDBModalBody>
                                                <MDBRow>
                                                    <MDBCol md="7">
                                                        <MDBRow>
                                                            <MDBCol md="4" className="ps-5 mt-2">
                                                                <h6><b>Tên nhân viên</b></h6>
                                                            </MDBCol>
                                                            <MDBCol md="8">
                                                                <MDBInput name={'fullName'}
                                                                          value={usersSave.fullName}
                                                                          onChange={inputData}
                                                                          className="form-control"
                                                                          type='text'/>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCol>
                                                    <MDBCol md="5">
                                                        <MDBRow>
                                                            <MDBCol md="4" className="ps-5 mt-2">
                                                                <h6><b>Số điện thoại</b></h6>
                                                            </MDBCol>
                                                            <MDBCol md="8">
                                                                <MDBInput name={'phoneNumber'}
                                                                          value={usersSave.phoneNumber}
                                                                          onChange={inputData}
                                                                          className="form-control"
                                                                          type='number'/>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol md="7">
                                                        <MDBRow>
                                                            <MDBCol md="4" className="ps-5 mt-2">
                                                                <h6><b>Tên nhân viên</b></h6>
                                                            </MDBCol>
                                                            <MDBCol md="8">
                                                                <MDBInput name={'address'}
                                                                          value={usersSave.address}
                                                                          onChange={inputData}
                                                                          className="form-control"
                                                                          type='text'/>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCol>
                                                    <MDBCol md="5">
                                                        <MDBRow>
                                                            <MDBCol md="4" className="ps-5 mt-2">
                                                                <h6><b>Số điện thoại</b></h6>
                                                            </MDBCol>
                                                            <MDBCol md="8">
                                                                <MDBInput name={'birthday'}
                                                                          value={usersSave.birthday}
                                                                          onChange={inputData}
                                                                          className="form-control"
                                                                          type='number'/>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol md="7">
                                                        <MDBRow>
                                                            <MDBCol md="4" className="ps-5 mt-2">
                                                                <h6><b>Tên nhân viên</b></h6>
                                                            </MDBCol>
                                                            <MDBCol md="8">
                                                                <MDBInput name={'branch'}
                                                                          value={usersSave.branch}
                                                                          onChange={inputData}
                                                                          className="form-control"
                                                                          type='text'/>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCol>
                                                    <MDBCol md="5">
                                                        <MDBRow>
                                                            <MDBCol md="4" className="ps-5 mt-2">
                                                                <h6><b>Số điện thoại</b></h6>
                                                            </MDBCol>
                                                            <MDBCol md="8">
                                                                <MDBInput name={'email'}
                                                                          value={usersSave.email}
                                                                          onChange={inputData}
                                                                          className="form-control"
                                                                          type='number'/>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol md="7">
                                                        <MDBRow>
                                                            <MDBCol md="4" className="ps-5 mt-2">
                                                                <h6><b>Tên nhân viên</b></h6>
                                                            </MDBCol>
                                                            <MDBCol md="8">
                                                                <MDBInput name={'facebook'}
                                                                          value={usersSave.facebook}
                                                                          onChange={inputData}
                                                                          className="form-control"
                                                                          type='text'/>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCol>
                                                    <MDBCol md="5">
                                                        <MDBRow>
                                                            <MDBCol md="4" className="ps-5 mt-2">
                                                                <h6><b>Số điện thoại</b></h6>
                                                            </MDBCol>
                                                            <MDBCol md="8">
                                                                <MDBInput name={'idCard'}
                                                                          value={usersSave.idCard}
                                                                          onChange={inputData}
                                                                          className="form-control"
                                                                          type='number'/>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol md="7">
                                                        <MDBRow>
                                                            <MDBCol md="4" className="ps-5 mt-2">
                                                                <h6><b>Tên nhân viên</b></h6>
                                                            </MDBCol>
                                                            <MDBCol md="8">
                                                                <MDBInput name={'genderId'}
                                                                          value={usersSave.genderId}
                                                                          onChange={inputData}
                                                                          className="form-control"
                                                                          type='text'/>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCol>
                                                    <MDBCol md="5">
                                                        <MDBRow>
                                                            <MDBCol md="4" className="ps-5 mt-2">
                                                                <h6><b>Số điện thoại</b></h6>
                                                            </MDBCol>
                                                            <MDBCol md="8">
                                                                <MDBInput name={'startDay'}
                                                                          value={usersSave.startDay}
                                                                          onChange={inputData}
                                                                          className="form-control"
                                                                          type='number'/>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol md="7">
                                                        <MDBRow>
                                                            <MDBCol md="4" className="ps-5 mt-2">
                                                                <h6><b>Tên nhân viên</b></h6>
                                                            </MDBCol>
                                                            <MDBCol md="8">
                                                                <MDBInput name={'username'}
                                                                          value={usersSave.username}
                                                                          onChange={inputData}
                                                                          className="form-control"
                                                                          type='text'/>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCol>
                                                    <MDBCol md="5">
                                                        <MDBRow>
                                                            <MDBCol md="4" className="ps-5 mt-2">
                                                                <h6><b>Số điện thoại</b></h6>
                                                            </MDBCol>
                                                            <MDBCol md="8">
                                                                <MDBInput name={'password'}
                                                                          value={usersSave.password}
                                                                          onChange={inputData}
                                                                          className="form-control"
                                                                          type='number'/>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBModalBody>
                                            <MDBModalFooter>
                                                <MDBBtn color='success' onClick={onSave}><b>Lưu</b></MDBBtn>
                                                <MDBBtn color='success' onClick={onSave}><b>Lưu & Thêm mới</b></MDBBtn>
                                                <MDBBtn color='success' onClick={onSave}><b>Lưu & Sao chép</b></MDBBtn>
                                                <MDBBtn color='dark' onClick={toggleOpen}>
                                                    <b>Bỏ qua</b>
                                                </MDBBtn>
                                            </MDBModalFooter>
                                        </MDBModalContent>
                                    </MDBModalDialog>
                                </MDBModal>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <MDBRow>
                            <MDBCol>
                                <div style={{height: 750, width: '100%'}}>
                                    <DataGrid
                                        rows={listUsers}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {page: 0, pageSize: 15},
                                            },
                                        }}
                                        pageSizeOptions={[5, 10]}
                                        style={{backgroundColor: '#f7f8f9', borderColor: "#9fbcd8"}}
                                    />
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default FormUsers


                