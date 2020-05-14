import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './app/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core";
import theme from "./app/theme";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>

            <MuiThemeProvider theme={theme}>

                <Provider store={store}>
                    <App/>
                </Provider>
            </MuiThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
