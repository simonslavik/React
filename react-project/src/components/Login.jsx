import {useState} from 'react';

export default function Login({ onSubmit}) {
  const [username, setUsername] = useState('');

  return (
    <>
        <h1 className='font-bold text-2xl p-10'>
            Welcome, {username ? username : 'Guest'}!
        </h1>
        <p>
            what should people call you?
        </p>
        <form onSubmit={(e) => {
            e.preventDefault()
            onSubmit(username)
        }}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
            />
            <input type="submit"/>
        </form>

    </>

    );
}