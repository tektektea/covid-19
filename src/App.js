import React, {useState} from 'react';
import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Grid,
    Icon,
    IconButton,
    Toolbar,
    Snackbar,SnackbarContent,
    Typography
} from "@material-ui/core";
import {Route, Switch, useHistory} from "react-router-dom";
import Global from "./component/Global";
import India from "./component/India";
import {About} from "./component/About";
import {makeStyles} from "@material-ui/core/styles";
import WorldIcon from '@material-ui/icons/Language'
import PinIcon from '@material-ui/icons/PinDrop'
import InfoIcon from '@material-ui/icons/Info'
import LinearProgress from "@material-ui/core/LinearProgress";
import {connect} from "react-redux";
import {setError, setLoading} from "./app/action";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    main: {
        flex: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        minHeight: 128,
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        top: "auto",
        bottom: 0
    }
}));

const BottomNav = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const history = useHistory();
    return (
        <AppBar color="primary" className={classes.appBar}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    switch (newValue) {
                        case 0:
                            history.push("/");
                            break;
                        case 1:
                            history.push("/india");
                            break;
                        case 2:
                            history.push("/about");
                            break
                    }
                    setValue(newValue);
                }}
                showLabels
            >
                <BottomNavigationAction label="Global" icon={<WorldIcon/>}/>
                <BottomNavigationAction label="India" icon={<PinIcon/>}/>
                <BottomNavigationAction label="About" icon={<InfoIcon/>}/>
            </BottomNavigation>
        </AppBar>
    )
}


function App({loading,error,setError}) {

    const classes = useStyles();

    return (
        <Grid spacing={4} container={true}>
            <Grid sm={12} md={12} xs={12} style={{flexGrow: 1}} item={true}>
                <AppBar position={"fixed"}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Covid-19 Tracking app
                        </Typography>
                        <IconButton color={"inherit"} href={""} target={"_blank"}
                                    onClick={e => window.open("https://github.com/tektektea", "_blank")}>
                            <Icon fontSize={"default"} className="fa fa-github"/>
                        </IconButton>
                    </Toolbar>
                    {loading && <LinearProgress color={"secondary"} variant="indeterminate"/>}
                </AppBar>
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12} style={{marginTop: 50, marginBottom: 50}} item={true}>
                <Switch>
                    <Route exact={true} path={"/"} component={Global}/>
                    <Route exact={true} path={"/india"} component={India}/>
                    <Route exact={true} path={"/about"} component={About}/>
                </Switch>
            </Grid>

            <Grid sm={12} item={true}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={Boolean(error)}
                    autoHideDuration={6000}
                    onClose={e => setError(null)}
                    message={Boolean(error)?error.toString():""}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={e=>setError(null)}>
                                <Icon fontSize="small">close</Icon>
                            </IconButton>
                        </React.Fragment>
                    }

                />
                <BottomNav/>


            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => ({loading: state.loading,error:state.error})
const mapDispatchToProp = {
    setError
}
export default connect(mapStateToProps, mapDispatchToProp)(App);
