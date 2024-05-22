import React, {useState} from 'react';
import {
    MDBInput,
    MDBBtn,
    MDBCheckbox,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCollapse,
    MDBNavbar,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem, MDBModalHeader, MDBTabsContent
} from 'mdb-react-ui-kit';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import FourKIcon from '@mui/icons-material/FourK';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import {

    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import {IconButton, SvgIcon} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

function Login() {
    const [openNav, setOpenNav] = useState(false);
    const useEffect = () => {
        useEffect()
    }
    const navigate = useNavigate();

    // Login -----------------------------------------------------------------------------------------------------------
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const onLogin = () => {
        let data = {
            username: user.username,
            password: user.password
        }
        axios.post('/login', data)
            .then(resp => {
                localStorage.setItem('token', resp.data.data)
                navigate('/sale')
            })
            .catch(error => {
                navigate('/')
                toggleOpenLogin()
            })
    }

    // Register -------------------------------------------------------------------------------------------------------
    const [usersSave, setUsersSave] = useState({
        username: '',
        password: '',
        branch: '',
        phoneNumber: '',
        idCard: '',
        genderId: '',
        facebook: '',
        email: '',
        address: '',
        fullName: '',
        birthday: ''
    })
    const onUserSave = () => {
        let data = {
            username: usersSave.username,
            password: usersSave.password,
            branch: usersSave.branch,
            phoneNumber: usersSave.phoneNumber,
            idCard: usersSave.idCard,
            genderId: usersSave.genderId,
            facebook: usersSave.facebook,
            email: usersSave.email,
            address: usersSave.address,
            fullName: usersSave.fullName,
            birthday: usersSave.birthday
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }

        axios.post('/register', data, {headers: headers})
            .then(() => {
                navigate('/')
                toggleOpenRegister()
            })
            .catch(error =>{
                let errorMessage = 'Đăng ký không thành công. Vui lòng thử lại sau.';
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
                window.alert(errorMessage);
                toggleOpenRegister()
            })


    }
    // -----------------------------------------------------------------------------------------------------------------
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);

    const toggleOpenLogin = () => setLoginModal(!loginModal)
    const toggleOpenRegister = () => setRegisterModal(!registerModal)

    const inputData = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
        setUsersSave({...usersSave, [e.target.name]: e.target.value})
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onLogin();
        }
    };
    return (
        <>
            <div className='background-container'>
                <MDBNavbar expand='lg' className='navbar-transparent'>
                    <MDBContainer fluid className='container-wrap'>
                        <MDBCollapse navbar open={openNav} className='justify-content-end mt-3 mb-3 '>
                            <MDBBtn to={'/ve-chung-toi'} rounded
                                    className={'text-white fw-bold btn-transparent'}
                                    style={{textTransform: 'none', fontSize: '14px'}}
                            >Sản phẩm
                            </MDBBtn>
                            <MDBBtn to={'/ve-chung-toi'} rounded
                                    className={'text-white fw-bold btn-transparent'}
                                    style={{textTransform: 'none', fontSize: '14px'}}
                            >Giải pháp
                            </MDBBtn>
                            <MDBDropdown size='lg' className='btn btn-success text-white fw-bold btn-transparent'
                                         style={{textTransform: 'none', fontSize: '14px'}}>
                                <MDBDropdownToggle tag='a' className='text-white' role='button'
                                                   style={{textTransform: 'none', fontSize: '14px'}}>
                                    Khách hàng
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className='dropdown-menu-custom mt-5'>
                                    <MDBDropdownItem link className='mt-3 ms-3 mx-3' href={'https://www.kiotviet.vn/khach-hang'}>Khách hàng
                                        NhungShop</MDBDropdownItem>
                                    <MDBDropdownItem link className='mt-3 ms-3 mb-3' href={'https://www.kiotviet.vn/gioithieukhachhang/'}>Giới thiệu khách
                                        hàng</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                            <MDBBtn to={'/ve-chung-toi'} rounded
                                    className={'text-white fw-bold btn-transparent'}
                                    style={{textTransform: 'none', fontSize: '14px'}}
                            >Phí dịch vụ
                            </MDBBtn>
                            <MDBBtn to={'/ve-chung-toi'} rounded
                                    className={'text-white fw-bold btn-transparent'}
                                    style={{textTransform: 'none', fontSize: '14px'}}
                            >Hỗ trợ
                            </MDBBtn>
                            <MDBDropdown size='lg' className='btn btn-success text-white fw-bold btn-transparent'
                                         style={{textTransform: 'none', fontSize: '14px'}}>
                                <MDBDropdownToggle tag='a' className='text-white' role='button'
                                                   style={{textTransform: 'none', fontSize: '14px'}}>
                                    Tin tức
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className='dropdown-menu-custom'>
                                    <MDBDropdownItem link className='mt-3 ms-3' href={'https://www.kiotviet.vn/blog/'}>Tin tức</MDBDropdownItem>
                                    <MDBDropdownItem link className='mt-3 ms-3' href={'https://www.kiotviet.vn/t/kinh-nghiem-kinh-doanh/'}>Kinh nghiệm kinh doanh</MDBDropdownItem>
                                    <MDBDropdownItem link className='mt-3 ms-3' href={'https://www.kiotviet.vn/t/cau-chuyen-thanh-cong/'}>Câu chuyện thành công</MDBDropdownItem>
                                    <MDBDropdownItem link className='mt-3 ms-3' href={'https://www.kiotviet.vn/t/meo-hay/'}>Mẹo hay</MDBDropdownItem>
                                    <MDBDropdownItem link className='mt-3 ms-3' href={'https://www.kiotviet.vn/t/khuyen-mai/'}>Khuyến mãi</MDBDropdownItem>
                                    <MDBDropdownItem link className='mt-3 ms-3' href={'https://www.kiotviet.vn/t/tin-tuc-ve-ki-ot-viet/'}>Tin tức về NhungShop</MDBDropdownItem>
                                    <MDBDropdownItem link className='mt-3 ms-3 mx-3' href={'https://www.kiotviet.vn/noi-dung-cap-nhat-sap-toi/'}>Thông tin cập nhật về
                                        NhungShop</MDBDropdownItem>
                                    <MDBDropdownItem link className='mt-3 ms-3 mb-3' href={'https://connect.kiotviet.vn/'}>Về sàn TMĐT NhungShop
                                        Connect</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                            <MDBBtn rounded
                                    className={'text-white fw-bold btn-transparent'}
                                    style={{textTransform: 'none', fontSize: '14px'}}
                                    href={'https://about.kiotviet.vn/ve-chung-toi/'}
                            >Về NhungShop
                            </MDBBtn>
                            <MDBBtn
                                onClick={toggleOpenLogin}
                                outline rounded color='white'
                                className={'text-white fw-bold ms-3'}
                                style={{textTransform: 'none', fontSize: '14px'}}
                            >
                                Đăng nhập
                            </MDBBtn>
                            <MDBBtn
                                onClick={toggleOpenRegister}
                                rounded color='white'
                                className={'d-flex justify-content-end text-dark fw-bold ms-3 float-end'}
                                style={{textTransform: 'none', fontSize: '14px'}}
                            >
                                Đăng ký
                            </MDBBtn>
                        </MDBCollapse>
                        <MDBModal tabIndex='-1' open={loginModal} onClose={() => setLoginModal(false)}>
                            <MDBModalDialog centered>
                                <MDBModalContent>
                                    <MDBModalBody>
                                        <MDBContainer className="text-start">
                                            <MDBModalTitle className="fw-bold mb-5 text-center">Sign in</MDBModalTitle>

                                            <MDBInput wrapperClass='mb-4 w-100' name={'username'} value={user.username}
                                                      onChange={inputData} onKeyPress={handleKeyPress} label='Username'
                                                      type='text' size="lg"/>

                                            <MDBInput wrapperClass='mb-4 w-100' onKeyPress={handleKeyPress}
                                                      name={'password'} value={user.password}
                                                      onChange={inputData} label='Password'
                                                      type='password' size="lg"/>
                                            <MDBRow>
                                                <MDBCol>
                                                    <MDBCheckbox className='mb-4' label='Ghi nhớ đăng nhập'/>
                                                </MDBCol>
                                                <MDBCol>
                                                    <MDBContainer className="text-end">
                                                        <Link
                                                            to={'https://www.youtube.com/watch?v=OE57pr7sPE4&list=RDMMcaXS47CiDN8&index=25'}>Quên
                                                            mật khẩu</Link>
                                                    </MDBContainer>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBContainer>
                                    </MDBModalBody>
                                    <MDBModalFooter>
                                        <MDBBtn size='lg' rounded color='secondary' onClick={toggleOpenLogin}>
                                            <b>Close</b>
                                        </MDBBtn>
                                        <MDBBtn size='lg'
                                                rounded color='primary'
                                                type='button'
                                                onClick={onLogin}>
                                            <b>Login</b>
                                        </MDBBtn>
                                    </MDBModalFooter>
                                </MDBModalContent>
                            </MDBModalDialog>

                        </MDBModal>
                        <MDBModal tabIndex='-1' open={registerModal} onClose={() => setRegisterModal(false)}>
                            <MDBModalDialog size='xl' centered>
                                <MDBModalContent>
                                    <MDBModalHeader>
                                        <MDBModalTitle><b>Registration Info</b></MDBModalTitle>
                                        <MDBBtn className='btn-close' color='none'
                                                onClick={toggleOpenRegister}></MDBBtn>
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <MDBTabsContent className="mt-3">
                                            <MDBRow>
                                                <MDBCol md="6">
                                                    <MDBRow>
                                                        <MDBCol md="5" className="ps-5 mt-2">
                                                            <h6><b>Họ và tên</b></h6>
                                                        </MDBCol>
                                                        <MDBCol md="7">
                                                            <MDBInput name={'fullName'}
                                                                      value={usersSave.fullName}
                                                                      onChange={inputData}
                                                                      className="form-control"
                                                                      type='text'/>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCol>
                                                <MDBCol md="6">
                                                    <MDBRow>
                                                        <MDBCol md="3" className="ps-5 mt-2">
                                                            <h6><b>Ngày sinh</b></h6>
                                                        </MDBCol>
                                                        <MDBCol md="8">
                                                            <MDBInput name={'birthday'}
                                                                      value={usersSave.birthday}
                                                                      onChange={inputData}
                                                                      className="form-control"
                                                                      type='date'/>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md="6">
                                                    <MDBRow>
                                                        <MDBCol md="5" className="ps-5 mt-4">
                                                            <h6><b>Điện thoại</b></h6>
                                                        </MDBCol>
                                                        <MDBCol md="7" className="mt-3">
                                                            <MDBInput name={'phoneNumber'}
                                                                      value={usersSave.phoneNumber}
                                                                      onChange={inputData}
                                                                      className="form-control"
                                                                      type='tel'/>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCol>
                                                <MDBCol md="6">
                                                    <MDBRow>
                                                        <MDBCol md="3" className="ps-5 mt-4">
                                                            <h6><b>Email</b></h6>
                                                        </MDBCol>
                                                        <MDBCol md="8" className="mt-3">
                                                            <MDBInput name={'email'}
                                                                      value={usersSave.email}
                                                                      onChange={inputData}
                                                                      className="form-control"
                                                                      type='email'/>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md="6">
                                                    <MDBRow>
                                                        <MDBCol md="5" className="ps-5 mt-4">
                                                            <h6><b>Địa chỉ</b></h6>
                                                        </MDBCol>
                                                        <MDBCol md="7" className="mt-3">
                                                            <MDBInput name={'address'}
                                                                      value={usersSave.address}
                                                                      onChange={inputData}
                                                                      className="form-control"
                                                                      type='text'/>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCol>
                                                <MDBCol md="6">
                                                    <MDBRow>
                                                        <MDBCol md="3" className="ps-5 mt-4">
                                                            <h6><b>CMND/CCCD</b></h6>
                                                        </MDBCol>
                                                        <MDBCol md="8" className="mt-3">
                                                            <MDBInput name={'idCard'}
                                                                      value={usersSave.idCard}
                                                                      onChange={inputData}
                                                                      className="form-control"
                                                                      type='text'/>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md="6">
                                                    <MDBRow>
                                                        <MDBCol md="5" className="ps-5 mt-4">
                                                            <h6><b>Giới tính</b></h6>
                                                        </MDBCol>
                                                        <MDBCol md="7" className="mt-3">
                                                            <MDBInput name={'genderId'}
                                                                      value={usersSave.genderId}
                                                                      onChange={inputData}
                                                                      className="form-control"
                                                                      type='text'/>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCol>
                                                <MDBCol md="6">
                                                    <MDBRow>
                                                        <MDBCol md="3" className="ps-5 mt-4">
                                                            <h6><b>Facebook</b></h6>
                                                        </MDBCol>
                                                        <MDBCol md="8" className="mt-3">
                                                            <MDBInput name={'facebook'}
                                                                      value={usersSave.facebook}
                                                                      onChange={inputData}
                                                                      className="form-control"
                                                                      type='url'/>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md="6">
                                                    <MDBRow>
                                                        <MDBCol md="5" className="ps-5 mt-4">
                                                            <h6><b>Tên tài khoản</b></h6>
                                                        </MDBCol>
                                                        <MDBCol md="7" className="mt-3">
                                                            <MDBInput name={'username'}
                                                                      value={usersSave.username}
                                                                      onChange={inputData}
                                                                      className="form-control"
                                                                      type='text'/>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCol>
                                                <MDBCol md="6">
                                                    <MDBRow>
                                                        <MDBCol md="3" className="ps-5 mt-4">
                                                            <h6><b>Mật khẩu</b></h6>
                                                        </MDBCol>
                                                        <MDBCol md="8" className="mt-3">
                                                            <MDBInput name={'password'}
                                                                      value={usersSave.password}
                                                                      onChange={inputData}
                                                                      className="form-control"
                                                                      type='password'/>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBModalFooter className="mt-5">
                                                <MDBBtn color='success' size='lg' rounded
                                                        onClick={onUserSave}><b>Register</b></MDBBtn>

                                                <MDBBtn color='dark' size='lg' rounded onClick={toggleOpenRegister}>
                                                    <b>Bỏ qua</b>
                                                </MDBBtn>

                                            </MDBModalFooter>
                                        </MDBTabsContent>
                                    </MDBModalBody>
                                </MDBModalContent>
                            </MDBModalDialog>
                        </MDBModal>
                    </MDBContainer>
                </MDBNavbar>
                <MDBContainer className='text-end'>
                    <MDBRow>
                        <MDBCol>

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </>

    )
}

export default Login;