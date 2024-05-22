import {useEffect, useState} from "react";
import axios from "axios";
import '../../Custom.css'
import * as React from 'react';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import {DataGrid} from "@mui/x-data-grid";
import {Link, useNavigate} from "react-router-dom";
import {
    MDBCol,
    MDBCollapse,
    MDBContainer,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBIcon,
    MDBInput,
    MDBInputGroup,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBRadio,
    MDBRow,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane
} from "mdb-react-ui-kit";
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
import {
    Button, SvgIcon,
} from "@mui/material";

function FormProduct() {
    const [openNav] = useState(false);
    const [openNavSecond, setOpenNavSecond] = useState(false);

    useEffect(() => {
        onListProduct()
        onListGroupProduct()
        onListTrademark()
        onListLocation()
        onListProperties()
        onListUnit()
        onListCategory()
        onAccountInfo()
    }, []);


    const navigate = useNavigate()

//  List product -------------------------------------------------------------------------------------------------------
    const columns = [{
        field: 'product_id',
        headerName: 'Mã hàng',
        width: 100,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'header-column',
        renderCell: (params) => `HH00${params.value}`
    }, {
        field: 'product_name',
        headerName: 'Tên hàng',
        width: 230,
        headerAlign: 'center',
        headerClassName: 'header-column'
    }, {
        field: 'price',
        headerName: 'Giá bán',
        width: 150,
        align: 'right',
        headerAlign: 'center',
        headerClassName: 'header-column'
    }, {
        field: 'capital_price',
        headerName: 'Giá vốn',
        width: 150,
        align: 'right',
        headerAlign: 'center',
        headerClassName: 'header-column'
    }, {
        field: 'inventory',
        headerName: 'Tồn kho',
        width: 90,
        align: 'right',
        headerAlign: 'center',
        headerClassName: 'header-column'
    }, {
        field: 'group_product_name',
        headerName: 'Nhóm hàng',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'header-column'
    }, {
        field: 'trademark_name',
        headerName: 'Thương hiệu',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'header-column'
    }, {
        field: 'location_name',
        headerName: 'Vị trí',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'header-column'
    }, {
        field: 'weight',
        headerName: 'Trọng lượng',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'header-column'
    }, {
        field: 'properties_name',
        headerName: 'Thuộc tính',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'header-column'
    }, {
        field: 'unit_name',
        headerName: 'Đơn vị',
        minWidth: 130,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'header-column'
    }, {
        field: 'edit',
        headerName: 'Edit',
        sortable: false,
        width: 100,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'header-column',
        renderCell: (params) => (<strong>
            <Link to={`/edit/${params.id}`} className='btn btn-success mb-2'>Edit</Link>
        </strong>),

    }, {
        field: 'delete',
        headerName: 'Delete',
        sortable: false,
        width: 100,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'header-column',
        renderCell: (params) => (<strong>
            <Button
                variant="contaied"
                size="smaill"
                tabIndex={params.hasFocus ? 0 : -1}
                style={{backgroundColor: '#bd1a29', color: 'white'}}
                onClick={del}
                value={params.id}
            >Delete
            </Button>
        </strong>),
    },
    ];
    // List product ----------------------------------------------------------------------------------------------------
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

                navigate("/")
            })
    }

    // List Category -------------------------------------------------------------------------------------------------------
    const [listCategory, setListCategory] = useState([]);
    const onListCategory = () => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/category', {headers: headers})
            .then(resp => {
                setListCategory(resp.data.data)
            })
            .catch(e => {

                navigate("/")
            })
    }

    // Update product -----------------------------------------------------------------------------------------------------

    // Delete product -----------------------------------------------------------------------------------------------------
    const del = (e) => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.delete('/product/' + e.target.value, {headers: headers})
            .then(() => {
                console.log("XOA THANH CONG")
                onListProduct()
            })
            .catch(e => {

                navigate("/")
            })
    }

    // Save product -------------------------------------------------------------------------------------------------------
    const [groupProductInitial, setGroupProductInitial] = useState({
        groupProductInitial: '',

    });
    console.log("groupProductInitial " + groupProductInitial.groupProductInitial)
    const [trademarkInitial, setTrademarkInitial] = useState({
        trademarkInitial: '',

    });
    console.log("trademarkInitial " + trademarkInitial.trademarkInitial)
    const [locationInitial, setLocationInitial] = useState({
        locationInitial: '',

    });
    console.log("location " + locationInitial.locationInitial)
    const [propertiesInitial, setPropertiesInitial] = useState({
        propertiesInitial: '',

    });
    console.log("propertiesInitial " + propertiesInitial.propertiesInitial)
    const [unitInitial, setUnitInitial] = useState({
        unitInitial: '',

    });
    const [categoryInitial, setCategoryInitial] = useState({
        categoryInitial: '',

    });

    const [directSalesInitial, setDirectSalesInitial] = useState(false);
    const [productSave, setProductSave] = useState({
        productId: '',
        productName: '',
        price: '',
        capitalPrice: '',
        inventory: '',
        groupProductId: groupProductInitial.groupProductInitial,
        trademarkId: trademarkInitial.trademarkInitial,
        locationId: locationInitial.locationInitial,
        weight: '',
        propertiesId: propertiesInitial.propertiesInitial,
        unitId: unitInitial.unitInitial,
        categoryId: categoryInitial.categoryInitial,
        directSales: directSalesInitial ? 0 : 1, // Chuyển boolean thành 0 hoặc 1
    })
    const onSave = () => {
        // Kiểm tra giá trị của groupProductId và productSave trước khi tạo đối tượng data
        console.log("groupProductId:", groupProductInitial.trademarkId);
        console.log("productSave:", productSave);
        let data = {
            productName: productSave.productName,
            price: productSave.price,
            capitalPrice: productSave.capitalPrice,
            inventory: productSave.inventory,
            groupProductId: productSave.groupProductId,
            trademarkId: productSave.trademarkId,
            locationId: productSave.locationId,
            weight: productSave.weight,
            propertiesId: productSave.propertiesId,
            unitId: productSave.unitId,
            directSales: productSave.directSales,
            categoryId: productSave.categoryId

        }
        console.log("Group Product ID in onSave:", data.groupProductId); // kiểm tra giá trị groupProductId
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }

        axios.post('/product', data, {headers: headers})
            .then(() => {
                onListProduct()
                toggleOpen()
            }).catch(() => {
            navigate('/product')
        })
    }

    // Save product group -------------------------------------------------------------------------------------------------
    const [groupProductSave, setGroupProductSave] = useState({
        groupProductId: '', groupProductName: ''
    })
    const onGroupProductSave = () => {
        let data = {
            groupProductName: groupProductSave.groupProductName,
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.post('/group-product', data, {headers: headers})
            .then(() => {
                onListProduct()
                toggleOpenGroupProduct()
            })
    }

    // Save trademark --- -------------------------------------------------------------------------------------------------
    const [trademarkSave, setTrademarkSave] = useState({
        trademarkId: '', trademarkName: ''
    })
    const onTradeMarkSave = () => {
        let data = {
            trademarkName: trademarkSave.trademarkName,
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.post('/trademark', data, {headers: headers})
            .then(() => {
                onListProduct()
                toggleOpenTrademark()
            })
            .catch((e) => {
                navigate('/')
            })
    }

    // Save location ------------------------------------------------------------------------------------------------------
    const [locationSave, setLocationSave] = useState({
        locationId: '', locationName: ''
    })
    const onLocationSave = () => {
        let data = {
            locationName: locationSave.locationName,
        }

        axios.post('/location', data)
            .then(() => {
                onListProduct()
                toggleOpenLocation()
            })
            .catch((e) => {
                navigate('/')
            })
    }

    // Save properties ----------------------------------------------------------------------------------------------------
    const [propertiesSave, setPropertiesSave] = useState({
        propertiesId: '', propertiesName: ''
    })
    const onPropertiesSave = () => {
        let data = {
            propertiesName: propertiesSave.propertiesName,
        }

        axios.post('/properties', data)
            .then(() => {
                onListProduct()
                toggleOpenProperties()
            })
            .catch((e) => {
                navigate('/')
            })
    }

    // Save unit ----------------------------------------------------------------------------------------------------------
    const [unitSave, setUnitSave] = useState({
        unitId: '', unitName: ''
    })
    const onUnitSave = () => {
        let data = {
            unitName: unitSave.unitName,
        }

        axios.post('/unit', data)
            .then(() => {
                onListProduct()
                toggleOpenUnit()
            })
    }

    // Modal -----------------------------------------------------------------------------------------------------------
    const [centredModal, setCentredModal] = useState(false);
    const [basicActive, setBasicActive] = useState('tab1')
    const [groupProduct, setGroupProduct] = useState(false)
    const [trademark, setTrademark] = useState(false)
    const [location, setLocation] = useState(false)
    const [properties, setProperties] = useState(false)
    const [unit, setUnit] = useState(false);

    // Toggle ----------------------------------------------------------------------------------------------------------
    const toggleOpen = () => setCentredModal(!centredModal);
    const toggleOpenGroupProduct = () => setGroupProduct(!groupProduct)
    const toggleOpenTrademark = () => setTrademark(!trademark);
    const toggleOpenLocation = () => setLocation(!location);
    const toggleOpenProperties = () => setProperties(!properties);
    const toggleOpenUnit = () => setUnit(!unit);

    // Input data ------------------------------------------------------------------------------------------------------
    const inputData = (e) => {
        const { name, checked } = e.target;
        if (name === "directSalesInitial") {
            setDirectSalesInitial(checked);
        } else {
            const { name, value } = e.target;
            setProductSave({
                ...productSave,
                [name]: value
            });
        }
        setUnitInitial({...unitInitial, [e.target.name]: e.target.value})
        setProductSave({...productSave, [e.target.name]: e.target.value})
        setCategoryInitial({...categoryInitial, [e.target.name]: e.target.value})
        setTrademarkInitial({...trademarkInitial, [e.target.name]: e.target.value})
        setGroupProductInitial({...groupProductInitial, [e.target.name]: e.target.value})
        setLocationInitial({...locationInitial, [e.target.name]: e.target.value})
        setPropertiesInitial({...propertiesInitial, [e.target.name]: e.target.value})
        setGroupProductSave({...groupProductSave, [e.target.name]: e.target.value})
        setTrademarkSave({...trademarkSave, [e.target.name]: e.target.value})
        setLocationSave({...locationSave, [e.target.name]: e.target.value})
        setPropertiesSave({...propertiesSave, [e.target.name]: e.target.value})
        setUnitSave({...unitSave, [e.target.name]: e.target.value})
        setSearchProduct({...searchProduct, [e.target.name]: e.target.value})
        setSearchProductName({...searchProductName, [e.target.name]: e.target.value})
        setSearchLocation({...searchLocation, [e.target.name]: e.target.value})
        setSearchCategory({...searchCategory, [e.target.name]: e.target.value})
        setSearchGroupProduct({...searchGroupProduct, [e.target.name]: e.target.value})
        setSearchTrademark({...searchTrademark, [e.target.name]: e.target.value})
        setSearchInventory({...searchInventory, [e.target.name]: e.target.value})
        setSearchDirectSales({...searchDirectSales, [e.target.name]: e.target.value})
        setSearchActive({...searchActive, [e.target.name]: e.target.value})
        setSearchGroupProductInitial({...searchGroupProductInitial, [e.target.name]: e.target.value})
        setSearchTrademarkInitial({...searchTrademarkInitial, [e.target.name]: e.target.value})
        setSearchCategoryInitial({...searchCategoryInitial, [e.target.name]: e.target.value})
        setSearchInventoryInitial({...searchInventoryInitial, [e.target.name]: e.target.value})
        setSearchDirectSalesInitial({...searchDirectSalesInitial, [e.target.name]: e.target.value})
        setSearchLocationInitial({...searchLocationInitial, [e.target.name]: e.target.value})
        setSearchActiveInitial({...searchActiveInitial, [e.target.name]: e.target.value})

    }
    const handleBasicClick = (value) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value)
    }
    // Search ID ----------------------------------------------------------------------------------------------------------
    const [searchProduct, setSearchProduct] = useState({
        productId: ''
    })
    const searchProductId = () => {
        let data = {
            productId: searchProduct.productId,
        }
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/product/id/' + data.productId, {headers: headers})
            .then(resp => {
                setListProduct(resp.data.data)
                console.log(data)
                // console.log(e.target.value)
            })
            .catch(e => {
                navigate('/');
            })

    }

    // Search name --------------------------------------------------------------------------------------------------------
    const [searchProductName, setSearchProductName] = useState({
        productName: ''
    })
    const searchName = () => {
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
                navigate('/');
            })
    }

    //  Search inventory ------------------------------------------------------------------------------------------------
    const [searchInventoryInitial, setSearchInventoryInitial] = useState({
        inventoryInitial: ''
    })
    console.log("searchInventoryInitial " + searchInventoryInitial.inventoryInitial)
    const [searchInventory, setSearchInventory] = useState({
        inventoryId: searchInventoryInitial.inventoryInitial
    })
    console.log("searchInventory" + searchInventory.inventoryId)
    const onSearchInventory = () => {
        let data = {
            inventoryId: searchInventory.inventoryId,
        }
        console.log("Inventory " + data.inventoryId)
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/product/search-inventory/' + data.inventoryId, {headers: headers})
            .then(resp => {
                setListProduct(resp.data.data)
            })
            .catch(e => {
                navigate('/');
            })
    }
    //  Search direct sales ------------------------------------------------------------------------------------------------
    const [searchDirectSalesInitial, setSearchDirectSalesInitial] = useState({
        directSalesInitial: ''
    })
    console.log("searchDirectSalesInitial " + searchDirectSalesInitial.directSalesInitial)
    const [searchDirectSales, setSearchDirectSales] = useState({
        directSalesId: searchDirectSalesInitial.directSalesInitial
    })
    console.log("searchDirectSales" + searchDirectSales.directSalesId)
    const onSearchDirectSales = () => {
        let data = {
            directSalesId: searchDirectSales.directSalesId,
        }
        console.log("DirectSales " + data.directSalesId)
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/product/search-direct-sales/' + data.directSalesId, {headers: headers})
            .then(resp => {
                setListProduct(resp.data.data)
            })
            .catch(e => {
                navigate('/');
            })
    }
    //  Search active ------------------------------------------------------------------------------------------------
    const [searchActiveInitial, setSearchActiveInitial] = useState({
        activeInitial: ''
    })
    console.log("searchActiveInitial " + searchActiveInitial.activeInitial)
    const [searchActive, setSearchActive] = useState({
        activeId: searchActiveInitial.activeInitial
    })
    console.log("searchActive" + searchActive.activeId)
    const onSearchActive = () => {
        let data = {
            activeId: searchActive.activeId,
        }
        console.log("Active " + data.activeId)
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/product/search-active/' + data.activeId, {headers: headers})
            .then(resp => {
                setListProduct(resp.data.data)
            })
            .catch(e => {
                navigate('/');
            })
    }


    //  Search group product ------------------------------------------------------------------------------------------------
    const [searchGroupProductInitial, setSearchGroupProductInitial] = useState({
        groupProductInitial: ''
    })
    const [searchGroupProduct, setSearchGroupProduct] = useState({
        groupProductId: searchGroupProductInitial.groupProductInitial
    })
    const onSearchGroupProduct = () => {
        let data = {
            groupProductId: searchGroupProduct.groupProductId,
        }

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/product/search-group-product/' + data.groupProductId, {headers: headers})
            .then(resp => {
                setListProduct(resp.data.data)
            })
            .catch(e => {
                navigate('/');
            })
    }
    //  Search trademark ------------------------------------------------------------------------------------------------
    const [searchTrademarkInitial, setSearchTrademarkInitial] = useState({
        trademarkInitial: ''
    })
    const [searchTrademark, setSearchTrademark] = useState({
        trademarkId: searchTrademarkInitial.trademarkInitial
    })
    const onSearchTrademark = () => {
        let data = {
            trademarkId: searchTrademark.trademarkId,
        }

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/product/search-group-product/' + data.trademarkId, {headers: headers})
            .then(resp => {
                setListProduct(resp.data.data)
            })
            .catch(e => {
                navigate('/');
            })
    }

    //  Search location ------------------------------------------------------------------------------------------------
    const [searchLocationInitial, setSearchLocationInitial] = useState({
        locationInitial: ''
    })
    const [searchLocation, setSearchLocation] = useState({
        locationId: searchLocationInitial.locationInitial
    })
    const onSearchLocation = () => {
        let data = {
            locationId: searchLocation.locationId,
        }

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/product/search-location/' + data.locationId, {headers: headers})
            .then(resp => {
                setListProduct(resp.data.data)
            })
            .catch(e => {
                navigate('/');
            })
    }

    //  Search category ------------------------------------------------------------------------------------------------
    const [searchCategoryInitial, setSearchCategoryInitial] = useState({
        categoryInitial: ''
    })
    console.log("searchCategoryInitial " + searchCategoryInitial.categoryInitial)
    const [searchCategory, setSearchCategory] = useState({
        categoryId: searchCategoryInitial.categoryInitial
    })
    console.log("searchCategory" + searchCategory.categoryId)
    const onSearchCategory = () => {
        let data = {
            categoryId: searchCategory.categoryId,
        }
        console.log("category " + data.categoryId)
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/product/search-category/' + data.categoryId, {headers: headers})
            .then(resp => {
                setListProduct(resp.data.data)
            })
            .catch(e => {
                navigate('/');
            })
    }

    // Export ----------------------------------------------------------------------------------------------------------

    const exportToExcel = () => {
        // Chuyển đổi dữ liệu thành worksheet
        const ws = XLSX.utils.json_to_sheet(listProduct)
        // Tạo một workbook mới
        const wb = XLSX.utils.book_new();
        // Thêm worksheet vào workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        // Ghi workbook ra buffer
        const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        // Tạo một Blob từ buffer
        const blob = new Blob([wbout], {type: 'application/octet-stream'});
        // Lưu file với tên 'data.xlsx'
        saveAs(blob, 'DanhSachSanPham.xlsx');
    };
