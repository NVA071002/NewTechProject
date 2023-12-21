import { GoogleLogin } from '@react-oauth/google';
import Typography from '@mui/material/Typography'
import { jwtDecode } from "jwt-decode";
import Box from '@mui/material/Box'
import "./style.scss"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import useAuth from '../../../hooks/useAuth';
import toast from "react-hot-toast"
const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { setAuth } = useAuth();
    const from = location.state?.from?.pathname || "/";
    return (
        <div id="login">
            <Box className='content-right'>
                <Box
                    sx={{
                        paddingTop: '30px',
                        height: '100%',
                        width: '100%',
                        alignItems: 'center',
                        mb: "20px",
                        mt: "20px",
                    }}
                >
                    <Box sx={{
                        borderRadius: "25px",
                        padding: "50px",
                        boxShadow: "0 0.5rem 1rem rgba(0,0,0,.1)",
                        height: '100%',
                        maxHeight: '700px',
                        width: '100%', maxWidth: 500, display: 'inline-block', position: 'relative', left: '50%', transform: 'translateX(-50%)',
                        textAlign: 'center', alignItems: 'center'
                    }}>
                        <Box sx={{ my: 6 }}>
                            <Typography sx={{ color: 'text.secondary', textAlign: 'left' }}>
                                Please sign-in to your account and start the adventure
                            </Typography>
                            {/* <button type="button" class="login-with-google-btn" onClick={googleAuth} >
                                Sign in with Google
                            </button> */}
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    var credentialResponseDecode = jwtDecode(credentialResponse.credential);
                                    axios.post('/auth/login', { email: credentialResponseDecode.email }).then(res => {
                                        const userData = res?.data?.userData.data
                                        const role = userData?.role;
                                        localStorage.setItem('userData', JSON.stringify({ ...userData }))
                                        localStorage.setItem('token', userData.token)
                                        setAuth({ role });
                                        navigate(`/${role.toLowerCase()}`, { state: { isLogin: true } });
                                    })
                                        .catch((e) => {
                                            toast.error("Email doesn't exist!")
                                        })
                                }}
                                onError={() => {
                                    toast.error("Login Failed!")
                                }}
                            />
                        </Box>

                    </Box>
                </Box>
            </Box>
        </div >
    );

}
export default Login