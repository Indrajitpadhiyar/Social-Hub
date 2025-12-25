import React, { useState, useEffect, useCallback } from 'react';
import {
    ThemeProvider,
    createTheme,
    Container,
    Paper,
    TextField,
    Typography,
    Button,
    Box,
    useMediaQuery,
    Stack,
    Avatar,
    IconButton
} from '@mui/material';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp'
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { usernameValidator } from '../utils/validators';

// Custom green-white theme
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#22c55e', // Emerald green
            light: '#4ade80',
            dark: '#16a34a'
        },
        secondary: {
            main: '#10b981' // Green-600
        },
        background: {
            default: '#f8fafc', // Light slate
            paper: '#ffffff'
        }
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif'
    }
});

const LoginForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    const themeMui = useTheme();
    const isMobile = useMediaQuery(themeMui.breakpoints.down('sm'));

    // const name = useInputValidation("");
    const email = useInputValidation("");
    const password = useStrongPassword();
    const userName = useInputValidation("", usernameValidator);

    // const handleInputChange = (e) => {
    //     setCredentials({
    //         ...credentials,
    //         [e.target.name]: e.target.value
    //     });
    // };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const avatar = useFileHandler("single");

    // Floating particles animation
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 0.5 + 0.2
    }));


    const handleLogin = (e) => {
        e.preventDefault();
    }

    const handleRegister = (e) => {
        e.preventDefault();
    }

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4,
                    px: 2,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Animated Background Elements */}
                {/* Floating Particles */}
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="particle"
                        style={{
                            position: 'absolute',
                            width: particle.size,
                            height: particle.size,
                            background: 'rgba(255,255,255,0.6)',
                            borderRadius: '50%',
                            left: `${particle.x}%`,
                            top: `${particle.y}%`
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.6, 1, 0.6],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 4 + particle.speed,
                            repeat: Infinity,
                            repeatType: 'reverse'
                        }}
                    />
                ))}

                {/* Pulsing Circles */}
                <motion.div
                    style={{
                        position: 'absolute',
                        width: 300,
                        height: 300,
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '50%',
                        top: '10%',
                        left: '10%',
                        filter: 'blur(50px)'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.6, 0.4]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />

                <motion.div
                    style={{
                        position: 'absolute',
                        width: 200,
                        height: 200,
                        background: 'rgba(255,255,255,0.08)',
                        borderRadius: '50%',
                        bottom: '20%',
                        right: '15%',
                        filter: 'blur(40px)'
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 2
                    }}
                />

                {/* Gradient Wave */}
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '200px',
                        background: 'linear-gradient(to top, rgba(255,255,255,0.2), transparent)',
                        borderRadius: '50% 50% 0 0'
                    }}
                    animate={{
                        y: [0, -20, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />

                <Container maxWidth="sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, type: 'spring' }}
                    >
                        <Paper
                            elevation={24}
                            sx={{
                                p: { xs: 3, sm: 4 },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                borderRadius: 4,
                                border: '1px solid rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(20px)',
                                background: 'rgba(255,255,255,0.95)',
                                position: 'relative',
                                zIndex: 10,
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {isLogin ? (
                                    <motion.div
                                        key="login"
                                        variants={formVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        style={{ width: '100%' }}
                                    >
                                        <motion.div variants={itemVariants}>
                                            <Typography
                                                variant="h4"
                                                sx={{
                                                    mb: 3,
                                                    color: 'primary.main',
                                                    fontWeight: 700,
                                                    textAlign: 'center'
                                                }}
                                            >
                                                Welcome Back
                                            </Typography>
                                        </motion.div>

                                        <Box component="form" sx={{ mt: 1, width: '100%' }}>
                                            <motion.div variants={itemVariants}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="Username"
                                                    value={userName.value}
                                                    onChange={userName.changeHandler}
                                                    name="username"
                                                    margin="normal"
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 3,
                                                            backgroundColor: 'background.paper',
                                                            '&:hover': {
                                                                boxShadow: '0 4px 12px rgba(34,197,94,0.2)'
                                                            }
                                                        }
                                                    }}
                                                />
                                            </motion.div>

                                            <motion.div variants={itemVariants}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="Password"
                                                    name="password"
                                                    type="password"
                                                    value={password.value}
                                                    onChange={password.changeHandler}
                                                    margin="normal"
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 3,
                                                            backgroundColor: 'background.paper',
                                                            '&:hover': {
                                                                boxShadow: '0 4px 12px rgba(34,197,94,0.2)'
                                                            }
                                                        }
                                                    }}
                                                />
                                            </motion.div>

                                            <motion.div variants={itemVariants}>
                                                <Button
                                                    fullWidth
                                                    size="large"
                                                    variant="contained"
                                                    type="submit"
                                                    onSubmit={handleLogin}
                                                    sx={{
                                                        mt: 2,
                                                        py: 1.5,
                                                        borderRadius: 3,
                                                        fontWeight: 600,
                                                        fontSize: '1.1rem',
                                                        boxShadow: '0 8px 32px rgba(34,197,94,0.4)'
                                                    }}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    Sign In
                                                </Button>
                                            </motion.div>

                                            <motion.div
                                                variants={itemVariants}
                                                style={{ textAlign: 'center', mt: 2 }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: 'text.secondary', mb: 1 }}
                                                >
                                                    Don't have an account?
                                                </Typography>
                                                <Button
                                                    fullWidth
                                                    variant="text"
                                                    onClick={toggleForm}
                                                    sx={{
                                                        color: 'primary.main',
                                                        fontWeight: 500,
                                                        textTransform: 'none',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(34,197,94,0.1)'
                                                        }
                                                    }}
                                                >
                                                    Create Account
                                                </Button>
                                            </motion.div>
                                        </Box>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="register"
                                        variants={formVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        style={{ width: '100%' }}
                                    >
                                        {/* Register form content - same structure */}
                                        <motion.div variants={itemVariants}>
                                            <Typography
                                                variant="h4"
                                                sx={{
                                                    mb: 3,
                                                    color: 'primary.main',
                                                    fontWeight: 700,
                                                    textAlign: 'center'
                                                }}
                                            >
                                                Create Account
                                            </Typography>
                                        </motion.div>

                                        <Box component="form" sx={{ mt: 1, width: '100%' }}>

                                            <Stack position={"relative"} width={"10rem"} margin={"auto"}>

                                                <Avatar sx={{
                                                    width: "10rem",
                                                    height: "10rem",
                                                    objectFit: "contain"
                                                }}
                                                    src={avatar.preview}
                                                />
                                                {
                                                    avatar.error && (
                                                        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                                                            {avatar.error}
                                                        </Typography>
                                                    )
                                                }
                                                <IconButton sx={{
                                                    position: "absolute",
                                                    bottom: "0",
                                                    right: "0",
                                                    color: "white",
                                                    bgcolor: "rgba(0,0,0,0.5)",
                                                    ":hover": {
                                                        bgcolor: "rgba(0,0,0,0.7)"
                                                    },
                                                }}
                                                    component="label"
                                                >

                                                    <>
                                                        <CameraAltIcon />
                                                        <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                                                    </>
                                                </IconButton>
                                            </Stack>
                                            <motion.div variants={itemVariants}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="Email"
                                                    name="email"
                                                    type="email"
                                                    value={email.value}
                                                    onChange={email.changeHandler}
                                                    margin="normal"
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 3,
                                                            backgroundColor: 'background.paper',
                                                            '&:hover': {
                                                                boxShadow: '0 4px 12px rgba(34,197,94,0.2)'
                                                            }
                                                        }
                                                    }}
                                                />
                                            </motion.div>

                                            <motion.div variants={itemVariants}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="Username"
                                                    name="username"
                                                    value={userName.value}
                                                    onChange={userName.changeHandler}
                                                    margin="normal"
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 3,
                                                            backgroundColor: 'background.paper',
                                                            '&:hover': {
                                                                boxShadow: '0 4px 12px rgba(34,197,94,0.2)'
                                                            }
                                                        }
                                                    }}
                                                />
                                                {
                                                    userName.error && (
                                                        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                                                            {userName.error}
                                                        </Typography>
                                                    )
                                                }
                                            </motion.div>

                                            <motion.div variants={itemVariants}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    label="Password"
                                                    name="password"
                                                    type="password"
                                                    value={password.value}
                                                    onChange={password.changeHandler}
                                                    margin="normal"
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 3,
                                                            backgroundColor: 'background.paper',
                                                            '&:hover': {
                                                                boxShadow: '0 4px 12px rgba(34,197,94,0.2)'
                                                            }
                                                        }
                                                    }}
                                                />
                                                {/* {
                                                    password.error && (
                                                        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                                                            {password.error}
                                                        </Typography>
                                                    )
                                                } */}
                                            </motion.div>

                                            <motion.div variants={itemVariants}>
                                                <Button
                                                    fullWidth
                                                    size="large"
                                                    variant="contained"
                                                    type="submit"
                                                    onSubmit={handleRegister}
                                                    sx={{
                                                        mt: 2,
                                                        py: 1.5,
                                                        borderRadius: 3,
                                                        fontWeight: 600,
                                                        fontSize: '1.1rem',
                                                        boxShadow: '0 8px 32px rgba(34,197,94,0.4)'
                                                    }}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    Sign Up
                                                </Button>
                                            </motion.div>

                                            <motion.div
                                                variants={itemVariants}
                                                style={{ textAlign: 'center', mt: 2 }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: 'text.secondary', mb: 1 }}
                                                >
                                                    Already have an account?
                                                </Typography>
                                                <Button
                                                    fullWidth
                                                    variant="text"
                                                    onClick={toggleForm}
                                                    sx={{
                                                        color: 'primary.main',
                                                        fontWeight: 500,
                                                        textTransform: 'none',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(34,197,94,0.1)'
                                                        }
                                                    }}
                                                >
                                                    Sign In Instead
                                                </Button>
                                            </motion.div>
                                        </Box>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Paper>
                    </motion.div>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default LoginForm;