//----------------------------------------------------------------------------------------------------------------------
    const handleDropdownItemClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };

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

    return (<div className='customDiv'>
        <MDBNavbar expand='lg' light bgColor='light' style={{fontSize: '13px'}} className='navbar'>
            <MDBContainer>
                <MDBNavbarBrand href='#' className={'fs-6'}>
                    <img src='https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/448430595_122166478826085181_3519841584373574767_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=hGiVbQdBb14Q7kNvgEBEJwv&_nc_ht=scontent-hkg4-1.xx&oh=00_AYDAV8ZoNPsI55lIXlonYXKMvzLVlbZeLluPu0pL6E6raA&oe=667326CB'
                         alt='Logo' style={{ height: '30px' }} /> {/* Điều chỉnh chiều cao của logo theo ý muốn */}
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
                <MDBCol size='md-2 mt-3'>
                    <MDBRow>
                        <MDBCol>
                            <h5 style={{color: "black"}}><b>Hàng hóa</b></h5>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
                <MDBCol size='md-10 mt-3'>
                    <MDBRow>
                        <MDBCol size='md-5'>
                            <MDBDropdown className='mb-4'>
                                <MDBDropdownToggle className='form-control text-dark bg-white text-start'>
                                    <SvgIcon>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1}
                                            stroke="currentColor"
                                            style={{fill: 'currentColor', stroke: 'none'}} // Đổi ngược lại màu
                                            className='mx-2'
                                        >
                                            <path
                                                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"></path>
                                        </svg>
                                    </SvgIcon>
                                    Theo mã, tên hàng
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className='form-control'>
                                <MDBContainer>
                                        <MDBDropdownItem className='mt-4 mb-2' onClick={handleDropdownItemClick}>
                                            <MDBRow>
                                                <MDBCol md='8'>
                                                    <MDBInput className={"bg-white"}
                                                              name={"productId"}
                                                              value={searchProduct.productId}
                                                              onChange={inputData} wrapperClass='mb-4'
                                                              label='Theo mã' size='lg'
                                                              type='text'/>
                                                </MDBCol>

                                                <MDBCol>
                                                    <MDBBtn className='btn btn-success mb-5 text-end'
                                                            onClick={searchProductId}>Tìm kiếm</MDBBtn>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md='8'>
                                                    <MDBInput className={"bg-white"}
                                                              name={"productName"}
                                                              value={searchProductName.productName}
                                                              onChange={inputData} wrapperClass='mb-4'
                                                              label='Tên hàng'
                                                              size='lg'
                                                              type='text'/>
                                                </MDBCol>
                                                <MDBCol>
                                                    <MDBBtn className='btn btn-success mb-5 text-end'
                                                            onClick={searchName}>Tìm kiếm</MDBBtn>
                                                </MDBCol>
                                            </MDBRow>

                                        </MDBDropdownItem>
                                    </MDBContainer>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBCol>
                        <MDBCol size='md-7'>
                            <MDBRow>
                                <MDBCol>
                                    <MDBBtn onClick={toggleOpen} className='btn btn-success form-control float-end'
                                            style={{textTransform: 'none'}}>
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
                                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"></path>
                                            </svg>
                                        </SvgIcon>
                                        <b>Thêm mới</b>
                                    </MDBBtn>
                                    <MDBModal tabIndex='-1'
                                              open={centredModal}
                                              onClose={() => setCentredModal(false)}>
                                        <MDBModalDialog size='xl'>
                                            <MDBModalContent>
                                                <MDBModalHeader>
                                                    <MDBModalTitle><b>Thêm hàng</b></MDBModalTitle>
                                                    <MDBBtn className='btn-close' color='none'
                                                            onClick={toggleOpen}></MDBBtn>
                                                </MDBModalHeader>
                                                <MDBModalBody>
                                                    <MDBTabs className='mb-3'>
                                                        <MDBTabsItem>
                                                            <MDBTabsLink onClick={() => handleBasicClick('tab1')}
                                                                         active={basicActive === 'tab1'}
                                                                         style={{
                                                                             textTransform: 'none', fontSize: '16px'
                                                                         }}
                                                                         className='text-dark'
                                                            >
                                                                Thông tin
                                                            </MDBTabsLink>
                                                        </MDBTabsItem>
                                                        <MDBTabsItem>
                                                            <MDBTabsLink onClick={() => handleBasicClick('tab2')}
                                                                         active={basicActive === 'tab2'}
                                                                         style={{
                                                                             textTransform: 'none', fontSize: '16px'
                                                                         }}
                                                                         className='text-dark'>
                                                                Mô tả chi tiết
                                                            </MDBTabsLink>
                                                        </MDBTabsItem>
                                                        <MDBTabsItem>
                                                            <MDBTabsLink onClick={() => handleBasicClick('tab3')}
                                                                         active={basicActive === 'tab3'}
                                                                         style={{
                                                                             textTransform: 'none', fontSize: '16px'
                                                                         }}
                                                                         className='text-dark'>
                                                                Thành phần
                                                            </MDBTabsLink>
                                                        </MDBTabsItem>
                                                    </MDBTabs>
                                                    <MDBTabsContent>
                                                        <MDBTabsPane open={basicActive === 'tab1'}>
                                                            <MDBRow>
                                                                <MDBCol md="7" className='mt-3'>
                                                                    <MDBRow>
                                                                        <MDBCol md="4" className="ps-5 mt-2">
                                                                            <h6><b>Tên hàng</b></h6>
                                                                        </MDBCol>
                                                                        <MDBCol md="8">
                                                                            <MDBInput name={'productName'}
                                                                                      value={productSave.productName}
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
                                                                                      value={productSave.capitalPrice}
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
                                                                            <MDBInputGroup>
                                                                                <select
                                                                                    onChange={inputData}
                                                                                    name='groupProductId'
                                                                                    value={productSave.groupProductId}
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
                                                                                <MDBBtn color='success'
                                                                                        onClick={toggleOpenGroupProduct}
                                                                                        outline>Thêm
                                                                                </MDBBtn>

                                                                                <MDBModal open={groupProduct}
                                                                                          onClose={() => setGroupProduct(false)}
                                                                                          tabIndex='-1'>
                                                                                    <MDBModalDialog>
                                                                                        <MDBModalContent>
                                                                                            <MDBModalHeader>
                                                                                                <MDBModalTitle><b>Thêm
                                                                                                    nhóm
                                                                                                    hàng</b></MDBModalTitle>
                                                                                                <MDBBtn
                                                                                                    className='btn-close'
                                                                                                    color='none'
                                                                                                    onClick={toggleOpenGroupProduct}></MDBBtn>
                                                                                            </MDBModalHeader>
                                                                                            <MDBModalBody>
                                                                                                <MDBRow>
                                                                                                    <MDBCol md="4"
                                                                                                            className="ps-3 mt-2">
                                                                                                        <h6><b>Tên
                                                                                                            nhóm</b>
                                                                                                        </h6>
                                                                                                    </MDBCol>
                                                                                                    <MDBCol md="8">
                                                                                                        <MDBInput
                                                                                                            name={'groupProductName'}
                                                                                                            value={groupProductSave.groupProductName}
                                                                                                            onChange={inputData}
                                                                                                            className="form-control"
                                                                                                            type='text'/>
                                                                                                    </MDBCol>
                                                                                                </MDBRow>
                                                                                            </MDBModalBody>

                                                                                            <MDBModalFooter>
                                                                                                <MDBBtn
                                                                                                    onClick={onGroupProductSave}
                                                                                                    color='success'>Lưu</MDBBtn>
                                                                                                <MDBBtn color='dark'
                                                                                                        onClick={toggleOpenGroupProduct}>
                                                                                                    Bỏ qua
                                                                                                </MDBBtn>
                                                                                            </MDBModalFooter>
                                                                                        </MDBModalContent>
                                                                                    </MDBModalDialog>
                                                                                </MDBModal>
                                                                            </MDBInputGroup>
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
                                                                                      value={productSave.price}
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
                                                                            <MDBInputGroup>
                                                                                <select
                                                                                    onChange={inputData}
                                                                                    name='trademarkId'
                                                                                    value={productSave.trademarkId}
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
                                                                                <MDBBtn color='success'
                                                                                        onClick={toggleOpenTrademark}
                                                                                        outline>Thêm
                                                                                </MDBBtn>
                                                                                <MDBModal open={trademark}
                                                                                          onClose={() => setTrademark(false)}
                                                                                          tabIndex='-1'>
                                                                                    <MDBModalDialog>
                                                                                        <MDBModalContent>
                                                                                            <MDBModalHeader>
                                                                                                <MDBModalTitle><b>Thêm
                                                                                                    thương
                                                                                                    hiệu</b></MDBModalTitle>
                                                                                                <MDBBtn
                                                                                                    className='btn-close'
                                                                                                    color='none'
                                                                                                    onClick={toggleOpenTrademark}></MDBBtn>
                                                                                            </MDBModalHeader>
                                                                                            <MDBModalBody>
                                                                                                <MDBRow>
                                                                                                    <MDBCol md="4"
                                                                                                            className="ps-3 mt-2">
                                                                                                        <h6><b>Tên
                                                                                                            thương
                                                                                                            hiệu</b>
                                                                                                        </h6>
                                                                                                    </MDBCol>
                                                                                                    <MDBCol md="7">
                                                                                                        <MDBInput
                                                                                                            name={'trademarkName'}
                                                                                                            value={trademarkSave.trademarkName}
                                                                                                            onChange={inputData}
                                                                                                            className="form-control"
                                                                                                            type='text'/>
                                                                                                    </MDBCol>
                                                                                                </MDBRow>
                                                                                            </MDBModalBody>

                                                                                            <MDBModalFooter>
                                                                                                <MDBBtn
                                                                                                    onClick={onTradeMarkSave}
                                                                                                    color='success'>Lưu</MDBBtn>
                                                                                                <MDBBtn color='dark'
                                                                                                        onClick={toggleOpenTrademark}>
                                                                                                    Bỏ qua
                                                                                                </MDBBtn>
                                                                                            </MDBModalFooter>
                                                                                        </MDBModalContent>
                                                                                    </MDBModalDialog>
                                                                                </MDBModal>
                                                                            </MDBInputGroup>
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
                                                                                      value={productSave.inventory}
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
                                                                            <MDBInputGroup>
                                                                                <select
                                                                                    onChange={inputData}
                                                                                    name='locationId'
                                                                                    value={productSave.locationId}
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
                                                                                <MDBBtn color='success'
                                                                                        onClick={toggleOpenLocation}
                                                                                        outline>Thêm
                                                                                </MDBBtn>
                                                                                <MDBModal open={location}
                                                                                          onClose={() => setLocation(false)}
                                                                                          tabIndex='-1'>
                                                                                    <MDBModalDialog>
                                                                                        <MDBModalContent>
                                                                                            <MDBModalHeader>
                                                                                                <MDBModalTitle><b>Thêm
                                                                                                    vị
                                                                                                    trí</b></MDBModalTitle>
                                                                                                <MDBBtn
                                                                                                    className='btn-close'
                                                                                                    color='none'
                                                                                                    onClick={toggleOpenLocation}></MDBBtn>
                                                                                            </MDBModalHeader>
                                                                                            <MDBModalBody>
                                                                                                <MDBRow>
                                                                                                    <MDBCol md="3"
                                                                                                            className="ps-3 mt-2">
                                                                                                        <h6><b>Tên
                                                                                                            vị
                                                                                                            trí</b>
                                                                                                        </h6>
                                                                                                    </MDBCol>
                                                                                                    <MDBCol md="8">
                                                                                                        <MDBInput
                                                                                                            value={locationSave.locationName}
                                                                                                            name={'locationName'}
                                                                                                            onChange={inputData}
                                                                                                            className="form-control"
                                                                                                            type='text'/>

                                                                                                    </MDBCol>
                                                                                                </MDBRow>
                                                                                            </MDBModalBody>

                                                                                            <MDBModalFooter>
                                                                                                <MDBBtn
                                                                                                    color='success'
                                                                                                    onClick={onLocationSave}>Lưu</MDBBtn>
                                                                                                <MDBBtn color='dark'
                                                                                                        onClick={toggleOpenLocation}>
                                                                                                    Bỏ qua
                                                                                                </MDBBtn>
                                                                                            </MDBModalFooter>
                                                                                        </MDBModalContent>
                                                                                    </MDBModalDialog>
                                                                                </MDBModal>
                                                                            </MDBInputGroup>
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
                                                                                      value={productSave.weight}
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
                                                                            <h6><b>Thuộc tính</b></h6>
                                                                        </MDBCol>
                                                                        <MDBCol md="8">
                                                                            <MDBInputGroup>
                                                                                <select
                                                                                    onChange={inputData}
                                                                                    name='propertiesId'
                                                                                    value={productSave.propertiesId}
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
                                                                                <MDBBtn color='success'
                                                                                        onClick={toggleOpenProperties}
                                                                                        outline>Thêm</MDBBtn>
                                                                                <MDBModal open={properties}
                                                                                          onClose={() => setProperties(false)}
                                                                                          tabIndex='-1'>
                                                                                    <MDBModalDialog>
                                                                                        <MDBModalContent>
                                                                                            <MDBModalHeader>
                                                                                                <MDBModalTitle><b>Thêm
                                                                                                    thuộc
                                                                                                    tính</b></MDBModalTitle>
                                                                                                <MDBBtn
                                                                                                    className='btn-close'
                                                                                                    color='none'
                                                                                                    onClick={toggleOpenProperties}></MDBBtn>
                                                                                            </MDBModalHeader>
                                                                                            <MDBModalBody>
                                                                                                <MDBRow>
                                                                                                    <MDBCol md="4"
                                                                                                            className="ps-3 mt-2">
                                                                                                        <h6><b>Tên
                                                                                                            thuộc
                                                                                                            tính</b>
                                                                                                        </h6>
                                                                                                    </MDBCol>
                                                                                                    <MDBCol md="7">
                                                                                                        <MDBInput
                                                                                                            value={propertiesSave.propertiesName}
                                                                                                            name={'propertiesName'}
                                                                                                            onChange={inputData}
                                                                                                            className="form-control"
                                                                                                            type='text'/>
                                                                                                    </MDBCol>
                                                                                                </MDBRow>
                                                                                            </MDBModalBody>

                                                                                            <MDBModalFooter>
                                                                                                <MDBBtn
                                                                                                    onClick={onPropertiesSave}
                                                                                                    color='success'>Lưu</MDBBtn>
                                                                                                <MDBBtn color='dark'
                                                                                                        onClick={toggleOpenProperties}>
                                                                                                    Bỏ qua
                                                                                                </MDBBtn>
                                                                                            </MDBModalFooter>
                                                                                        </MDBModalContent>
                                                                                    </MDBModalDialog>
                                                                                </MDBModal>
                                                                            </MDBInputGroup>
                                                                        </MDBCol>
                                                                    </MDBRow>

                                                                </MDBCol>
                                                                <MDBCol md="5" className="mt-4">
                                                                    <MDBRow>

                                                                        <MDBCol md="12"
                                                                                className='form-check form-switch ps-5 mt-2 ms-4'>
                                                                            {/*<MDBInput class="form-check-input"*/}
                                                                            {/*          type="checkbox"*/}
                                                                            {/*          role="switch"*/}
                                                                            {/*          name="directSalesInitial"*/}
                                                                            {/*          checked={directSalesInitial}*/}
                                                                            {/*          onChange={inputData}*/}
                                                                            {/*          label={<strong>Bán trực*/}
                                                                            {/*              tiếp</strong>}*/}
                                                                            {/*/>*/}
                                                                            <div className="form-check form-switch">
                                                                                <input className="form-check-input"
                                                                                       type="checkbox" role="switch"
                                                                                       id="flexSwitchCheckChecked"
                                                                                       name="directSalesInitial"
                                                                                       checked={directSalesInitial}
                                                                                       onChange={inputData}/>
                                                                                <label className="form-check-label"
                                                                                       htmlFor="flexSwitchCheckChecked">Bán trực tiếp</label>
                                                                            </div>
                                                                        </MDBCol>
                                                                    </MDBRow>
                                                                </MDBCol>

                                                            </MDBRow>
                                                            <MDBRow>
                                                                <MDBCol md="7" className="mt-4">
                                                                    <MDBRow>
                                                                        <MDBCol md="4" className="ps-5 mt-2">
                                                                            <h6><b>Đơn vị cơ bản</b></h6>
                                                                        </MDBCol>
                                                                        <MDBCol md="8">
                                                                            <MDBInputGroup>
                                                                                <select
                                                                                    onChange={inputData}
                                                                                    name='unitId'
                                                                                    value={productSave.unitId}
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
                                                                                <MDBBtn color='success'
                                                                                        onClick={toggleOpenUnit}
                                                                                        outline>Thêm
                                                                                </MDBBtn>
                                                                                <MDBModal open={unit}
                                                                                          onClose={() => setUnit(false)}
                                                                                          tabIndex='-1'>
                                                                                    <MDBModalDialog>
                                                                                        <MDBModalContent>
                                                                                            <MDBModalHeader>
                                                                                                <MDBModalTitle><b>Thêm
                                                                                                    đơn
                                                                                                    vị</b></MDBModalTitle>
                                                                                                <MDBBtn
                                                                                                    className='btn-close'
                                                                                                    color='none'
                                                                                                    onClick={toggleOpenUnit}></MDBBtn>
                                                                                            </MDBModalHeader>
                                                                                            <MDBModalBody>
                                                                                                <MDBRow>
                                                                                                    <MDBCol md="3"
                                                                                                            className="ps-3 mt-2">
                                                                                                        <h6><b>Tên
                                                                                                            đơn
                                                                                                            vị</b>
                                                                                                        </h6>
                                                                                                    </MDBCol>
                                                                                                    <MDBCol md="8">
                                                                                                        <MDBInput
                                                                                                            value={unitSave.unitName}
                                                                                                            name={'unitName'}
                                                                                                            onChange={inputData}
                                                                                                            className="form-control"
                                                                                                            type='text'/>
                                                                                                    </MDBCol>
                                                                                                </MDBRow>
                                                                                            </MDBModalBody>

                                                                                            <MDBModalFooter>
                                                                                                <MDBBtn
                                                                                                    onClick={onUnitSave}
                                                                                                    color='success'>Lưu</MDBBtn>
                                                                                                <MDBBtn color='dark'
                                                                                                        onClick={toggleOpenUnit}>
                                                                                                    Bỏ qua
                                                                                                </MDBBtn>
                                                                                            </MDBModalFooter>
                                                                                        </MDBModalContent>
                                                                                    </MDBModalDialog>
                                                                                </MDBModal>
                                                                            </MDBInputGroup>
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
                                                                                    name='categoryId'
                                                                                    value={productSave.categoryId}
                                                                                    className={'form-control'}
                                                                                    required
                                                                                >
                                                                                    {listCategory.map((category) => (
                                                                                        <option
                                                                                            key={category.categoryId}
                                                                                            value={category.categoryId}>
                                                                                            {category.categoryName}
                                                                                        </option>))}
                                                                                </select>
                                                                        </MDBCol>
                                                                    </MDBRow>

                                                                </MDBCol>

                                                            </MDBRow>
                                                        </MDBTabsPane>
                                                        <MDBTabsPane open={basicActive === 'tab2'}>

                                                        </MDBTabsPane>
                                                        <MDBTabsPane open={basicActive === 'tab3'}>
                                                            <MDBRow>
                                                                <MDBCol md="3" className="ps-5 mt-2">
                                                                    <h6><b>Hàng hóa thành phần</b></h6>
                                                                </MDBCol>
                                                                <MDBCol md="8">
                                                                    <MDBInput placeholder="Thêm hàng hóa thành phần"
                                                                              className="form-control"
                                                                              type='search'/>
                                                                </MDBCol>
                                                            </MDBRow>
                                                        </MDBTabsPane>
                                                    </MDBTabsContent>
                                                </MDBModalBody>
                                                <MDBModalFooter>
                                                    <MDBBtn color='success' onClick={onSave}><b>Lưu</b></MDBBtn>
                                                    <MDBBtn color='success' onClick={onSave}><b>Lưu & Thêm
                                                        mới</b></MDBBtn>
                                                    <MDBBtn color='success' onClick={onSave}><b>Lưu & Sao
                                                        chép</b></MDBBtn>
                                                    <MDBBtn color='dark' onClick={toggleOpen}>
                                                        <b>Bỏ qua</b>
                                                    </MDBBtn>
                                                </MDBModalFooter>
                                            </MDBModalContent>
                                        </MDBModalDialog>
                                    </MDBModal>
                                </MDBCol>
                                <MDBCol>
                                    <MDBBtn className='btn btn-success form-control float-end'
                                            style={{textTransform: 'none'}}
                                    >
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
                                                    d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2m-11-4 2.03 2.71L16 11l4 5H8zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6z"></path>
                                            </svg>
                                        </SvgIcon>
                                        <b>Thêm ảnh</b>
                                    </MDBBtn>
                                </MDBCol>
                                <MDBCol>
                                    <MDBBtn className='btn btn-success form-control float-end'
                                            style={{textTransform: 'none'}}
                                    >
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
                                                    d="M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8z"></path>
                                            </svg>
                                        </SvgIcon>
                                        <b>Nhập file</b>
                                    </MDBBtn>
                                </MDBCol>
                                <MDBCol>
                                    <MDBBtn className='btn btn-success form-control float-end'
                                            onClick={exportToExcel}
                                            style={{textTransform: 'none'}}
                                    >
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
                                        <b>Xuất file</b>
                                    </MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        <MDBContainer>
            <MDBRow>
                <MDBCol size="md-2">
                    <MDBRow>
                        <MDBCol>
                            <div className="w-100 p-3 shadow mb-3 bg-white rounded-4">
                                <p><b>Loại hàng</b></p>
                                <MDBRadio name='categoryId'
                                          onClick={onListProduct}
                                          defaultChecked
                                          label='Tất cả'/><br/>
                                <MDBRadio name='categoryId'
                                          value={1}
                                          onClick={onSearchCategory}
                                          onChange={inputData}
                                          label='Hàng hóa'/><br/>
                                <MDBRadio name='categoryId'
                                          value={2}
                                          onClick={onSearchCategory}
                                          onChange={inputData}
                                          label='Dịch vụ'/><br/>
                                <MDBRadio name='categoryId'
                                          value={3}
                                          onClick={onSearchCategory}
                                          onChange={inputData}
                                          label='Combo - Đóng gói'/><br/>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <div className="w-100 p-3 shadow mb-3 bg-white rounded-4">
                                <p><b>Nhóm hàng</b></p>
                                <select
                                    onChange={inputData}
                                    onClick={onSearchGroupProduct}
                                    name='groupProductId'
                                    value={searchGroupProduct.groupProductId}
                                    className={'form-control'}
                                    required
                                >
                                    {listGroupProduct.map((groupProduct) => (
                                        <option
                                            value={groupProduct.groupProductId}>
                                            {groupProduct.groupProductName}
                                        </option>))}
                                </select>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <div className="w-100 p-3 shadow mb-3 bg-white rounded-4">
                                <p><b>Tồn kho</b></p>
                                <MDBRadio name='inventoryId'
                                          onClick={onListProduct}
                                          defaultChecked
                                          label='Tất cả'/><br/>
                                <MDBRadio name='inventoryId'
                                          value={1}
                                          onClick={onSearchInventory}
                                          onChange={inputData}
                                          label='Dưới định mức tồn'/><br/>
                                <MDBRadio name='inventoryId'
                                          value={2}
                                          onClick={onSearchInventory}
                                          onChange={inputData}
                                          label='Vượt định mức tồn'/><br/>
                                <MDBRadio name='inventoryId'
                                          value={3}
                                          onClick={onSearchInventory}
                                          onChange={inputData}
                                          label='Còn hàng trong kho'/><br/>
                                <MDBRadio name='inventoryId'
                                          value={4}
                                          onClick={onSearchInventory}
                                          onChange={inputData}
                                          label='Hết hàng trong kho'/><br/>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <div className="w-100 p-3 shadow mb-3 bg-white rounded-4">
                                <p><b>Thương hiệu</b></p>
                                <select
                                    onChange={inputData}
                                    onClick={onSearchTrademark}
                                    name='trademarkId'
                                    value={searchTrademark.trademarkId}
                                    className={'form-control'}
                                    required
                                >
                                    {listTrademark.map((trademark) => (
                                        <option
                                            value={trademark.trademarkId}>
                                            {trademark.trademarkName}
                                        </option>))}
                                </select>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <div className="w-100 p-3 shadow mb-3 bg-white rounded-4">
                                <p>Bán trực tiếp</p><br/>
                                <MDBRadio name='directSalesId'
                                          id='directSalesId'
                                          value={1}
                                          onChange={inputData}
                                          onClick={onSearchDirectSales}
                                          defaultChecked
                                          label='Tất cả'/><br/>
                                <MDBRadio name='directSalesId'
                                          id='directSalesId'
                                          value={2}
                                          onChange={inputData}
                                          onClick={onSearchDirectSales}
                                          label='Được bán trực tiếp'/><br/>
                                <MDBRadio name='directSalesId'
                                          id='directSalesId'
                                          value={3}
                                          onChange={inputData}
                                          onClick={onSearchDirectSales}
                                          label='Không bán trực tiếp'/><br/>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <div className="w-100 p-3 shadow mb-3 bg-white rounded-4">
                                <p><b>Vị trí</b></p>
                                <select
                                    onChange={inputData}
                                    onClick={onSearchLocation}
                                    name='locationId'
                                    value={searchLocation.locationId}
                                    className={'form-control'}
                                    required
                                >
                                    {listLocation.map((location) => (
                                        <option
                                            value={location.locationId}>
                                            {location.locationName}
                                        </option>))}
                                </select>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <div className="w-100 p-3 shadow mb-5 bg-white rounded-4">
                                <p>Lựa chọn hiển thị</p><br/>
                                <MDBRadio name='activeId'
                                          id='activeId'
                                          value={1}
                                          onChange={inputData}
                                          onClick={onSearchActive}
                                          label='Hàng đang bán'/><br/>
                                <MDBRadio name='activeId'
                                          id='activeId'
                                          value={2}
                                          onChange={inputData}
                                          onClick={onSearchActive}
                                          label='Hàng ngừng bán'/><br/>
                                <MDBRadio name='activeId'
                                          id='activeId'
                                          value={3}
                                          onChange={inputData}
                                          onClick={onListProduct}
                                          defaultChecked
                                          label='Tất cả'/><br/>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
                <MDBCol size="md-10">
                    <MDBRow>
                        <MDBCol>
                            <div style={{height: 750, width: '100%'}}>
                                <DataGrid
                                    rows={listProduct}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {page: 0, pageSize: 15},
                                        },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                    style={{backgroundColor: '#f7f8f9', borderColor: "#9fbcd8"}}
                                    className='customDataGrid'
                                />
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    </div>)
}

export default FormProduct


                