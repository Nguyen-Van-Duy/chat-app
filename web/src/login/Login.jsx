import './login.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../store/reducers/LoginSlice';
// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const urlConnect = process.env.REACT_APP_CONNECT_SERVER
const Login = () => {
    const userId = useSelector((state) => state.loginSlice.userId)
    const isLogin = useSelector((state) => state.loginSlice.isLogin)
    const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(isLogin) {
        navigate('/messenger')
    }
  }, [isLogin, navigate])

  console.log(userId);
    const handleRegister = async (e) => {
        e.preventDefault();
        const result = await axios.post(urlConnect + 'account/user', {
            userName: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value
        })
        console.log(result);
        if(result.data.status === 200) {
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
            dispatch(setUserId(result.data._id))
            navigate('/messenger')
        } else {
            alert('Tài khoản mật khẩu không chính xác!')
        }
    }

    return (
        <div className="body">
            <div className="main">  	
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
            </div>
        </div>
    );
};

export default Login;