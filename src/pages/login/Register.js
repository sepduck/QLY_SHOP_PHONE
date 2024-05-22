import React, {useEffect, useState} from 'react';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBIcon, MDBCard, MDBContainer, MDBCardImage, MDBCardBody, MDBRadio
} from 'mdb-react-ui-kit';
import axios from "axios";
import {Form, useNavigate} from "react-router-dom";
import {ListItem} from "@mui/material";


function MDBSelect(props: {
    size: string,
    data: [{ text: string, value: number }, { text: string, value: number }, { text: string, value: number }, {
        text: string,
        value: number
    }],
    className: string
}) {
    return null;
}

function Register() {
    const [role, setRole] = useState({
        roleId: '',
        roleName: ''
    })
    const [user, setUser] = useState({
        userId: '',
        address: '',
        birthday: '',
        branch: '',
        email: '',
        facebook: '',
        firstname: '',
        lastname: '',
        idCard: '',
        phoneNumber: '',
        password: '',
        sexId: '',
        username: '',
        startDay: '',
        tenRole: ''
    })
    const navigate = useNavigate();


    const inputData = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
        setRole({...role, [e.target.name]: e.target.value})
    }
    const onRegister = (e) => {
        let data = {
            address: user.address,
            birthday: user.birthday,
            branch: user.branch,
            email: user.email,
            facebook: user.facebook,
            firstname: user.firstname,
            idCard: user.idCard,
            lastname: user.lastname,
            password: user.password,
            phoneNumber: user.phoneNumber,
            sexId: user.sexId,
            startDay: user.startDay,
            username: user.username,
            roleId: role.roleId,
            roleName: role.roleName
        }

        axios.post('/register', data)
            .then(resp => {
                navigate('/login')
            })
    }
    return (
        <MDBContainer className='bg-white'>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol>

                    <MDBCard className='my-4'>

                        <MDBRow className='g-0'>

                            <MDBCol md='6' className="d-none d-md-block">
                                <MDBCardImage src='https://scontent.fhan5-6.fna.fbcdn.net/v/t39.30808-6/316167964_987077462248919_8643625162127548834_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeErJQVCZucZksR5y4Ew9mF1cXYLq1jIjpVxdgurWMiOlf9tPzQF1UKW4-10cRtNO8mczO-xrIWKcuptFry-clCX&_nc_ohc=YBl6_0462yYQ7kNvgHyywMX&_nc_ht=scontent.fhan5-6.fna&oh=00_AYAlChksz-fzHzJNK2Yy0br6qAhWUXAufV5KQdZJzsQO9A&oe=66557404'
                                              alt="Sample photo" className="rounded-start" fluid/>
                            </MDBCol>

                            <MDBCol md='6'>
                                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                                    <h3 className="mb-5 text-uppercase fw-bold">Registration</h3>

                                    <MDBRow>

                                        <MDBCol md='6'>
                                            <MDBInput name={'branch'} value={user.branch} onChange={inputData}
                                                      wrapperClass='mb-4' label='Chi nhanh' size='lg' type='text'/>
                                        </MDBCol>

                                        <MDBCol md='6'>
                                            <MDBInput name={'phoneNumber'} value={user.phoneNumber} onChange={inputData}
                                                      wrapperClass='mb-4' label='Dien thoai' size='lg' type='tel'/>
                                        </MDBCol>

                                    </MDBRow>

                                    <MDBInput name={'address'} value={user.address} onChange={inputData}
                                              wrapperClass='mb-4' label='Dia chi' size='lg' type='text'/>
                                    <MDBRow>

                                        <MDBCol md='6'>
                                            <MDBInput name={'email'} value={user.email} onChange={inputData}
                                                      wrapperClass='mb-4' label='email' size='lg' type='email'/>
                                        </MDBCol>

                                        <MDBCol md='6'>
                                            <MDBInput name={'birthday'} value={user.birthday} onChange={inputData}
                                                      wrapperClass='mb-4' label='Khu vuc' size='lg' type='date'/>
                                        </MDBCol>

                                    </MDBRow>

                                    <MDBInput name={'sexId'} value={user.sexId} onChange={inputData}
                                              wrapperClass='mb-4' label='Ngay sinh' size='lg' type='text'/>
                                    <MDBInput name={'facebook'} value={user.facebook} onChange={inputData}
                                              wrapperClass='mb-4' label='Xa phuong' size='lg' type='text'/>
                                    <MDBRow>

                                        <MDBCol md='6'>
                                            <MDBInput name={'username'} value={user.username} onChange={inputData}
                                                      wrapperClass='mb-4' label='Username' size='lg' type='text'/>
                                        </MDBCol>

                                        <MDBCol md='6'>
                                            <MDBInput name={'password'} value={user.password} onChange={inputData}
                                                      wrapperClass='mb-4' label='Password' size='lg' type='password'/>
                                        </MDBCol>

                                    </MDBRow>
                                    <MDBInput name={'idRole'} value={user.idRole} onChange={inputData}
                                              wrapperClass='mb-4' label='Role' size='lg' type='text'/>

                                    <div className="d-flex justify-content-end pt-3">
                                        <MDBBtn color='light' size='lg'>Reset all</MDBBtn>
                                        <MDBBtn onClick={onRegister} className='ms-2' color='warning' size='lg'>Submit
                                            form</MDBBtn>
                                    </div>

                                </MDBCardBody>

                            </MDBCol>
                        </MDBRow>

                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    )
}

export default Register;