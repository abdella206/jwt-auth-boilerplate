// import React, { useState } from 'react';
// import axios from 'axios';



// const Login = (props) => {

//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState(null)
//     const [message, setMessage] = useState('')



//    const handleEmailChange = (e) => {
//         setEmail(e.target.value)
//     }

//    const handlePasswordChange = (e) => {
//         setPassword(e.target.value)
//     }

//     const handelSubmit = (e) => {
//         e.preventDefault()
//         axios.post('/auth/login', {
//             email: email,
//             password: password
//         }).then(res => {
//             if(res.data.type === 'error') {
//                 setMessage(res.data.message)
//             } else {
//                 localStorage.setItem('mernToken', res.data.token)
//                 props.liftToken(res.data)
//             }
//         }).catch(err => {
//             setMessage("Maximum login attempts exceeded. Please try again later.")
//         })
//     }




//         return (
//             <div className="Login">
//                 <h3>Log into your account:
//                     <form onSubmit={handelSubmit}>
//                         <input onChange={handleEmailChange} 
//                                 value={email} 
//                                 type="email"
//                                 name="email"
//                                 placeholder="Enter your email" /><br />
//                         <input onChange={handlePasswordChange} 
//                                 value={password} 
//                                 type="password"
//                                 name="password"
//                                 placeholder="Enter your password" /><br />
//                         <input type="submit" value="log in"/>
//                     </form>
//                 </h3>
//             </div>
//         )

// }

// export default Login








import React, { useState } from 'react';
import axios from 'axios';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {". Built with "}
            <Link color="inherit" href="https://material-ui.com/">
                Material-UI.
            </Link>
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh"
    },
    image: {
        backgroundImage: "url(https://source.unsplash.com/1600x900/?nba)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const Login = (props) => {

    const classes = useStyles();


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(null)
    const [message, setMessage] = useState('')



    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handelSubmit = (e) => {
        e.preventDefault()
        axios.post('/auth/login', {
            email: email,
            password: password
        }).then(res => {
            if (res.data.type === 'error') {
                setMessage(res.data.message)
            } else {
                localStorage.setItem('mernToken', res.data.token)
                props.liftToken(res.data)
            }
        }).catch(err => {
            setMessage("Maximum login attempts exceeded. Please try again later.")
        })
    }


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            onChange={handleEmailChange}
                            value={props.email}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onChange={handlePasswordChange}
                            value={props.password}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            onClick={handelSubmit}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>

                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}


export default Login