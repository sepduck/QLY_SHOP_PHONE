import {
    MDBBadge,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBCollapse,
    MDBContainer,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBIcon,
    MDBInput,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {SvgIcon} from "@mui/material";

function FormCart() {
    useEffect(() => {
        onListCart();
        onAccountInfo()
        // onListProduct()
    }, []);
    const navigate = useNavigate();

    // -----------------------------------------------------------------------------------------------------------------
    const [openNav, setOpenNav] = useState(false);
    const [openNavSecond, setOpenNavSecond] = useState(false);
    const [topRightModal, setTopRightModal] = useState(false);


    // const [listProduct, setListProduct] = useState([]);
    // const onListProduct = () => {
    //     const headers = {
    //         'Authorization': 'Bearer ' + localStorage.getItem('token')
    //     }
    //
    //
    //     axios.get('/product', {headers: headers})
    //         .then(resp => {
    //             setListProduct(resp.data.data)
    //         })
    //         .catch(e => {
    //             console.log(e)
    //             navigate("/")
    //         })
    // }

    const toggleOpen = () => setTopRightModal(!topRightModal);

//  Search name --------------------------------------------------------------------------------------------------------
    const [searchProductName, setSearchProductName] = useState({
        productName: ''
    })
    const onSearchName = () => {
        let data = {
            productName: searchProductName.productName,
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/product/name/' + data.productName, {headers: headers})
            .then(resp => {
                // setListProduct(resp.data.data)
                console.log(data)
                // console.log(e.target.value)
            })
            .catch(e => {
                console.log(e)
            })
    }

    //------------------------------------------------------------------------------------------------------------------
    const [listCart, setListCart] = useState([]);
    console.log(listCart)
    const onListCart = () => {

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/list-cart', {headers: headers})
            .then(resp => {
                if (resp.data && Array.isArray(resp.data)) {
                    // // Gộp các sản phẩm có cùng productId lại với nhau
                    // const mergedCartItems = mergeCartItems(resp.data);
                    setListCart(resp.data); // Đảm bảo resp.data là một mảng
                    console.log("Có mảng sản phẩm từ API:", resp.data);
                } else {
                    setListCart([]); // Nếu không phải là mảng, đặt về mảng trống
                    console.log("Dữ liệu từ API không hợp lệ:", resp.data);
                }
            })
            .catch(error => {
                console.error("Lỗi khi gọi API:", error);
                // Nếu lỗi API -> Chuyển về trang chủ
                navigate('/')
            })
    }
    // // Hàm gộp các sản phẩm có cùng productId lại với nhau -------------------------------------------------------------
    // const mergeCartItems = (cartItems) => {
    //     const mergedItems = {};
    //
    //     cartItems.forEach(item => {
    //         const { productId, ...rest } = item;
    //         if (!mergedItems[productId]) {
    //             mergedItems[productId] = { ...rest, quantity: 0 };
    //         }
    //         mergedItems[productId].quantity += 1;
    //     });
    //
    //     return Object.values(mergedItems);
    // };


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

    // Input data ------------------------------------------------------------------------------------------------------
    const inputData = (e) => {
        setSearchProductName({...searchProductName, [e.target.name]: e.target.value})
    }
    return (<div style={{background: '#e8eaed'}}>
            <MDBNavbar expand='lg' bgColor='primary' style={{fontSize: '13px'}}>
                <MDBContainer>
                    <MDBNavbarBrand href='#' className={'fs-6'}>
                        <img
                            src='https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/448524574_122166494900085181_8747887790483415752_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9Mxs6dJTaC4Q7kNvgF_uVs8&_nc_ht=scontent-hkg4-1.xx&oh=00_AYCpUClqEHj383WklMIDUKPOx6GFx3sCl8klnS-V1H8ldQ&oe=667349E2'
                            alt='Logo' style={{height: '30px'}}/> {/* Điều chỉnh chiều cao của logo theo ý muốn */}
                    </MDBNavbarBrand>
                    <MDBNavbarToggler>
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenNavSecond(!openNavSecond)}
                        >
                        <MDBIcon icon='bars' fas/>
                    </MDBNavbarToggler>
                    <MDBCollapse navbar open={openNav} className='justify-content-center'>
                        <MDBNavbarNav>
                            <form className='input-group w-auto '>
                                <input type='search'
                                       name={'productName'}
                                       value={searchProductName.productName}
                                       onChange={inputData}
                                       onClick={onSearchName}
                                       className='form-control rounded-9'
                                       placeholder='Bạn tìm gì...'
                                />
                            </form>
                        </MDBNavbarNav>
                    </MDBCollapse>
                    <MDBCollapse navbar className='justify-content-end'>
                        <MDBNavbarNav>
                            <MDBBtn rounded
                                    className={'text-white fw-bold custom-navbar'}
                                    style={{textTransform: 'none', fontSize: '14px'}}

                            ><a href='/cart' className='text-white'>Giỏ hàng

                                <MDBBadge color="danger" className="ms-2">{listCart.length}</MDBBadge>

                            </a>
                            </MDBBtn>
                            <MDBBtn rounded
                                    className={'text-white fw-bold btn-transparent'}
                                    style={{textTransform: 'none', fontSize: '14px'}}
                                    href={'https://www.thegioididong.com/tin-tuc'}
                            >24h Công nghệ
                            </MDBBtn>
                            <MDBBtn rounded
                                    className={'text-white fw-bold btn-transparent'}
                                    style={{textTransform: 'none', fontSize: '14px'}}
                                    href={'https://www.thegioididong.com/hoi-dap'}
                            >Hỏi đáp
                            </MDBBtn>
                            <MDBBtn rounded
                                    className={'text-white fw-bold btn-transparent'}
                                    style={{textTransform: 'none', fontSize: '14px'}}
                                    href={'https://www.thegioididong.com/game-app'}
                            >Game App
                            </MDBBtn>
                            <MDBDropdown size='lg' className='btn btn-success text-white fw-bold btn-transparent'
                                         style={{textTransform: 'none', fontSize: '14px'}}>

                                <MDBDropdownToggle tag='a' className='text-white' role='button'
                                                   style={{textTransform: 'none', fontSize: '14px'}}>
                                    {userInfo.fullname}
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className='dropdown-menu-custom bg-primary mt-5'>
                                    <MDBDropdownItem link className='mt-3 ms-3 mx-3'>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                className='mx-2 text-white'
                                            >
                                                <path
                                                    d="M21 10h-8.35C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H13l2 2 2-2 2 2 4-4.04zM7 15c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3"></path>
                                            </svg>
                                        </SvgIcon>
                                        <a><b className='me-5 text-white'>Thay đổi mật khẩu</b></a></MDBDropdownItem>
                                    <MDBDropdownItem link className='mt-3 ms-3 mb-3' onClick={handleLogout}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                                className='mx-2 text-white'
                                            >
                                                <path
                                                    d="m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"></path>
                                            </svg>
                                        </SvgIcon>
                                        <b className='text-white'>Đăng xuất</b>
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
                                <MDBDropdown group className='shadow-0 mb-2'>
                                    <MDBDropdownToggle className={'bg-primary fw-bold text-white'}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{
                                                    fill: 'currentColor', stroke: 'none', height: '17px'
                                                }} // Đổi ngược lại màu
                                                className='mx-1'
                                            >
                                                <path
                                                    d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1m-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m4.5-4H7V4h9z"></path>
                                            </svg>
                                        </SvgIcon>
                                        Điện thoại
                                    </MDBDropdownToggle>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown group className='shadow-0 mb-2'>
                                    <MDBDropdownToggle className={'bg-primary fw-bold text-white'}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{
                                                    fill: 'currentColor', stroke: 'none', height: '17px'
                                                }} // Đổi ngược lại màu
                                                className='mx-1'
                                            >
                                                <path
                                                    d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2zM4 6h16v10H4z"></path>
                                            </svg>
                                        </SvgIcon>
                                        Laptop
                                    </MDBDropdownToggle>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown group className='shadow-0 mb-2'>
                                    <MDBDropdownToggle
                                        className={'bg-primary fw-bold text-white'}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{
                                                    fill: 'currentColor', stroke: 'none', height: '17px'
                                                }} // Đổi ngược lại màu
                                                className='mx-1'
                                            >
                                                <path
                                                    d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 1.99-.9 1.99-2L23 6c0-1.1-.9-2-2-2m-2 14H5V6h14z"></path>
                                            </svg>
                                        </SvgIcon>
                                        Tablet
                                    </MDBDropdownToggle>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown group className='shadow-0 mb-2'>
                                    <MDBDropdownToggle className={'bg-primary fw-bold text-white'}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{
                                                    fill: 'currentColor', stroke: 'none', height: '17px'
                                                }} // Đổi ngược lại màu
                                                className='mx-1'
                                            >
                                                <path
                                                    d="M12 3c-4.97 0-9 4.03-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9"></path>
                                            </svg>
                                        </SvgIcon>
                                        Phụ kiện
                                    </MDBDropdownToggle>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown group className='shadow-0 mb-2'>
                                    <MDBDropdownToggle
                                        className={'bg-primary fw-bold text-white'}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{
                                                    fill: 'currentColor', stroke: 'none', height: '17px'
                                                }} // Đổi ngược lại màu
                                                className='mx-1'
                                            >
                                                <path
                                                    d="M3 6h18V4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3zm10 6H9v1.78c-.61.55-1 1.33-1 2.22s.39 1.67 1 2.22V20h4v-1.78c.61-.55 1-1.34 1-2.22s-.39-1.67-1-2.22zm-2 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5M22 8h-6c-.5 0-1 .5-1 1v10c0 .5.5 1 1 1h6c.5 0 1-.5 1-1V9c0-.5-.5-1-1-1m-1 10h-4v-8h4z"></path>
                                            </svg>
                                        </SvgIcon>
                                        Smartwatch
                                    </MDBDropdownToggle>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown group className='shadow-0 mb-2'>
                                    <MDBDropdownToggle className={'bg-primary fw-bold text-white'}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{
                                                    fill: 'currentColor', stroke: 'none', height: '17px'
                                                }} // Đổi ngược lại màu
                                                className='mx-1'
                                            >
                                                <path
                                                    d="M20 12c0-2.54-1.19-4.81-3.04-6.27L16 0H8l-.95 5.73C5.19 7.19 4 9.45 4 12s1.19 4.81 3.05 6.27L8 24h8l.96-5.73C18.81 16.81 20 14.54 20 12M6 12c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6"></path>
                                            </svg>
                                        </SvgIcon>
                                        Đồng hồ
                                    </MDBDropdownToggle>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown group className='shadow-0 mb-2'>
                                    <MDBDropdownToggle className={'bg-primary fw-bold text-white'}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{
                                                    fill: 'currentColor', stroke: 'none', height: '17px'
                                                }} // Đổi ngược lại màu
                                                className='mx-1'
                                            >
                                                <path
                                                    d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2m0 18H7V5h10zM12 6.72c-1.96 0-3.5 1.52-3.5 3.47h1.75c0-.93.82-1.75 1.75-1.75s1.75.82 1.75 1.75c0 1.75-2.63 1.57-2.63 4.45h1.76c0-1.96 2.62-2.19 2.62-4.45 0-1.96-1.54-3.47-3.5-3.47m-.88 8.8h1.76v1.76h-1.76z"></path>
                                            </svg>
                                        </SvgIcon>
                                        Máy cũ, Thu cũ
                                    </MDBDropdownToggle>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown group className='shadow-0 mb-2'>
                                    <MDBDropdownToggle className={'bg-primary fw-bold text-white'}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{
                                                    fill: 'currentColor', stroke: 'none', height: '17px'
                                                }} // Đổi ngược lại màu
                                                className='mx-1'
                                            >
                                                <path
                                                    d="M23 11.01 18 11c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-9c0-.55-.45-.99-1-.99M23 20h-5v-7h5zM20 2H2C.89 2 0 2.89 0 4v12c0 1.1.89 2 2 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4c0-1.11-.9-2-2-2m-8.03 7L11 6l-.97 3H7l2.47 1.76-.94 2.91 2.47-1.8 2.47 1.8-.94-2.91L15 9z"></path>
                                            </svg>
                                        </SvgIcon>
                                        PC, Máy in
                                    </MDBDropdownToggle>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBDropdown group className='shadow-0 mb-2'>
                                    <MDBDropdownToggle className={'bg-primary fw-bold text-white'}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                style={{
                                                    fill: 'currentColor', stroke: 'none', height: '17px'
                                                }} // Đổi ngược lại màu
                                                className='mx-1'
                                            >
                                                <path
                                                    d="M19.99 4c0-1.1-.89-2-1.99-2h-8L4 8v12c0 1.1.9 2 2 2h12.01c1.1 0 1.99-.9 1.99-2zM9 19H7v-2h2zm8 0h-2v-2h2zm-8-4H7v-4h2zm4 4h-2v-4h2zm0-6h-2v-2h2zm4 2h-2v-4h2z"></path>
                                            </svg>
                                        </SvgIcon>Sim, thẻ cào
                                    </MDBDropdownToggle>
                                </MDBDropdown>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            <MDBContainer>
                <section className="h-100 h-custom" style={{backgroundColor: "#eee"}}>
                    <MDBContainer className="py-5 h-100">
                        <MDBRow className="justify-content-center align-items-center h-100">
                            <MDBCol size="12">
                                <MDBCard className="card-registration card-registration-2"
                                         style={{borderRadius: "15px"}}>
                                    <MDBCardBody className="p-0">
                                        <MDBRow className="g-0">
                                            <MDBCol lg="12">
                                                <div className="p-5">
                                                    <div
                                                        className="d-flex justify-content-between align-items-center mb-3">
                                                        <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                                                            Giỏ hàng
                                                        </MDBTypography>
                                                        <MDBTypography className="mb-0 text-dark">
                                                            <b>Có {listCart.length} sản phẩm</b>
                                                        </MDBTypography>
                                                    </div>
                                                    <div className='shopping-cart-container'>
                                                        {listCart && listCart.map((cartItem) => (

                                                            <MDBRow
                                                                className="mb-4 d-flex justify-content-between align-items-center">
                                                                <hr className="my-4"/>
                                                                <MDBCol md="2" lg="2" xl="2">
                                                                    <MDBCardImage
                                                                        src="https://benhvienjw.vn/wp-content/uploads/2024/01/anh-gai-xinh9.jpg"
                                                                        fluid className="rounded-3"
                                                                        alt="Cotton T-shirt"/>
                                                                </MDBCol>
                                                                <MDBCol md="3" lg="3" xl="4">
                                                                    <MDBTypography tag="h6" className="text-muted"
                                                                                   value={cartItem.id_card}>
                                                                        <b>{cartItem.product.productName}</b>
                                                                    </MDBTypography>
                                                                </MDBCol>
                                                                <MDBCol md="3" lg="2" xl="2"
                                                                        className="d-flex align-items-center">
                                                                    <MDBBtn color="link" className="px-2 me-3">
                                                                        <SvgIcon>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                fill="none"
                                                                                viewBox="0 0 24 24"
                                                                                strokeWidth={1.5}
                                                                                stroke="currentColor"
                                                                                style={{
                                                                                    fill: 'currentColor',
                                                                                    stroke: 'none',
                                                                                    height: '17px'
                                                                                }} // Đổi ngược lại màu
                                                                            >
                                                                                <path
                                                                                    d="M4 11h16v2H4z"></path>

                                                                            </svg>
                                                                        </SvgIcon>
                                                                    </MDBBtn>

                                                                    <MDBInput type="number" min="0" defaultValue={1}
                                                                              size="sm"/>

                                                                    <MDBBtn color="link" className="px-2">
                                                                        <SvgIcon>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                fill="none"
                                                                                viewBox="0 0 24 24"
                                                                                strokeWidth={1.5}
                                                                                stroke="currentColor"
                                                                                style={{
                                                                                    fill: 'currentColor',
                                                                                    stroke: 'none',
                                                                                    height: '17px'
                                                                                }} // Đổi ngược lại màu
                                                                                className='mx-1'
                                                                            >
                                                                                <path
                                                                                    d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"></path>
                                                                            </svg>
                                                                        </SvgIcon>
                                                                    </MDBBtn>
                                                                </MDBCol>
                                                                <MDBCol md="2" lg="2" xl="2" className="text-end">
                                                                    <MDBTypography tag="h6" className="mb-0"
                                                                                   value={cartItem.product.price}>
                                                                        {cartItem.product.price.toLocaleString('de-DE', {
                                                                            style: 'currency',
                                                                            currency: 'VND'
                                                                        }).replace('VNĐ', '')}
                                                                    </MDBTypography>
                                                                </MDBCol>
                                                                <MDBCol md="1" lg="3" xl="2"
                                                                        className="d-flex align-items-center">
                                                                    <MDBBtn color="link" className="px-2">
                                                                        <SvgIcon>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                fill="none"
                                                                                viewBox="0 0 24 24"
                                                                                strokeWidth={1.5}
                                                                                stroke="currentColor"
                                                                                style={{
                                                                                    fill: 'brown',
                                                                                    stroke: 'none',
                                                                                    height: '17px'
                                                                                }} // Đổi ngược lại màu
                                                                            >
                                                                                <path
                                                                                    d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
                                                                            </svg>
                                                                        </SvgIcon>
                                                                    </MDBBtn>
                                                                </MDBCol>
                                                                <MDBCol md="1" lg="1" xl="1" className="text-end">
                                                                    <a href="#!" className="text-muted">
                                                                        <MDBIcon fas icon="times"/>
                                                                    </a>
                                                                </MDBCol>
                                                            </MDBRow>


                                                        ))}
                                                    </div>

                                                    <hr className="my-4"/>

                                                    <div className="pt-4">
                                                        <MDBRow>
                                                            <MDBCol className='d-flex justify-content-end'>
                                                                <h5><b>Tổng giá: 10000000</b></h5>
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <MDBRow>
                                                            <MDBCol>
                                                                <MDBTypography tag="h6" className="mb-0">
                                                                    <MDBCardText tag="a" href="#!"
                                                                                 className="text-body">
                                                                        <MDBIcon fas icon="long-arrow-alt-left me-2"/><a
                                                                        href='/sale'>Quay lại cửa hàng
                                                                    </a>
                                                                    </MDBCardText>
                                                                </MDBTypography>
                                                            </MDBCol>
                                                            <MDBCol className='d-flex justify-content-end'>
                                                                <MDBBtn className='btn btn-success mt-3' size={"lg"}>Đặt
                                                                    hàng</MDBBtn>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </div>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            </MDBContainer>
        </div>

    )
}

export default FormCart