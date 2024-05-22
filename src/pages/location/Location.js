import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Button} from "@mui/material";
import axios from "axios";
import {MDBContainer, MDBInput} from "mdb-react-ui-kit";
import * as React from "react";
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

function Location(){
    const [viTri, setViTri] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        getListLocation()
    }, []);

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'ten_vi_tri', headerName: 'Vị trí', width: 130},
        {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            width: 100,
            renderCell: (params) =>(

                <strong>
                    <Button
                        variant="contaied"
                        size="smaill"
                        tabIndex={params.hasFocus ? 0 : -1}
                        onClick={del}
                        value={params.id}
                    >
                        Delete
                    </Button>
                </strong>
            ),
        },
    ];

    const del = (e) => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/vi-tri/delete?id=' + e.target.value, {headers: headers})
            .then(resp => {
                console.log("XOA THANH CONG")
                getListLocation()
            })
            .catch(e => {
                console.log(e)
                navigate("/login")
            })
    }

    const getListLocation = () => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get('/vi-tri/list', {headers: headers})
            .then(resp => {
                setViTri(resp.data.data)
            })
            .catch(e => {
                console.log(e)
                navigate("/login")
            })
    }
//
    const [centredModal, setCentredModal] = useState(false);

    const toggleOpen = () => setCentredModal(!centredModal);
    const [viTriSave, setViTriSave] = useState({
        idViTri: '',
        tenViTri: ''
    })

    const inputData = (e) => {
        setViTriSave({...viTriSave, [e.target.name]: e.target.value})
    }
    const onSave = (e) => {
        let data = {
            tenViTri: viTriSave.tenViTri,
        }

        axios.post('/vi-tri/save', data)
            .then(resp => {
                getListLocation()
            })
    }

    return (

        <div>
            <MDBContainer>
                <MDBBtn onClick={toggleOpen} className={'btn btn-warning mb-3'}>Thêm vị trí</MDBBtn>

                <MDBModal tabIndex='-1' open={centredModal} onClose={() => setCentredModal(false)}>
                    <MDBModalDialog centered>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Create</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <MDBInput name={'tenViTri'} value={viTriSave.tenViTri} onChange={inputData} wrapperClass='mb-4' label='Name' type='text'/>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={toggleOpen}>
                                    Close
                                </MDBBtn>
                                <MDBBtn onClick={onSave}>Save changes</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
                <DataGrid style={{ height: 750, width: '30%'}}
                    rows={viTri}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[0, 5]}
                    checkboxSelection
                />
            </MDBContainer>
        </div>
    );
}
export default Location