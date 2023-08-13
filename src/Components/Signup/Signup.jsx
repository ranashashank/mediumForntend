import '../Signin/Signin.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const navigate = useNavigate();
  const [errorSignUp, setErrorSignUp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  useEffect(() => {
    if (props.authorization !== '') {
      console.log(props.authorization);
      navigate('/');
    }
  }, [props.authorization]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form fields
      if (!name || !email || !password || !passwordRepeat) {
        setErrorSignUp('All fields are required');
        return;
      }

      if (password !== passwordRepeat) {
        setErrorSignUp('Passwords do not match');
        return;
      }

      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          user: { username: name, email, password },
        }),
      });

      const authorizationHeader = response.headers.get('Authorization');

      if (authorizationHeader !== null) {
        localStorage.Authorization = authorizationHeader;
        props.setAuthorization(authorizationHeader);
      }

      const data = await response.json();

      if (data.status && data.status.code === 200) {
        setName('');
        setEmail('');
        setPassword('');
        setPasswordRepeat('');
        setErrorSignUp('');
      } else {
        setErrorSignUp(data.status ? data.status.message : 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='signin'>
          <div className='field'>
            <label htmlFor='name'>User Name</label>
            <input
              type='text'
              placeholder='Enter User Name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='field'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              placeholder='Enter your Email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='field'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='field'>
            <label htmlFor='password_repeat'>Repeat Password</label>
            <input
              type='password'
              placeholder='Repeat Password'
              name='password_repeat'
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
            />
          </div>

          <button type='submit'>SignUp</button>
          {errorSignUp ? <div className='error'>{errorSignUp}</div> : null}
        </div>
      </form>
    </div>
  );
};

export default Signup;
