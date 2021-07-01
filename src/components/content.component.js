import React, { Component } from 'react';
import '../components/content.style.css';
import Grid from './grid.component';

class Body extends Component {

    constructor() {
        super();

        this.state = {
            data: [],
            isUpcomingCampaigns: true,
            isLiveCampaigns: false,
            isPastCampaigns: false,
            selectedTab: 'liveCampaigns'
        }

        this.upcomingCampaignsClick = this.upcomingCampaignsClick.bind(this);
        this.liveCampaignsClick = this.liveCampaignsClick.bind(this);
        this.pastCampaignsClick = this.pastCampaignsClick.bind(this);
    }


    upcomingCampaignsClick() {
        this.setState({isUpcomingCampaigns: true});
        this.setState({isLiveCampaigns: false});
        this.setState({isPastCampaigns: false});
        this.setState({selectedTab: 'upcomingCampaigns'});

        fetch('https://bluestack-app.herokuapp.com/upcomingCampaigns')
        .then( response => response.json())
        .then( data => this.setState({data: data}))
    }

    liveCampaignsClick() {
        this.setState({isLiveCampaigns: true});
        this.setState({isPastCampaigns: false});
        this.setState({isUpcomingCampaigns: false});
        this.setState({selectedTab: 'liveCampaigns'});

        fetch('https://bluestack-app.herokuapp.com/liveCampaigns')
        .then( response => response.json())
        .then( data => this.setState({data: data}))
    }

    pastCampaignsClick() {
        this.setState({isPastCampaigns: true});
        this.setState({isLiveCampaigns: false});
        this.setState({isUpcomingCampaigns: false});
        this.setState({selectedTab: 'pastCampaigns'});

        fetch('https://bluestack-app.herokuapp.com/pastCampaigns')
        .then( response => response.json())
        .then( data => this.setState({data: data}))
    }

    componentDidMount() {        
        this.upcomingCampaignsClick()
    }

    render() {
        return(
            <div className="content">
                <div className="content__body">
                    <div className="header__title">Manage Campaigns</div>
                    <div className="header__tabs">
                        <div className={!this.state.isUpcomingCampaigns ? "header__tab" : "header__tab header__tab--active"} onClick={this.upcomingCampaignsClick}>Upcoming Campaigns</div>
                        <div className={!this.state.isLiveCampaigns ? "header__tab" : "header__tab header__tab--active"} onClick={this.liveCampaignsClick}>Live Campaigns</div>
                        <div className={!this.state.isPastCampaigns ? "header__tab" : "header__tab header__tab--active"} onClick={this.pastCampaignsClick}>Past Campaigns</div>
                    </div> 
                    <Grid data={this.state.data} selectedTab={this.state.selectedTab} 
                        upcomingCampaignsClick = { this.upcomingCampaignsClick }
                        liveCampaignsClick = {this.liveCampaignsClick}
                        pastCampaignsClick = {this.pastCampaignsClick}
                      ></Grid>
                </div>                
            </div>            
        ) 
    }
}

export default Body;