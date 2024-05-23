import React, {useState} from 'react';
import {SignUpInput} from './Input';
import {Link} from 'react-router-dom';
import {webClient} from '../util/config'

function SignUpForm(){
    const emptyUser = {
        username: "",
        password: "",
        confirmPassword: ""
    }
    const [user, setUser] = useState(emptyUser);

    function handleOnChange(event){
        const { id, value }=  event.target;
        setUser(prevUser => {
            return {
                ...prevUser,
                [id]: value
            }
        })
    }

    function saveUserDetails(){
        webClient.post('/user/addUserDetails', user,{ timeout: 6000 }).then(response => {
            alert("Sign up Successfull..... Please Login");
            setUser(emptyUser);
        }).catch(err => {
            alert("Error occured while saving user details, Please try again");
        });
    }

    function checkIfUserExists(){
        webClient.post('/user/checkIfUserExists', user,{ timeout: 5000 }).then(response => {
            console.log("resp : " +response);
            alert("Username already exists! Try with different username");
        }).catch(error => {
           if(error.response && error.response.status===404) {
             saveUserDetails();
           }else if(error.response && error.response.status===500) {
             alert("Internal Server error, Please try again...");
           }
        })
    }
    
// function checkIfUserExists() {
//     webClient.post('/user/checkIfUserExists', user, { timeout: 5000 })
//         .then(response => {
//             console.log("resp : ", response);
//             if (response.status === 200) {
//                 // If user exists, show alert
//                 alert("Username already exists! Try with a different username");
//             } else {
//                 // If response status is not 200, proceed to save user details
//                 saveUserDetails();
//             }
//         })
//         .catch(error => {
//             if (error.response && error.response.status === 500) {
//                 // If internal server error occurs, show alert
//                 alert("Internal Server error. Please try again later.");
//             } else {
//                 // Handle other errors
//                 console.error("Error occurred:", error);
//             }
//         });
// }

    function submitSignUp(event){
       if(user.password!== user.confirmPassword){
             alert("Password and ConfirmPassword should match.. Please recheck and submit");
       }else {
            checkIfUserExists();
            //setUser(emptyUser);
       }
       event.preventDefault();
       
    }
 
    return <form onSubmit={submitSignUp}>
            <h1 className="h3 mt-5 mb-3 fw-normal sign-up-title">Sign up</h1>
            <SignUpInput type="text" id="username" value={user.username} placeholder="Username" onChange={handleOnChange}/>
            <SignUpInput type="password" id="password" value={user.password} placeholder="Password" onChange={handleOnChange}/>
            <SignUpInput type="password" id="confirmPassword" value={user.confirmPassword} placeholder="ConfirmPassword" onChange={handleOnChange}/>
            <button className="btn btn-primary mt-3 w-100 py-10" type="submit" >Sign up</button>
            <h2 className= "h6 mt-3 fw-normal">Already had an account ? <span><Link className="login-link" to="/LoginPage">Login</Link></span></h2>
        </form>
        
}

export default SignUpForm;