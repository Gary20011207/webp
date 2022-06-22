import { useState } from 'react';
import { signup, login} from '../utils/firebase';
import { useNavigate } from "react-router-dom";
import '../Main_Pages/Login.css';

const Login = () =>
{
    const navigate=useNavigate();
    const [register,setRegister]=useState(true);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const handleSelect=(t)=>{
        setRegister(t);
    }
    const handleSubmit=()=>{
        if(!email){
            alert('Please Enter Your Account!');
            return;
        }
        else if(!password){
            alert('Please Enter Your Password!');
            return;
        }

        if(register===true){
            setLoading(true);
            signup(email,password)
            .then(()=>{
                setEmail('');
                setPassword('');
                alert('Registration Successful.');
                navigate('/');
                setLoading(false);
            })
            .catch((err)=>{
                console.log(err.code);
                switch(err.code){
                    case "auth/weak-password":
                        alert('Password is Too Weak.');
                        break;
                    case "auth/email-already-in-use":
                        alert('Account Has Already Been Registered.');
                        break;
                    case "auth/invalid-email":
                        alert('Account Is Invalid.');
                        break;
                    default:
                        break;
                }
                setLoading(false);
            })
            
        }
        else{
            setLoading(true);
            login(email,password)
            .then(()=>{
                setEmail('');
                setPassword('');
                navigate('/');
                setLoading(false);
            })
            .catch((err)=>{
                console.log(err.code);
                switch(err.code){
                    case "auth/wrong-password":
                        alert('Incorrect Password!');
                        break;
                    case "auth/user-not-found":
                        alert('Incorrect Username!');
                        break;
                    case "auth/invalid-email":
                        alert('Incorrect Email!');
                        break;
                    default:
                        break;
                }
                setLoading(false);
            })
        }
    }

    return (
        <div>
            {loading && <div>&#x8F09;&#x5165;&#x72C0;&#x614B;&#x4E2D;...</div> }
            {!(loading) && <div className="loginPage_select">
            <br></br><br></br>
            <center>
                <button className='select' onClick={()=>handleSelect(true)}><b>&#x8A3B;&#x518A;</b></button>
                &emsp;&emsp;&emsp;&emsp;&emsp;
                <button className='select' onClick={()=>handleSelect(false)}><b>&#x767B;&#x5165;</b></button>
            </center>
            <br></br>
            </div>}
            { !(loading) && <div>
                <br></br><br></br>
                <center>
                <h1>Gmail&#x96FB;&#x5B50;&#x4FE1;&#x7BB1;</h1><br/>
                    <input type='text' className='email' placeholder='&#x8F38;&#x5165;Gmail&#x5E33;&#x865F;' onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                </center>
                <br></br>
                <center>
                    <h1>&#x5BC6;&#x78BC;</h1><br/>
                    <input type='password' className='password' placeholder='&#x8F38;&#x5165;&#x5BC6;&#x78BC;' onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                </center>
            </div>}
            <center>
            <br></br><br></br>
            { !(loading) && (register ? <button className='send' onClick={()=>handleSubmit()}><b>&#x8A3B;&#x518A;</b></button>:
            <button className='send' onClick={()=>handleSubmit()}><b>&#x767B;&#x5165;</b></button>)}
            </center>
        </div>
    );
}

export default Login;