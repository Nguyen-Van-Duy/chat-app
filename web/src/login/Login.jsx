import './login.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../store/reducers/LoginSlice';
// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const urlConnect = process.env.REACT_APP_CONNECT_SERVER
const Login = () => {
    const userId = useSelector((state) => state.loginSlice?.userId)
    const isLogin = useSelector((state) => state.loginSlice.isLogin)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
  const dispatch = useDispatch()

  const token = localStorage.getItem('token')
  useEffect(()=> {
    if(isLogin) {
        navigate('/messenger')
    }
    const authentication = async () => {
        setLoading(true)
        console.log(token);
        if(token) {
            try {
                const result = await axios.get(urlConnect + 'account/refresh', { headers: {"Authorization" : `Bearer ${token}`} });
                console.log("success authentication token: ",result);
                dispatch(setUserId(result.data.id))
                setLoading(false)
                navigate('/messenger')
            } catch (error) {
                console.log(error);
                setLoading(false)
                return
            }
        } else {
            setLoading(false)
        }
    }
    if(!isLogin) {
        authentication()
    }

    return() => {
        
    }
  }, [token, dispatch, isLogin, navigate])

//   useEffect(() => {
//     console.log(isLogin);
//     if(isLogin) {
//         navigate('/messenger')
//     }
//   }, [isLogin, navigate])

  console.log(userId);
    const handleRegister = async (e) => {
        e.preventDefault();
        const result = await axios.post(urlConnect + 'account/create-account', {
            user_name: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value
        })
        console.log(result);
        if(result.status === 200) {
            alert("Đăng ký thành công!")
        } else {
            alert(result.data.message)
        }
    }

    const HandleLogin = async (e) => {
        e.preventDefault();
        if(e.target[0].value === "" || e.target[1].value === "") {
            alert("Không được để trống!")
            return
        }
        const result = await axios.post(urlConnect + 'account/login', {
            email: e.target[0].value,
            password: e.target[1].value
        })
        if(result.data.status === 200) {
            console.log(result);
            localStorage.setItem("token", result.data.token)
            dispatch(setUserId(result.data._id))
            navigate('/messenger')
        } else {
            alert('Tài khoản mật khẩu không chính xác!')
        }
    }

    return (
        <div className="body">
            {!loading ? <div className="main">  	
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div className="signup">
                    <form onSubmit={handleRegister}>
                        <label htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input type="text" name="txt" placeholder="User name" required="" />
                        <input type="email" name="email" placeholder="Email" required="" />
                        <input type="password" name="pswd" placeholder="Password" required="" />
                        <button type="submit">Sign up</button>
                    </form>
                </div>

                <div className="login">
                    <form onSubmit={HandleLogin}>
                        <label htmlFor="chk" aria-hidden="true">Login</label>
                        <input type="email" name="email" placeholder="Email" required="" />
                        <input type="password" name="pswd" placeholder="Password" required=""/>
                        <button type='submit'>Login</button>
                    </form>
                </div>
            </div>: <h1 style={{color: "#fff"}}>Loading...</h1>}
        </div>
    );
};

export default Login;