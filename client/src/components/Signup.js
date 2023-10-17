import {React , useState} from 'react'
import { styled } from 'styled-components'
import Signuppic from '../images/signup.jpg'
import { NavLink  , useNavigate} from 'react-router-dom'

const Signup = () => {
     
    const history = useNavigate();
    const [user ,  setUser] = useState({
        name : "",
        email :"",
        phone :"",
        work : "",
        password : "",
        cpassword : ""
    });

    let name;
    let value;

    const handleInputs = (e) =>{
        console.log(e);
        name = e.target.name;
        value = e.target.value

        setUser({...user , [name]:value})
    }

    const PostData = async (e) =>{
        e.preventDefault();

        const {name , email , phone , work , password , cpassword} = user;

        const res = await fetch('/register' ,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json" 
            },
            body : JSON.stringify({
                name , email , phone , work , password , cpassword
            })


        });

        const data = await res.json();

        if(data.status === 422 || !data){
            window.alert("Invalid");
            console.log("Invalid")
        }
        else{
            window.alert("valid");
            console.log("Valid")
            history("/");
        }


    }

  return (
    <>
        
        <Container>
            <Container4>
                
                <Formcontainer>
                    <h2>Sign Up</h2>
                    <Form id="register-form" method = "POST">
                        <FormGroup >
                            <label htmlFor='name'>
                                <i class = "zmdi zmdi-account"></i>
                            </label>
                            <Inp type = "text" name = "name" autoComplete='off' id = "name" placeholder='Your Name'
                                value = {user.name}
                                onChange = {handleInputs}
                            />
                        </FormGroup>
                        <FormGroup >
                            <label htmlFor='email'>
                                <i class = "zmdi zmdi-email"></i>
                            </label>
                            <Inp type = "text" name = "email" autoComplete='off' id='email' placeholder='Your Email'
                                value = {user.email}
                                onChange = {handleInputs}
                            />
                        </FormGroup>
                        <FormGroup >
                            <label htmlFor='phone'>
                                <i class = "zmdi zmdi-phone-in-talk "></i>
                            </label>
                            <Inp type = "number" name = "phone" autoComplete='off' id='phone' placeholder='Your Phone Number'
                                value = {user.phone}
                                onChange = {handleInputs}
                            />
                        </FormGroup>
                        <FormGroup >
                            <label htmlFor='work'>
                                <i class = "zmdi zmdi-slideshow"></i>
                            </label>
                            <Inp type = "text" name = "work" autoComplete='off' id='work' placeholder='Your Profession'
                                value = {user.work}
                                onChange = {handleInputs}
                            />
                        </FormGroup>
                        <FormGroup >
                            <label htmlFor='password'>
                                <i class = "zmdi zmdi-lock"></i>
                            </label>
                            <Inp type = "password" name = "password" autoComplete='off' id='password' placeholder='Your Password'
                                value = {user.password}
                                onChange = {handleInputs}
                            />
                        </FormGroup>
                        <FormGroup >
                            <label htmlFor='cpassword'>
                                <i class = "zmdi zmdi-lock"></i>
                            </label>
                            <Inp type = "password" name = "cpassword" autoComplete='off' id='cpassword' placeholder='Confirm Password'
                                value = {user.cpassword}
                                onChange = {handleInputs}
                            />
                        </FormGroup>

                        <Button type = "submit" name = "signup" id = "signup" value = "register"
                        onClick={PostData}>Sign Up</Button>
                    </Form>
                </Formcontainer>
                
                <SignImg>
                    <Simg src = {Signuppic} alt =""/>
                    <NavLink to = '/login'>I am already Register</NavLink>
                </SignImg>
                
            </Container4>
        </Container>
        
    </>
  )
}

export default Signup

const Inp = styled.input`
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom-width : 2px;
    border-color:black;
`;

const Container = styled.section`
    display: flex;
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: center;

`;

const Container4 = styled.div`
    display: flex;
    /*flex-direction: row;*/
    align-items: center;
    height: auto;
    margin-top: 10%;
`;

const Form = styled.form`

`;

const Formcontainer = styled.div`
    
`;

const FormGroup = styled.div`

`;

const Button = styled.button`

`

const SignImg = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Simg = styled.img`
    width: 400px;
    height: auto;
`;


