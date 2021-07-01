import React, { useState } from 'react';
import '../components/grids.styles.css';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Popover, Typography   } from "@material-ui/core";
import {isBrowser} from 'react-device-detect';
import Game from './game.components';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,      
      marginTop: '4rem',
      boxShadow: '0px 2px 10px rgb(0 0 0 / 10%)'
    },
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
    },
    // modal: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
        
    // },
    // modalPaper: {
    //     backgroundColor: theme.palette.background.paper,
    //     border: 'none',
    //     borderRadius: 0,
    //     boxShadow: theme.shadows[5],
    //     padding: 0,
    //     outline: 0,
    //     width: '40rem',
    //     height: '35rem'
    //   },
      typography: {
        padding: theme.spacing(2),
        fontSize: '1.6rem',
        boxShadow: theme.shadows[5]
      }      
  }));
  
export default function Grids(props) {    
    const classes = useStyles();        
    //const [open, setOpen] = useState(false);    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedGame, setSelectedGame] = useState(null);

    const handleClick = (game) => {                
        return function(event) {
            setAnchorEl(event.currentTarget);
            setSelectedGame(game);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openPopOver = Boolean(anchorEl);
    const id = openPopOver ? 'simple-popover' : undefined;

    return (
        <>
            <Grid container className={classes.root}>
                <Grid item xs={12}>            
                    <Grid container justify="left" style={ isBrowser ? { display: 'flex'} : { display: 'none'}}>
                        {['Date', 'Campaign', 'View', 'Actions'].map((value) => (
                        <Grid key={value} item  xs={value.toLocaleLowerCase() === 'date' || value.toLocaleLowerCase() === 'view' ? 2: 4}>
                            <Paper className={classes.paper} >{value.toLocaleUpperCase()}</Paper> 
                        </Grid>
                        ))}
                    </Grid>
                </Grid>          
            
                {props.data.map((value, index) => (
                    <Game value={value} key={index} id={id} onClick={handleClick(value)} navTabs = {props} ></Game>                    
                ))}                                       
            </Grid>
            
            { anchorEl && selectedGame && 
                <Popover id={id} open={openPopOver} anchorEl={anchorEl}
                    onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
                    transformOrigin={{ vertical: 'top', horizontal: 'center'}} elevation={2} >
                    <Typography className={classes.typography}>
                        <div>
                            <div class="popImg">
                                <img className="popImg__img" src={ process.env.PUBLIC_URL  +"/img/" + selectedGame.image_url} alt="price"></img>
                                <div style={{'padding-top': '6rem'}}>
                                    <div className='popImg__text--bold'>{selectedGame.name.toLocaleUpperCase()}</div>
                                    <div className='popImg__text'>{selectedGame.region.toLocaleUpperCase()}</div>
                                </div>                                
                            </div>  
                            <div style={{'margin-top': '3rem'}}>
                                <span class="popImg__pricing">Pricing</span>
                                <div>
                                    <label class="popImg--floatLeft">1 month</label>
                                    <label class="popImg--floatRight">$ {selectedGame.price_per_month}</label>
                                </div>
                                <div  style={{clear: 'both'}}></div>
                                <div>
                                    <label class="popImg--floatLeft">6 months</label>
                                    <label class="popImg--floatRight">$ {selectedGame.price_six_months}</label>
                                </div>
                                <div  style={{clear: 'both'}}></div>
                                <div>
                                    <label class="popImg--floatLeft">1 year</label>
                                    <label class="popImg--floatRight">$ {selectedGame.price_per_year}</label>
                                </div>
                                <div  style={{clear: 'both'}}></div>
                            </div>                                                      
                        </div>
                    </Typography>
                </Popover> 
            }            
        </>      
    );
}
  