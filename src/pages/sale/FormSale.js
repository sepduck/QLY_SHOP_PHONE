import {
    MDBBadge,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBCollapse,
    MDBContainer,
    MDBDropdown, MDBDropdownItem, MDBDropdownMenu,
    MDBDropdownToggle,
    MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBRipple,
    MDBRow,
} from "mdb-react-ui-kit";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {SvgIcon} from "@mui/material";

function FormSale() {
    useEffect(() => {
        onListCart();
        fetchListCart()
        onAccountInfo()
        onListProduct()
    }, []);
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate();

    // -----------------------------------------------------------------------------------------------------------------

    const [openNav] = useState(false);
    const [openNavSecond, setOpenNavSecond] = useState(false);

    const [listProduct, setListProduct] = useState([]);
    const onListProduct = () => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }


        axios.get('/product', {headers: headers})
            .then(resp => {
                setListProduct(resp.data.data)
            })
            .catch(e => {
                console.log(e)
                navigate("/")
            })
    }

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
                setListProduct(resp.data.data)
                console.log(data)
                // console.log(e.target.value)
            })
            .catch(e => {
                console.log(e)
            })
    }
    //  Save add Product -------------------------------------------------------------------------------------------------------
    const [addCartInitial, setAddCartInitial] = useState({
        productInitial: ''
    })
    console.log("addCartInitial = " + addCartInitial.productInitial)

    const [addCart, setAddCart] = useState({
        productId: addCartInitial.productInitial,
    })
    console.log("addCart = " + addCart.productId)


    const handleAddProduct = (productIdd) => {
        const onAddProduct = (productId) => {
            // setAddCart({...addCart, productId});  // Cập nhật productId vào stat
            let data = {
                productId,
            }
            console.log(data.productId)
            const headers = {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }

            axios.post('/cart/add/' + productIdd, {headers: headers})
                .then(() => {
                    console.log(`${data.productId} đã được thêm vào giỏ hàng`);
                    // setCartCount(cartCount + 1); // Tăng số lượng sản phẩm trong giỏ hàng
                    console.log(data.productId)
                })
                .catch((error) => {
                    console.error('Lỗi khi thêm sản phẩm vào giỏ hàng', error);
                    console.log(data.productId)
                })

        }
        onAddProduct(productIdd)
    }
    // Danh sách giỏ hàng ----------------------------------------------------------------------------------------------
    const [listCart, setListCart] = useState([]);
    console.log(listCart)
    const onListDetailCart = () => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/list-cart', {headers: headers})
            .then(resp => {
                setListCart(resp.data)

                console.log(resp);
            })
            .catch(e => {
                console.log(e)
            })
    }
    const fetchListCart = () => {
        onListDetailCart();
    };

    //------------------------------------------------------------------------------------------------------------------
    const [setCartItems] = useState([]);
    const onListCart = () => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/product', {headers: headers})
            .then(resp => {
                setCartItems(resp.data.data)
            })
            .catch(e => {
                console.log(e)
            })
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
    const [logout, setLogout] = useState({});
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
            .catch(error => {
                navigate('/sale')
                console.log("Lỗi đăng xuất")
            })

    };

    // Input data ------------------------------------------------------------------------------------------------------
    const inputData = (e) => {
        setSearchProductName({...searchProductName, [e.target.name]: e.target.value})
        setUser({...user, [e.target.name]: e.target.value})
        setAddCart({...addCart, [e.target.name]: e.target.value})
        console.log(e.target.value)
        setAddCartInitial({...addCartInitial, [e.target.name]: e.target.value})

    }
    const [cartCount, setCartCount] = useState(0);
    return (
        <div style={{background: '#e8eaed'}}>
            <MDBNavbar expand='lg' bgColor='primary' style={{fontSize: '13px'}}>
                <MDBContainer>
                    <MDBNavbarBrand href='#' className={'fs-6'}>
                        <img src='https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/448524574_122166494900085181_8747887790483415752_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9Mxs6dJTaC4Q7kNvgF_uVs8&_nc_ht=scontent-hkg4-1.xx&oh=00_AYCpUClqEHj383WklMIDUKPOx6GFx3sCl8klnS-V1H8ldQ&oe=667349E2'
                             alt='Logo' style={{ height: '30px' }} /> {/* Điều chỉnh chiều cao của logo theo ý muốn */}
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
                                                style={{fill: 'currentColor', stroke: 'none', height: '17px'}} // Đổi ngược lại màu
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
                                                    fill: 'currentColor',
                                                    stroke: 'none',
                                                    height: '17px'
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
                                                    fill: 'currentColor',
                                                    stroke: 'none',
                                                    height: '17px'
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
                                                    fill: 'currentColor',
                                                    stroke: 'none',
                                                    height: '17px'
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
                                                    fill: 'currentColor',
                                                    stroke: 'none',
                                                    height: '17px'
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
                                                    fill: 'currentColor',
                                                    stroke: 'none',
                                                    height: '17px'
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
                                                    fill: 'currentColor',
                                                    stroke: 'none',
                                                    height: '17px'
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
                                                    fill: 'currentColor',
                                                    stroke: 'none',
                                                    height: '17px'
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
                                                    fill: 'currentColor',
                                                    stroke: 'none',
                                                    height: '17px'
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
                <MDBIcon fab icon="accessible-icon"/>
                <MDBRow>
                    <MDBCol size="md-12 mt-3">
                        <MDBRow>
                            {listProduct.map((product) => (
                                <MDBCol md="12" lg="3" className="mb-4 mt-2">
                                    <MDBCard className="text-center"
                                             onClick={() => handleAddProduct(product.product_id)}>
                                        <form>
                                            <MDBRipple
                                                rippleColor="light"
                                                rippleTag="div"
                                                className="bg-image rounded hover-zoom"
                                            >
                                                <MDBCardImage
                                                    // src={product.image_url}
                                                    src={'https://benhvienjw.vn/wp-content/uploads/2024/01/anh-gai-xinh9.jpg'}
                                                    fluid
                                                    className="w-100"
                                                />
                                                <a href="#">
                                                    <div className="hover-overlay">
                                                        <div
                                                            className="mask"
                                                            style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}
                                                        ></div>
                                                    </div>
                                                </a>
                                            </MDBRipple>
                                            <MDBCardBody className={'fixed-height-card-body'}>

                                                <h5 className="card-title mb-3 text-reset" onChange={inputData}>
                                                    <b>{product.product_name}</b>
                                                </h5>
                                                <p className='card-title mb-4 text-reset'>{product.group_product_name}</p>
                                                <h6 className="mb-3 text-danger mt-2">
                                                    <b>{product.price.toLocaleString('de-DE', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).replace('VNĐ', '')}</b></h6>
                                            </MDBCardBody>
                                        </form>
                                    </MDBCard>
                                </MDBCol>
                            ))}
                        </MDBRow>
                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        </div>
    )
}

export default FormSale