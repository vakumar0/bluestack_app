import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import {isBrowser} from 'react-device-detect';
import GridMobileActionSection from '../components/gridMobileActionSection.component';
import GridBrowserActionSection from '../components/gridBrowserActionSection.component';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,      
      marginTop: '4rem',
      boxShadow: '0px 2px 10px rgb(0 0 0 / 10%)'
    },
    body: {
      height: 90,
      borderRadius: 0,
      boxShadow: 'none',
      color: '#556789',
      fontSize: '1.6rem',
      padding: '1rem',
      display: 'flex',
      borderBottom: '1px solid #ECECEC'
    }    
  }));
  

export default function Game({value, index, id, ...props}) {

    const classes = useStyles();  

    return(
        <>
            <Grid item xs={12}>
                <Grid container justify="left">                    
                    <Grid key={index} item xs={isBrowser ? 2: 3}>
                        <Paper className={classes.body}>
                            {/* <span className="img--text" style={{'white-space': 'normal'}}>{new Date(value.createdOn).toDateString()}</span> */}
                            <div>
                                <div className='img--text' style={{'white-space': 'normal'}}>{new Date(value.createdOn).toDateString()}</div>                                
                                <div className='img--italic' style={isBrowser ? {'text-align': 'center'} : null}>{value.estimatedTime}</div>
                            </div>  
                        </Paper>                                                 
                    </Grid>
                    
                    <Grid key={index} item xs={ isBrowser ? 4 : 6}>  
                        <Paper className={classes.body} >
                            <img className="img" src={ process.env.PUBLIC_URL +"/img/" + value.image_url} alt="price"></img>
                            <div>
                                <div className='img--text'>{value.name}</div>
                                <div className='img--italic'>{value.region}</div>
                            </div>                            
                        </Paper>                                              
                    </Grid>
                    
                    <Grid key={index} item xs={ isBrowser ? 2 : 1} style={ isBrowser ? { display: 'block'} : { display : 'none'}}>                        
                        <Paper className={classes.body}  aria-describedby={id} variant="contained" color="primary" onClick={props.onClick}>
                            <img className="icons" src={ process.env.PUBLIC_URL +"/icons/dollar.png"} alt="price" ></img>
                            { isBrowser ? (<span className="icons--text">View Pricing</span>) : null}
                        </Paper>                                   
                    </Grid>
                    
                    <GridBrowserActionSection value = {value} navTabs = {props.navTabs}/>

                    <GridMobileActionSection value={value} id={id} onClick={props.onClick} navTabs = {props.navTabs}/> 
                </Grid>
            </Grid>
        </>
    )
}