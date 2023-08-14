import './Signin.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Signin = (props) => {
  
  const navigate = useNavigate();
  const [errorSignIn, setErrorSignIn] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (props.authorization !== '') {
      console.log(props.authorization);
      navigate('/');
    }
    console.log(props);
  }, [props.authorization]);

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorSignIn('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       // Check if the email is a valid format
       if (!isValidEmail(email)) {
        setErrorSignIn('Invalid email format');
        return;
      }
      const response = await fetch('http://127.0.0.1:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          user: { email, password },
        }),
      });

      const authorizationHeader = response.headers.get('Authorization');
      console.log('authorization', authorizationHeader);

      if (authorizationHeader !== null) {
        localStorage.Authorization = authorizationHeader;
        props.setAuthorization(authorizationHeader);
      }

      const data = await response.json();

      if ('error' in data) {
        setErrorSignIn(data.error);
        navigate('/register');
      } else {
        setEmail('');
        setPassword('');
        setErrorSignIn('');
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{marginTop:"50px"}}>
      <form onSubmit={handleSubmit}>
        <div className="signin">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Enter your Email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className={errorSignIn ? 'invalid' : ''}
            />
            {errorSignIn && <div className="error-sign">!</div>}
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">SignIn</button>
          <p>Don't have an account yet <Link to="/register">Sign Up!</Link></p>
          {errorSignIn !== '' ? <div className="error">{errorSignIn}</div> : null}
        </div>
      </form>

    </div>
  );
};

export default Signin;
