import Button from '@material-ui/core/Button';
import {React,useEffect,useState, useCallback} from 'react';
import { DataGrid,GridToolbar } from '@material-ui/data-grid';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import Header from "../components/Header";


const columns = [
    {
        field: 'id',
        headerName: 'ID',
        type: 'number',
        width: 130,
        renderCell:rowData=><Link to={`/bands/${rowData.id}`}  style={{ color: "black", textDecoration: "none" }} >{rowData.id}</Link>
      },
  { field: 'name', headerName: 'NAME', width: 130 },
  { field: 'genreCode', headerName: 'GENRE', width: 130 },
  {
    field: 'year',
    headerName: 'YEAR',
    type: 'number',
    width: 130,
  },
  {field: 'action', 
  headerName: 'ACTIONS', 
  width: 150, 
  renderCell: (params) => (
    <strong>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
      >
        <Link to={`/bands/${params.id}`}  style={{ color: "#FFF", textDecoration: "none" }} >
            Learn More
        </Link>
      </Button>
    </strong>
  ),
    }
];




export default function Bands() {
    const [data, setData]= useState([]);
    //const [user, setUser]= useState({});
    console.log("http://localhost:3000/bands?_embed=albums")

    const getBands = useCallback (async() => {
       await axios.get("http://localhost:3000/bands?_embed=albums")
       .then(response=>{
        setData(response.data);
       }).catch(error=>{
         console.log(error);
       })
   });

  //  const getUser=()=>{
      
  //     const config ={
  //       headers:{
  //         Authorization: "Bearer" + localStorage.getItem("token")
  //       }
  //     }
  //     axios.get("http://localhost:3000/users",config).then(
  //       res =>{
  //           setUser({user:res.data})
  //           console.log("usuario",res.data)
  //       },
  //       err =>{
  //         console.log(err)
  //       }
  //     )
  //     console.log(localStorage.getItem("token"));

  //  }
   useEffect(() => {
       //getUser();
       getBands();
   },  []);

  return (
    <div>
    <Header></Header> 
    <div style={{ height: 400, width: '100%' }}>
      <Typography variant="h4"> Search your favourite band</Typography>
      <DataGrid rows={data} columns={columns} pageSize={5} components={{Toolbar: GridToolbar,}} />
    </div>
    </div>
  );
}