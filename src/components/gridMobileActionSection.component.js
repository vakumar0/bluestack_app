import React, { useState }  from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import {isBrowser, isMobile} from 'react-device-detect';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({    
    paper: {
        height: 48,
        borderRadius: 0,
        boxShadow: 'none',
        backgroundColor: '#F1F1F4',
        color: '#556789',
        fontWeight: 500,
        fontSize: '1.6rem',
        padding: '1rem'
      },
      control: {
        padding: theme.spacing(8)
        
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


export default function GridMobileActionSection(props) {

    const classes = useStyles();
    const [isCalendarRequired, setCalendar] = useState(false);

    function saveDate(date) {     
        setCalendar(!isCalendarRequired);
        
        const info = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                createdOn: date,
                id: props.value.id
            })       
        }
        
        fetch('https://bluestack-app.herokuapp.com/', info)
        .then( response => {
            if(props.navTabs.selectedTab === 'upcomingCampaigns') props.navTabs.upcomingCampaignsClick();
            else if(props.navTabs.selectedTab === 'liveCampaigns') props.navTabs.liveCampaignsClick();
            else props.navTabs.pastCampaignsClick();
        })
    }  


    return(
        <>
            <Grid key={props.value} item xs={3} style={ isMobile ? { display: 'block'} : { display : 'none'}}>
                <Grid container justify="left" spacing={0}>
                    <Grid container justify="left">
                        <Grid key={props.value} item xs={6} style={{height: '45px'}}>
                            <Paper className={classes.body} style={{height: '45px', border: 'none'}} aria-describedby={props.id} variant="contained" color="primary" >
                                <img className="icons" src={ process.env.PUBLIC_URL +"/icons/dollar.png"} alt="price" onClick={props.onClick}></img>
                                { isBrowser ? (<span className="icons--text">View Pricing</span>) : null}
                            </Paper>                            
                        </Grid>
                        <Grid key={props.value} item xs={6} style={{height: '45px'}}>
                            <Paper className={classes.body} style={{height: '45px', border: 'none'}} >
                                <img className="icons" src={ process.env.PUBLIC_URL +"/icons/csv.png"} alt="csv"></img>
                                { isBrowser ? (<span className="icons--text">CSV</span>) : null }
                            </Paper>
                        </Grid>                    
                    </Grid>
                    <Grid container justify="left" style={{height: '45px'}}>
                        <Grid key={props.value} item xs={6} style={{height: '45px'}}>
                            <Paper className={classes.body} style={{height: '45px'}}>
                                <img className="icons" src={ process.env.PUBLIC_URL +"/icons/report.png"} alt="report"></img>
                                { isBrowser ? (<span className="icons--text">Report</span>) : null }
                            </Paper>
                        </Grid>
                        <Grid key={props.value} item xs={6}>
                            <Paper className={classes.body} style={{height: '45px'}}  onClick= {() => setCalendar(!isCalendarRequired)} >
                                <img className="icons" src={ process.env.PUBLIC_URL +"/icons/calendar.png"} alt="report"></img>
                                { isBrowser ? (<span className="icons--text">Schedule Again</span>) : null }
                            </Paper>                                             
                            <div className={isCalendarRequired ? "datePicker datePicker--active": "datePicker--disabled"}>
                                <div class="cover" onClick = {() => setCalendar(!isCalendarRequired)}></div>
                                <DatePicker
                                    selected={new Date()}
                                    onChange={(date) => saveDate(date)}
                                    inline                                
                                />
                            </div>  
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

