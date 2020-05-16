import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: red,
    },
    status: {
        danger: 'orange',
    },
});

export default theme
