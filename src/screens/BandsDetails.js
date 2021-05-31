import axios from 'axios';
import {React,useEffect,useState,useCallback} from 'react';
import {useParams} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Header from "../components/Header";

const useStyles = makeStyles({
  root: {
    width:"50%",
    height:"70%"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function BandsDetails(props) {
    const {id} =useParams();
    const [data,setData] =useState([])
    

    const Back = () =>{
      props.history.goBack()
    }

    useEffect(() => {
        getBand();
        },  []);

    const getBand = async()=>{
         await axios.get(`http://localhost:3000/bands/${id}?_embed=albums`)
        .then(response=>{
            setData(response.data);
           }).catch(error=>{
             console.log(error);
           })
    }

    const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

    console.log(data.albums)
  return ( 
    <div > 
      <Header></Header>  
        <Card className={classes.root}>
      <CardContent>
        <Button variant="contained" color="primary" onClick={Back}>
           Go Back
        </Button>
      <Typography variant="h4" component="h2">
          {data.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {data.genreCode}
        </Typography>
        <Typography  >
          {data.year}
        </Typography>
        <Typography  className={classes.pos}>
          {data.country}
        </Typography>
        <Typography variant="body2" component="p">
          Members:
        </Typography>
        {
        (data.members != null && data.members.length > 0)
        ?
        data.members.map((member,index) => (
            <li key={index}>
                {member.name}
            </li>
        ))
        :
        (<li>No existen datos</li>)
        }
        <Typography style={{marginTop:10}}variant="body2" component="p">
          Albums:
        </Typography>
        {
        (data.albums != null && data.albums.length > 0)
        ?
        data.albums.map((album,index) => (
            <li key={index}>
                {album.name} -- {album.year}
            </li>
        ))
        :
        (<li>No existen datos</li>)
        }
      </CardContent>
      
    </Card>

    </div>
  );
}