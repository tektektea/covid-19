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
import {fetchGlobal} from "../app/action";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';

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
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '70.33%',
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

const mapStateToProps = state => ({loading: state.isLoadingGlobal, global: state.global, summary: state.globalSummary})
const mapDispatchToProps = {
    fetchGlobalData: fetchGlobal,
}

function Global({loading, fetchGlobalData, global = [], summary}) {
    const classes = useStyles();

    useEffect(() => {
        fetchGlobalData()
    }, [])

    if(loading === true) {
        return (
            <Grid
            container={true}
            spacing={10}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '50vh' }}
            >
                <CircularProgress size={60}/>
            </Grid>
        )
    }
    return (
        <div className={classes.root}>
            <Grid container={true}>

                <Grid xs={4} item={true}>
                    <Panel icon={"accessible"} caption={"Confirmed case"} title={summary.TotalConfirmed}/>

                </Grid>
                <Grid xs={4} item={true}>
                    <Panel icon={"sentiment_very_dissatisfied"} caption={"Deaths"} title={summary.TotalDeaths}/>

                </Grid>
                <Grid xs={4} item={true}>
                    <Panel icon={"healing"} caption={"Recovered"} title={summary.TotalRecovered}/>

                </Grid>
            </Grid>
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

        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Global)
