import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='p-5'>
      <div className='flex align-center mb-6'>
        <Link to="/" className='text-2xl font-extrabold tracking-tight text-zinc-800'>
          Heart-A-Track <i className='fa fa-heart fa-sm text-red-500'></i>
        </Link>
      </div>
      <Outlet />
      <footer className='text-zinc-400 mt-10 text-center'>Copyright © Yang-Yi Shen 2024</footer>
    </div>
  );
}