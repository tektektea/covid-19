import React, {useEffect} from "react";
import {fetchIndia} from "../app/action";
import {connect} from 'react-redux';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {Panel} from "./Panel";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress"

const mapStateToProps = state => ({loading: state.isLoadingIndia, india: state.india, summary: state.indiaSummary})
const mapDispatchToProps = {fetchIndia}

const India = ({loading, india = {}, fetchIndia, summary}) => {
    useEffect(() => {
        fetchIndia()
    }, [])

    if(loading === true) {
        return (
            <Grid 
                container={true}
                spacing={10}
                direction="column"
                alignItems="center"
                justify="center"
                //minHeight 100vh is too low
                style={{ minHeight: '50vh'}}
            >
                <CircularProgress size={60}/>
            </Grid>
        )
    }
    return (
        <>
            <Grid container={true}>

                <Grid xs={4} item={true}>
                    <Panel icon={"accessible"} caption={"Confirmed case"} title={summary.confirmed}/>

                </Grid>
                <Grid xs={4} item={true}>
                    <Panel icon={"sentiment_very_dissatisfied"} caption={"Deaths"} title={summary.deaths}/>

                </Grid>
                <Grid xs={4} item={true}>
                    <Panel icon={"healing"} caption={"Recovered"} title={summary.recovered}/>

                </Grid>
            </Grid>
            {Array.isArray(india) && india.map(state => (
                <ExpansionPanel key={state.State}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        <Typography style={{flex: 1}}>{state.state}</Typography>

                        <div>
                            <Typography>Confirmed Case</Typography>
                            <Chip color={"primary"} label={state.confirmed}/>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List style={{flex: 1}} title={"District wise"} subheader={"District wise"}>
                            {state.districts.map(d => (
                                //need key here also
                                <ListItem key={d.name}>
                                    <ListItemText primary={d.name}
                                                  secondary={`Death: ${d.deceased}  Recovered : ${d.recovered}`}/>
                                    <ListItemSecondaryAction>
                                        <Chip color={"primary"} label={`Confirmed: ${new Intl.NumberFormat("en-IN",{maximumSignificantDigits:3}).format(d.confirmed)}`}/>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>

                        {/*<div>*/}
                        {/*    <Typography>Country: {state.Country}</Typography>*/}
                        {/*</div>*/}

                        {/*<div>*/}
                        {/*    <Typography>Confirmed Case : {state.TotalConfirmed}</Typography>*/}
                        {/*    <Typography>Deaths : {state.TotalDeaths}</Typography>*/}
                        {/*    <Typography>Recovered : {state.TotalRecovered}</Typography>*/}
                        {/*</div>*/}

                    </ExpansionPanelDetails>
                    <Divider/>
                </ExpansionPanel>
            ))}
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(India)
