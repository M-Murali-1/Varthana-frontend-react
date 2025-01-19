import React from 'react'
import { useNavigate } from 'react-router-dom';

function LoginUserInfo({employee}) {
const navigate = useNavigate();
    function handleLogoutChange() {
        sessionStorage.removeItem("token");
        navigate("/login-page")
    }
  return (
    <div className='flex p-5 bg-gray-100 justify-between items-baseline'>
    <p className="text-gray-800 font-semibold">Hi, {employee.name} ({employee.Role})</p>
    <div className='flex gap-5'>
    {employee.Role=="admin"&&<button className='rounded-lg bg-purple-600 text-white p-2'>
        New User
    </button>}
    <button className='rounded-lg bg-purple-600 text-white p-2' onClick={handleLogoutChange}>
        Logout
    </button>
    </div>
    
</div>

  )
}

export default LoginUserInfo