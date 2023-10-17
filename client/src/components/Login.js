import React , {useContext, useState}from 'react';
import { NavLink , useNavigate} from 'react-router-dom';
import styled from 'styled-components'
import Loginpic from '../images/login.png'
import { userContext } from '../App';


const Login = () => {

  const {state , dispatch} = useContext(userContext);

  const history = useNavigate();

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  const LoginUser = async (e) =>{
    e.preventDefault();

    const res = await fetch('/signin' , {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({
        email , password
      })
    });

    const data = await res.json();

    if(res.status === 400 || !data){
      window.alert("Invalid data");
    }
    else{
      dispatch({type : "USER" , payload : true})
      //window.alert(`login succesfull ${_id} `);
      //console.log(_id);
      history("/");
    }
  }

  return (
    <Container>
            <Container4>
                <LoginImg>
                    <Limg src = {Loginpic} alt =""/>
                    <NavLink to = '/signup'>I am not register yet..</NavLink>
                </LoginImg>
                <Formcontainer>
                    <h2>Login</h2>
                    <Form id="register-form" method = "POST">
                        <FormGroup >
                            <label htmlFor='email'>
                                <i class = "zmdi zmdi-email"></i>
                            </label>
                            <Inp type = "text" name = "email" autoComplete='off' id='email' 
                            value = {email} 
                            onChange = {(e) => setEmail(e.target.value)}
                            placeholder='Your Email'/>
                        </FormGroup>
              
                        <FormGroup >
                            <label htmlFor='password'>
                                <i class = "zmdi zmdi-lock"></i>
                            </label>
                            <Inp type = "password" name = "password" autoComplete='off' id='password' 
                            value = {password} 
                            onChange = {(e) => setPassword(e.target.value)}
                            placeholder='Your Password'/>
                        </FormGroup>
                        <Button type = "submit" name = "signin" 
                        onClick={LoginUser}
                        id = "signin">Sign in</Button>
                    </Form>
                </Formcontainer>
                
                
                
            </Container4>
        </Container>
  )
}

export default Login

const Inp = styled.input`
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom-width : 2px;
    border-color:black;
`;

const Container = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: center;
    margin-top: 5%;

`;

const Container4 = styled.div`
    display: flex;
    /*flex-direction: row;*/
    align-items: center;
    height: auto;
    /*margin-top: 10%;*/
`;

const Form = styled.form`

`;

const Formcontainer = styled.div`
    
`;

const FormGroup = styled.div`

`;

const Button = styled.button`

`

const LoginImg = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Limg = styled.img`
    width: 400px;
    height: auto;
`;