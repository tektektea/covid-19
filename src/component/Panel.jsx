import React from "react";
import {
    Card,
    CardContent,
    Icon,
    Paper,
    Typography,
    CardHeader
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const styles={
    root:{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        flex:1,
        alignItems:"center",
        alignSelf: "stretch",
        padding:"16px 3px 16px 3px"
    }
}
//  export const Panel=({icon,title,caption})=>{
//     return (
//         <Card style={{flex:1,margin:10}}>
//             <CardHeader title={new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(title)} subheader={caption}/>
//             <CardContent>
//                 <Icon fontSize={"large"}  color={"primary"}>{icon}</Icon>
//             </CardContent>
//         </Card>
//     )
// }
export const Panel=({icon,title,caption})=>{
    return (
        //elevation 0 makes it look more equal in height due to no shadows
        <Paper  style={styles.root}>
            <Icon color={"primary"} fontSize={"large"}>{icon}</Icon>
            <Typography variant={"h6"}>{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(title)}</Typography>
            <Typography variant={"caption"}>{caption}</Typography>
        </Paper>
    )
}
