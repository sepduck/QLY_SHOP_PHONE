import React, {useEffect, useState} from 'react';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarNav,
    MDBNavbarLink,
    MDBNavbarItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
} from 'mdb-react-ui-kit';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {SvgIcon} from "@mui/material";


function FormEditProduct() {
    useEffect(() => {
        getProduct()
        onListGroupProduct()
        onListTrademark()
        onListLocation()
        onListProperties()
        onListUnit()
        onListSupplier()
        onAccountInfo()
    }, []);

    const [openNav, setOpenNav] = useState(false);
    const [openNavSecond, setOpenNavSecond] = useState(false);

    const navigate = useNavigate();

    // Find By Id ------------------------------------------------------------------------------------------------------
    let {id} = useParams()
    const getProduct = () => {
        axios.get('/product/findById/' + id)
            .then(resp => {
                setProductEdit(resp.data)
            })
            .catch(() => {
                navigate("/")
            })
    }

    // List group product ----------------------------------------------------------------------------------------------
    const [listGroupProduct, setListGroupProduct] = useState([]);
    const onListGroupProduct = () => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/group-product', {headers: headers})
            .then(resp => {
                setListGroupProduct(resp.data.data)
            })
            .catch(e => {
                console.log(e)
                navigate("/")
            })
    }

    // List trademark ----------------------------------------------------------------------------------------------
    const [listTrademark, setListTrademark] = useState([]);
    const onListTrademark = () => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/trademark', {headers: headers})
            .then(resp => {
                setListTrademark(resp.data.data)
            })
            .catch(e => {
                console.log(e)
                navigate("/")
            })
    }

    // List location --------------------------------------------------------------------------------------------------------
    const [listLocation, setListLocation] = useState([]);
    const onListLocation = () => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/location', {headers: headers})
            .then(resp => {
                setListLocation(resp.data.data)
            })
            .catch(e => {
                console.log(e)
                navigate("/")
            })
    }

    // List properties --------------------------------------------------------------------------------------------------------
    const [listProperties, setListProperties] = useState([]);
    const onListProperties = () => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/properties', {headers: headers})
            .then(resp => {
                setListProperties(resp.data.data)
            })
            .catch(e => {
                console.log(e)
                navigate("/")
            })
    }

    // List unit -------------------------------------------------------------------------------------------------------
    const [listUnit, setListUnit] = useState([]);
    const onListUnit = () => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/unit', {headers: headers})
            .then(resp => {
                setListUnit(resp.data.data)
            })
            .catch(e => {
                console.log(e)
                navigate("/")
            })
    }

    // List supplier -------------------------------------------------------------------------------------------------------
    const [listSupplier, setListSupplier] = useState([]);
    const onListSupplier = () => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/supplier', {headers: headers})
            .then(resp => {
                setListSupplier(resp.data.data)
            })
            .catch(e => {
                console.log(e)
                navigate("/")
            })
    }


    // Update product --------------------------------------------------------------------------------------------------
    const [groupProductId, setGroupProductId] = useState({
        groupProductId: '',

    });
    const [trademarkId, setTrademarkId] = useState({
        trademarkId: '',

    });
    const [locationId, setLocationId] = useState({
        locationId: '',

    });
    const [propertiesId, setPropertiesId] = useState({
        propertiesId: '',

    });
    const [unitId, setUnitId] = useState({
        unitId: '',

    });
    const [supplierId, setSupplierId] = useState({
        supplierId: '',

    });
    const [productEdit, setProductEdit] = useState({
        productId: '',
        productName: '',
        price: '',
        capitalPrice: '',
        inventory: '',
        groupProductId: groupProductId.groupProductId,
        trademarkId: trademarkId.trademarkId,
        locationId: locationId.locationId,
        weight: '',
        propertiesId: propertiesId.propertiesId,
        unitId: unitId.unitId,
        statusId: '',
        supplierId: supplierId.supplierId
    })
    const onSave = (e) => {
        let data = {
            productId: productEdit.productId,
            productName: productEdit.productName,
            price: productEdit.price,
            capitalPrice: productEdit.capitalPrice,
            inventory: productEdit.inventory,
            groupProductId: productEdit.groupProductId,
            trademarkId: productEdit.trademarkId,
            locationId: productEdit.locationId,
            weight: productEdit.weight,
            propertiesId: productEdit.propertiesId,
            unitId: productEdit.unitId,
            statusId: productEdit.statusId,
            supplierId: productEdit.supplierId
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }

        axios.post('/product', data, {headers: headers})
            .then(() => {
                navigate('/product')
            })
    }
    // Input data ------------------------------------------------------------------------------------------------------
    const inputData = (e) => {
        setProductEdit({...productEdit, [e.target.name]: e.target.value})
        setGroupProductId({...groupProductId, [e.target.name]: e.target.value})
        setTrademarkId({...trademarkId, [e.target.name]: e.target.value})
        setLocationId({...locationId, [e.target.name]: e.target.value})
        setPropertiesId({...propertiesId, [e.target.name]: e.target.value})
        setUnitId({...unitId, [e.target.name]: e.target.value})
        setSupplierId({...supplierId, [e.target.name]: e.target.value})
    }

    // Account Information ---------------------------------------------------------------------------------------------
    const [userInfo, setUserInfo] = useState({});
    const onAccountInfo = () => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/info', {headers: headers})
            .then(resp => {
                setUserInfo(resp.data)
                console.log(resp.data)
            })
    }

    // Xóa token -------------------------------------------------------------------------------------------------------
    const [setLogout] = useState({});
    const handleLogout = () => {

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.post('/log-out', {headers: headers})
            .then(resp => {
                setLogout(resp.data)
                console.log(resp.data)
                localStorage.removeItem('token'); // Xóa token sau khi đăng xuất
                window.alert("Đăng xuất thành công")
                navigate('/')
            })
            .catch(() => {
                navigate('/product')
                console.log("Lỗi đăng xuất")
            })

    };
    //------------------------------------------------------------------------------------------------------------------
    return (<div className='customDiv' style={{height: '950px'}}>
            <MDBNavbar expand='lg' light bgColor='light' style={{fontSize: '13px'}} className='navbar'>
                <MDBContainer>
                    <MDBNavbarBrand href='#' className={'fs-6'}>
                        <img
                            src='https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/448430595_122166478826085181_3519841584373574767_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=hGiVbQdBb14Q7kNvgEBEJwv&_nc_ht=scontent-hkg4-1.xx&oh=00_AYDAV8ZoNPsI55lIXlonYXKMvzLVlbZeLluPu0pL6E6raA&oe=667326CB'
                            alt='Logo' style={{height: '30px'}}/> {/* Điều chỉnh chiều cao của logo theo ý muốn */}
                    </MDBNavbarBrand>
                    <MDBNavbarToggler>
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenNavSecond(!openNavSecond)}
                        >
                        <MDBIcon icon='bars' fas/>
                    </MDBNavbarToggler>
                    <MDBCollapse navbar open={openNavSecond} className='d-flex justify-content-end'>
                        <MDBNavbarNav>
                            <MDBNavbarLink href='#' className='text-dark'>
                                <SvgIcon>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1}
                                        stroke="black"
                                        className='mx-2'
                                        style={{fill: 'yellow'}} // Đổi ngược lại màu
                                    >
                                        <path
                                            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M8.5 8c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8M12 18c-2.28 0-4.22-1.66-5-4h10c-.78 2.34-2.72 4-5 4m3.5-7c-.83 0-1.5-.67-1.5-1.5S14.67 8 15.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5"></path>
                                    </svg>
                                </SvgIcon>
                                Nguồn hàng giá tốt
                            </MDBNavbarLink>
                            <MDBNavbarLink href='#' className='text-dark'>
                                <SvgIcon>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1}
                                        stroke="currentColor"
                                        className='mx-2'

                                    >
                                        <path
                                            d="M21.27 10.9c-1.21-.33-2.31-1.46-2.29-2.89.01-.56-.4-1.02-.96-1.01C15.83 7.03 14 5.22 14 3.02c0-.49-.35-.9-.84-.96C6.53 1.22 2 6.81 2 12c0 5.52 4.48 10 10 10 5.61 0 10.11-4.62 10-10.18-.01-.44-.31-.81-.73-.92M8.5 15c-.83 0-1.5-.67-1.5-1.5S7.67 12 8.5 12s1.5.67 1.5 1.5S9.33 15 8.5 15m2-5C9.67 10 9 9.33 9 8.5S9.67 7 10.5 7s1.5.67 1.5 1.5-.67 1.5-1.5 1.5m4.5 6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1"></path>

                                    </svg>
                                </SvgIcon>
                                Chủ đề
                            </MDBNavbarLink>
                            <MDBNavbarLink href='#' className='text-dark'>
                                <SvgIcon>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1}
                                        stroke="currentColor"
                                        className='mx-2'

                                    >
                                        <path
                                            d="M16 13c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4zm-12-.83V4h11v7H5.17zM22 7c0-.55-.45-1-1-1h-2v9H6v2c0 .55.45 1 1 1h11l4 4z"></path>
                                    </svg>
                                </SvgIcon>
                                Hỗ trợ
                            </MDBNavbarLink>
                            <MDBNavbarLink href='#' className='text-dark me-5'>
                                <SvgIcon>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1}
                                        stroke="currentColor"
                                        className='mx-2'

                                    >
                                        <path
                                            d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H6l-2 2V4h16z"></path>
                                    </svg>
                                </SvgIcon>
                                Góp ý
                            </MDBNavbarLink>
                            <MDBDropdown size='lg' className=' fw-bold mt-2'
                                         style={{textTransform: 'none', fontSize: '14px'}}>

                                <MDBDropdownToggle tag='a' className='bg-white text-dark'
                                                   style={{textTransform: 'none', fontSize: '14px'}}>
                                    {userInfo.fullname}
                                    <SvgIcon>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                            className='mx-2'
                                        >
                                            <path
                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20"></path>
                                        </svg>
                                    </SvgIcon>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className='dropdown-menu-custom bg-white mt-5'>
                                    <MDBDropdownItem link className='mt-3 ms-3 mx-3'>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                className='mx-2'
                                            >
                                                <path
                                                    d="M21 10h-8.35C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H13l2 2 2-2 2 2 4-4.04zM7 15c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3"></path>
                                            </svg>
                                        </SvgIcon>
                                        <a><b className='me-5'>Thay đổi mật khẩu</b></a></MDBDropdownItem>
                                    <MDBDropdownItem link className='mt-3 ms-3 mb-3' onClick={handleLogout}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                className='mx-2'
                                            >
                                                <path
                                                    d="m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"></path>
                                            </svg>
                                        </SvgIcon>
                                        <b>Đăng xuất</b>
                                    </MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            <MDBNavbar expand='lg' bgColor='primary'>
                <MDBContainer>
                    <MDBCollapse navbar open={openNav}>
                        <MDBNavbarNav>
                            <MDBNavbarItem>
                                <MDBDropdown group className='shadow-0'>
                                    <MDBDropdownToggle className={'bg-primary fw-bold text-white'}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                className='mx-2'
                                            >
                                                <path
                                                    d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3"></path>
                                            </svg>
                                        </SvgIcon>
                                        Tổng quan
                                    </MDBDropdownToggle>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown group className='shadow-0'>
                                    <MDBDropdownToggle className={'bg-primary fw-bold text-white'}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                className='mx-2'
                                            >
                                                <path
                                                    d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2m0 14H4v-6h16zm0-10H4V6h16z"></path>
                                            </svg>
                                        </SvgIcon>
                                        Hàng hoá
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className={' bg-primary text-white mt-2'}>
                                        <MDBDropdownItem href={'/product'} link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2m0 14H3V5h18zm-2-9H8v2h11zm0 4H8v2h11zM7 8H5v2h2zm0 4H5v2h2z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Danh mục</b>
                                        </a></MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b className='me-5'>Thiết lập giá</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M17 2H7c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 4H7V4h10zm3 16H4c-1.1 0-2-.9-2-2v-1h20v1c0 1.1-.9 2-2 2m-1.47-11.81C18.21 9.47 17.49 9 16.7 9H7.3c-.79 0-1.51.47-1.83 1.19L2 18h20zM9.5 16h-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h1c.28 0 .5.22.5.5s-.22.5-.5.5m0-2h-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h1c.28 0 .5.22.5.5s-.22.5-.5.5m0-2h-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h1c.28 0 .5.22.5.5s-.22.5-.5.5m3 4h-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h1c.28 0 .5.22.5.5s-.22.5-.5.5m0-2h-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h1c.28 0 .5.22.5.5s-.22.5-.5.5m0-2h-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h1c.28 0 .5.22.5.5s-.22.5-.5.5m3 4h-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h1c.28 0 .5.22.5.5s-.22.5-.5.5m0-2h-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h1c.28 0 .5.22.5.5s-.22.5-.5.5m0-2h-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h1c.28 0 .5.22.5.5s-.22.5-.5.5"></path>

                                                </svg>
                                            </SvgIcon>
                                            <b>Kiểm kho</b></a></MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBDropdown group className='shadow-0'>
                                    <MDBDropdownToggle className={'bg-primary fw-bold text-white'}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                className='mx-2'
                                            >
                                                <path
                                                    d="M9 3 5 6.99h3V14h2V6.99h3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99z"></path>
                                            </svg>
                                        </SvgIcon>
                                        Giao dịch
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className={'bg-primary mt-2'}>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.11-.9-2-2-2H4c-1.11 0-2 .89-2 2v10c0 1.1.89 2 2 2H0v2h24v-2zm-7-3.53v-2.19c-2.78 0-4.61.85-6 2.72.56-2.67 2.11-5.33 6-5.87V7l4 3.73z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Đặt hàng</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm1 10h-4v1h3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1h-1v1h-2v-1H9v-2h4v-1h-3c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h1V9h2v1h2zm-2-4V3.5L17.5 8z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Hóa đơn</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2m-9-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3m13-6v11c0 1.1-.9 2-2 2H4v-2h17V7z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Vận đơn</b>
                                        </a></MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2m10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2m-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03L21 4.96 19.25 4l-3.7 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7zM12 2l4 4-4 4-1.41-1.41L12.17 7H8V5h4.17l-1.59-1.59z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Trả hàng</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m0 15-5-5h3V9h4v4h3z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Nhập hàng</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M19 3H4.99c-1.11 0-1.98.9-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19zM8 11h2v3h4v-3h2l-4-4z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b className='me-5'>Trả hàng nhập</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M8 4v1.45l2 2V4h4v4h-3.45l2 2H14v1.45l2 2V10h4v4h-3.45l2 2H20v1.45l2 2V4c0-1.1-.9-2-2-2H4.55l2 2zm8 0h4v4h-4zM1.27 1.27 0 2.55l2 2V20c0 1.1.9 2 2 2h15.46l2 2 1.27-1.27zM10 12.55 11.45 14H10zm-6-6L5.45 8H4zM8 20H4v-4h4zm0-6H4v-4h3.45l.55.55zm6 6h-4v-4h3.45l.55.54zm2 0v-1.46L17.46 20z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Xuất hủy</b></a>
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown group className='shadow-0'>
                                    <MDBDropdownToggle className={'bg-primary fw-bold text-white'}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                className='mx-2'
                                            >
                                                <path
                                                    d="M11.99 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10m3.61 6.34c1.07 0 1.93.86 1.93 1.93 0 1.07-.86 1.93-1.93 1.93-1.07 0-1.93-.86-1.93-1.93-.01-1.07.86-1.93 1.93-1.93m-6-1.58c1.3 0 2.36 1.06 2.36 2.36 0 1.3-1.06 2.36-2.36 2.36s-2.36-1.06-2.36-2.36c0-1.31 1.05-2.36 2.36-2.36m0 9.13v3.75c-2.4-.75-4.3-2.6-5.14-4.96 1.05-1.12 3.67-1.69 5.14-1.69.53 0 1.2.08 1.9.22-1.64.87-1.9 2.02-1.9 2.68M11.99 20c-.27 0-.53-.01-.79-.04v-4.07c0-1.42 2.94-2.13 4.4-2.13 1.07 0 2.92.39 3.84 1.15-1.17 2.97-4.06 5.09-7.45 5.09"></path>
                                            </svg>
                                        </SvgIcon>
                                        Đối tác
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className={'bg-primary mt-2'}>
                                        <MDBDropdownItem link href="/customer"><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Khách hàng</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link href={'/supplier'}><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24C14.5 5.27 15 6.58 15 8s-.5 2.73-1.33 3.76c.42.14.86.24 1.33.24m-6 1c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Nhà cung cấp</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M20.5 4c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 6c1.86.5 4 .83 6 1v12h2v-6h2v6h2V7c2-.17 4.14-.5 6-1zM12 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2M7 24h2v-2H7zm4 0h2v-2h-2zm4 0h2v-2h-2z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b className='me-5'>Đối tác giao hàng</b></a>
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown group className='shadow-0'>
                                    <MDBDropdownToggle className={'bg-primary fw-bold text-white'}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                className='mx-2'
                                            >
                                                <path
                                                    d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5"></path>
                                            </svg>
                                        </SvgIcon>
                                        Nhân viên
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className={'bg-primary mt-2'}>
                                        <MDBDropdownItem link href="/employee"><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Nhân viên</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zM9 14H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm-8 4H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Chấm công</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm1 10h-4v1h3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1h-1v1h-2v-1H9v-2h4v-1h-3c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h1V9h2v1h2zm-2-4V3.5L17.5 8z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b className='me-5'>Bảng tính lương</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2m-8 6H8v1h3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1h-1v1H8v-1H6v-2h4v-1H7c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1h1V7h2v1h2zm4 6.25-2-2h4zM14 10l2-2 2 2z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Bảng hoa hồng</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Thiết lập chung</b></a>
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown group className='shadow-0'>
                                    <MDBDropdownToggle>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                className='mx-2'
                                            >
                                                <path
                                                    d="M17.5 4.5c-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5-1.45 0-2.99.22-4.28.79C1.49 5.62 1 6.33 1 7.14v11.28c0 1.3 1.22 2.26 2.48 1.94.98-.25 2.02-.36 3.02-.36 1.56 0 3.22.26 4.56.92.6.3 1.28.3 1.87 0 1.34-.67 3-.92 4.56-.92 1 0 2.04.11 3.02.36 1.26.33 2.48-.63 2.48-1.94V7.14c0-.81-.49-1.52-1.22-1.85-1.28-.57-2.82-.79-4.27-.79M21 17.23c0 .63-.58 1.09-1.2.98-.75-.14-1.53-.2-2.3-.2-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5.92 0 1.83.09 2.7.28.46.1.8.51.8.98z"></path>
                                            </svg>
                                        </SvgIcon>
                                        Sổ quỹ
                                    </MDBDropdownToggle>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown group className='shadow-0'>
                                    <MDBDropdownToggle>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                className='mx-2'
                                            >
                                                <path
                                                    d="M11.38 17.41c.78.78 2.05.78 2.83 0l6.21-6.21c.78-.78.78-2.05 0-2.83L12.63.58C12.25.21 11.74 0 11.21 0H5C3.9 0 3 .9 3 2v6.21c0 .53.21 1.04.59 1.41zM7.25 3c.69 0 1.25.56 1.25 1.25S7.94 5.5 7.25 5.5 6 4.94 6 4.25 6.56 3 7.25 3"></path>
                                            </svg>
                                        </SvgIcon>
                                        Báo cáo
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className={'bg-primary mt-2'}>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M21.27 10.9c-1.21-.33-2.31-1.46-2.29-2.89.01-.56-.4-1.02-.96-1.01C15.83 7.03 14 5.22 14 3.02c0-.49-.35-.9-.84-.96C6.53 1.22 2 6.81 2 12c0 5.52 4.48 10 10 10 5.61 0 10.11-4.62 10-10.18-.01-.44-.31-.81-.73-.92M8.5 15c-.83 0-1.5-.67-1.5-1.5S7.67 12 8.5 12s1.5.67 1.5 1.5S9.33 15 8.5 15m2-5C9.67 10 9 9.33 9 8.5S9.67 7 10.5 7s1.5.67 1.5 1.5-.67 1.5-1.5 1.5m4.5 6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Cuối ngày</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-9 8.3c0 .93-.64 1.71-1.5 1.93V19H8v-6.77c-.86-.22-1.5-1-1.5-1.93V6.5c0-.28.22-.5.5-.5s.5.22.5.5V9h.75V6.5c0-.28.22-.5.5-.5s.5.22.5.5V9H10V6.5c0-.28.23-.5.5-.5.28 0 .5.22.5.5zm4.58 2.29-.08.03V19H14v-6.38l-.08-.04c-.97-.47-1.67-1.7-1.67-3.18 0-1.88 1.13-3.4 2.5-3.4 1.38 0 2.5 1.53 2.5 3.41 0 1.48-.7 2.71-1.67 3.18"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Bán hàng</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M21.5 14.98c-.02 0-.03 0-.05.01C21.2 13.3 19.76 12 18 12c-1.4 0-2.6.83-3.16 2.02C13.26 14.1 12 15.4 12 17c0 1.66 1.34 3 3 3l6.5-.02c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5M10 4.26v2.09C7.67 7.18 6 9.39 6 12c0 1.77.78 3.34 2 4.44V14h2v6H4v-2h2.73C5.06 16.54 4 14.4 4 12c0-3.73 2.55-6.85 6-7.74M20 6h-2.73c1.43 1.26 2.41 3.01 2.66 5h-2.02c-.23-1.36-.93-2.55-1.91-3.44V10h-2V4h6z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Đặt hàng</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M8 11H4V6h4zm6 0h-4V6h4zm6 0h-4V6h4zM8 18H4v-5h4zm6 0h-4v-5h4zm6 0h-4v-5h4z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Hàng hóa</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Khách hàng</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91M4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29M20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m4 3.43c0-.81-.48-1.53-1.22-1.85-.85-.37-1.79-.58-2.78-.58-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Nhà cung cấp</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Nhân viên</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4m7.76-9.64-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27M20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b className='me-5'>Kênh bán hàng</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M12 14.67 3.41 6.09 2 7.5l8.5 8.5H4v2h16v-2h-6.5l5.15-5.15c.26.1.55.15.85.15 1.38 0 2.5-1.12 2.5-2.5S20.88 6 19.5 6 17 7.12 17 8.5c0 .35.07.67.2.97z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Tài chính</b></a>
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown group className='shadow-0 '>
                                    <MDBDropdownToggle className={'bg-primary fw-bold text-white '}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                className='mx-2'
                                            >
                                                <path
                                                    d="m17.21 9-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1zM9 9l3-4.4L15 9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2"></path>
                                            </svg>
                                        </SvgIcon>
                                        Bán online
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className={'bg-primary mt-2'}>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8zm-2 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m4 8H8v-.57c0-.81.48-1.53 1.22-1.85.85-.37 1.79-.58 2.78-.58.99 0 1.93.21 2.78.58.74.32 1.22 1.04 1.22 1.85z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Bán hàng Facebook</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M17 12h-5v5h5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1zm3 18H5V8h14z"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b className='me-5'>Bán hàng trên sàn TMĐT</b></a>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link><a className={'text-white'}>
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M19.3 16.9c.4-.7.7-1.5.7-2.4 0-2.5-2-4.5-4.5-4.5S11 12 11 14.5s2 4.5 4.5 4.5c.9 0 1.7-.3 2.4-.7l3.2 3.2 1.4-1.4zm-3.8.1c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5M12 20v2C6.48 22 2 17.52 2 12S6.48 2 12 2c4.84 0 8.87 3.44 9.8 8h-2.07c-.64-2.46-2.4-4.47-4.73-5.41V5c0 1.1-.9 2-2 2h-2v2c0 .55-.45 1-1 1H8v2h2v3H9l-4.79-4.79C4.08 10.79 4 11.38 4 12c0 4.41 3.59 8 8 8"></path>
                                                </svg>
                                            </SvgIcon>
                                            <b>Website bán hàng</b></a>
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem className=''>
                                <MDBDropdown group className='shadow-0 text-end'>
                                    <MDBDropdownToggle className="bg-primary fw-bold text-white">
                                        <a href='/sale' className="text-white">
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                    className='mx-2'
                                                >
                                                    <path
                                                        d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2M1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2"></path>
                                                </svg>
                                            </SvgIcon>
                                            Bán hàng</a>
                                    </MDBDropdownToggle>
                                </MDBDropdown>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md={2}></MDBCol>
                    <MDBCol md={8} className='mt-5 bg-white rounded-5'>
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol className='mt-3 ms-3 mb-4'>
                                    <h4><b>Sửa hàng</b></h4>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="7" className='mt-3'>
                                    <MDBRow>
                                        <MDBCol md="4" className="ps-5 mt-2">
                                            <h6><b>Tên hàng</b></h6>
                                        </MDBCol>
                                        <MDBCol md="8">
                                            <MDBInput name={'productName'}
                                                      value={productEdit.productName}
                                                      onChange={inputData}
                                                      className="form-control"
                                                      type='text'/>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                                <MDBCol md="5" className='mt-3'>
                                    <MDBRow>
                                        <MDBCol md="4" className="ps-5 mt-2">
                                            <h6><b>Giá vốn</b></h6>
                                        </MDBCol>
                                        <MDBCol md="8">
                                            <MDBInput name={'capitalPrice'}
                                                      value={productEdit.capitalPrice}
                                                      onChange={inputData}
                                                      className="form-control"
                                                      type='number'/>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="7" className="mt-4">
                                    <MDBRow>
                                        <MDBCol md="4" className="ps-5 mt-2">
                                            <h6><b>Nhóm hàng</b></h6>
                                        </MDBCol>
                                        <MDBCol md="8">
                                            <select
                                                onChange={inputData}
                                                name='groupProductId'
                                                value={productEdit.groupProductId}
                                                className={'form-control'}
                                                required
                                            >
                                                {listGroupProduct.map((groupProduct) => (
                                                    <option
                                                        key={groupProduct.groupProductId}
                                                        value={groupProduct.groupProductId}>
                                                        {groupProduct.groupProductName}
                                                    </option>))}
                                            </select>
                                        </MDBCol>
                                    </MDBRow>

                                </MDBCol>
                                <MDBCol md="5" className="mt-4">
                                    <MDBRow>
                                        <MDBCol md="4" className="ps-5 mt-2">
                                            <h6><b>Giá bán</b></h6>
                                        </MDBCol>
                                        <MDBCol md="8">
                                            <MDBInput name={'price'}
                                                      value={productEdit.price}
                                                      onChange={inputData}
                                                      className="form-control"
                                                      type='number'/>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="7" className="mt-4">
                                    <MDBRow>
                                        <MDBCol md="4" className="ps-5 mt-2">
                                            <h6><b>Thương hiệu</b></h6>
                                        </MDBCol>
                                        <MDBCol md="8">
                                            <select
                                                onChange={inputData}
                                                name='trademarkId'
                                                value={productEdit.trademarkId}
                                                className={'form-control'}
                                                required
                                            >
                                                {listTrademark.map((trademark) => (
                                                    <option
                                                        key={trademark.trademarkId}
                                                        value={trademark.trademarkId}>
                                                        {trademark.trademarkName}
                                                    </option>))}
                                            </select>
                                        </MDBCol>
                                    </MDBRow>

                                </MDBCol>
                                <MDBCol md="5" className="mt-4">
                                    <MDBRow>
                                        <MDBCol md="4" className="ps-5 mt-2">
                                            <h6><b>Tồn kho</b></h6>
                                        </MDBCol>
                                        <MDBCol md="8">
                                            <MDBInput name={'inventory'}
                                                      value={productEdit.inventory}
                                                      onChange={inputData}
                                                      className="form-control"
                                                      type='number'/>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="7" className="mt-4">
                                    <MDBRow>
                                        <MDBCol md="4" className="ps-5 mt-2">
                                            <h6><b>Vị trí</b></h6>
                                        </MDBCol>
                                        <MDBCol md="8">
                                            <select
                                                onChange={inputData}
                                                name='locationId'
                                                value={productEdit.locationId}
                                                className={'form-control'}
                                                required
                                            >
                                                {listLocation.map((location) => (
                                                    <option
                                                        key={location.locationId}
                                                        value={location.locationId}>
                                                        {location.locationName}
                                                    </option>))}
                                            </select>

                                        </MDBCol>
                                    </MDBRow>

                                </MDBCol>
                                <MDBCol md="5" className="mt-4">
                                    <MDBRow>
                                        <MDBCol md="4" className="ps-5 mt-2">
                                            <h6><b>Trọng lượng</b></h6>
                                        </MDBCol>
                                        <MDBCol md="8">
                                            <MDBInput name={'weight'}
                                                      value={productEdit.weight}
                                                      onChange={inputData}
                                                      className="form-control"
                                                      type='number'/>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="7" className="2">
                                    <MDBRow>
                                        <MDBCol md="4" className="ps-5 mt-2">
                                            <h6><b>Thuộc tính</b></h6>
                                        </MDBCol>
                                        <MDBCol md="8">
                                            <select
                                                onChange={inputData}
                                                name='propertiesId'
                                                value={productEdit.propertiesId}
                                                className={'form-control'}
                                                required
                                            >
                                                {listProperties.map((properties) => (
                                                    <option
                                                        key={properties.propertiesId}
                                                        value={properties.propertiesId}>
                                                        {properties.propertiesName}
                                                    </option>))}
                                            </select>

                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="4" className="ps-5 mt-4">
                                            <h6><b>Đơn vị cơ bản</b></h6>
                                        </MDBCol>
                                        <MDBCol md="8" className='mt-4'>
                                            <select
                                                onChange={inputData}
                                                name='unitId'
                                                value={productEdit.unitId}
                                                className={'form-control'}
                                                required
                                            >
                                                {listUnit.map((unit) => (
                                                    <option
                                                        key={unit.unitId}
                                                        value={unit.unitId}>
                                                        {unit.unitName}
                                                    </option>))}
                                            </select>

                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol className='mt-5 mb-5 d-flex justify-content-end'>
                                    <MDBBtn color='success' onClick={onSave}><b>Lưu</b></MDBBtn>
                                    <Link to={'/product'} className='btn btn-dark ms-2'>
                                        <b>Bỏ qua</b>
                                    </Link>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBCol>
                    <MDBCol md={2}></MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default FormEditProduct;