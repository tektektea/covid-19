import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import {Panel} from "./Panel";
import {fetchGlobal, setLoading} from "../app/action";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({}));

const mapStateToProps = state => ({loading: state.loading, global: state.global, summary: state.globalSummary})
const mapDispatchToProps = {
    fetchGlobalData: fetchGlobal,
    setLoading,
}

function Global({loading, fetchGlobalData, global = [], summary}) {
    const classes = useStyles();

    useEffect(() => {
        fetchGlobalData()
    }, [])

    if (loading === true) {
        return null;
    }
    return (
        <Grid  spacing={2} container={true}>
            <Grid item={true}  sm={12} md={12} xs={12}>
                <Grid spacing={2} container={true}>
                    <Grid container item xs={4} sm={4} md={4}>
                        <Panel icon={"accessible"} caption={"Confirmed case"} title={summary.TotalConfirmed}/>
                    </Grid>
                    <Grid container item xs={4} sm={4} md={4}>
                        <Panel icon={"sentiment_very_dissatisfied"} caption={"Deaths"} title={summary.TotalDeaths}/>
                    </Grid>
                    <Grid container={true} item xs={4} sm={4} md={4}>
                        <Panel icon={"healing"} caption={"Recovered"} title={summary.TotalRecovered}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid md={12} sm={12} xs={12}>
                {Array.isArray(global) && global.map(country => (
                    //need to add key for react lists
                    <div key={country.Country}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <Typography style={{flex: 1}}>{country.Country}</Typography>

                                <div>
                                    <Typography className={classes.heading}>Confirmed Case</Typography>
                                    <Chip color={"primary"}
                                          label={new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3}).format(country.TotalConfirmed)}/>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.details}>
                                <div className={classes.column}>
                                    <Typography className={classes.heading}>Country: {country.Country}</Typography>
                                </div>

                                <div className={classes.column}>
                                    <Typography className={classes.heading}>Confirmed Case
                                        : {new Intl.NumberFormat('en-IN', {maximumFractionDigits: 3}).format(country.TotalConfirmed)}</Typography>
                                    <Typography className={classes.heading}>Deaths
                                        : {new Intl.NumberFormat('en-IN', {maximumFractionDigits: 3}).format(country.TotalDeaths)}</Typography>
                                    <Typography className={classes.heading}>Recovered
                                        : {new Intl.NumberFormat('en-IN', {maximumFractionDigits: 3}).format(country.TotalRecovered)}</Typography>
                                </div>

                            </ExpansionPanelDetails>
                            <Divider/>
                        </ExpansionPanel>
                    </div>
                ))}
            </Grid>
        </Grid>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Global)
