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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },

}));
const mapStateToProps = state => ({global: state.global, summary: state.globalSummary,loading:state.loading})
const mapDispatchToProps = {
    fetchGlobalData: fetchGlobal,
    setLoading:setLoading
}

function Global({fetchGlobalData, loading, global = [], summary,setLoading}) {
    const classes = useStyles();

    useEffect(() => {
        setLoading(true);
        fetchGlobalData();
    }, []);
    return (
        <div className={classes.root}>
            {loading ? null :
                <>
                    <Grid alignItems={"stretch"} container={true}>

                        <Grid container={true} alignItems={"stretch"} xs={4}>
                            <Panel icon={"accessible"} caption={"Confirmed case"} title={summary.TotalConfirmed}/>
                        </Grid>
                        <Grid container={true} alignItems={"stretch"} xs={4} >
                            <Panel icon={"sentiment_very_dissatisfied"} caption={"Deaths"} title={summary.TotalDeaths}/>

                        </Grid>
                        <Grid container={true} alignItems={"stretch"} xs={4} >
                            <Panel icon={"healing"} caption={"Recovered"} title={summary.TotalRecovered}/>

                        </Grid>
                    </Grid>
                    {Array.isArray(global) && global.map(country => (
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
                    ))}
                </>
            }


        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Global)
