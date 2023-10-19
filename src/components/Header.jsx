import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import {BsMoonFill, BsSunFill} from 'react-icons/bs'
import { Link } from "react-router-dom"

const themes = {
    winter: 'winter',
    dark: 'dark',
  }
  
  const getThemeFromLocalStorage = () => {
    return localStorage.getItem('AdminTheme') || themes.winter
  }

const Header = () => {
    const {user, logoutUser} = useGlobalContext()
    const [theme, setTheme] = useState(getThemeFromLocalStorage());

    const handleTheme = () => {
       const {winter, dark} = themes;
       const newTheme = theme === winter ? dark : winter;
       setTheme(newTheme);
    }

    useEffect(() => {
       document.documentElement.setAttribute('data-theme', theme);
       localStorage.setItem('AdminTheme', theme);
    }, [theme])

  return (
    <header className="bg-neutral py-2 text-neutral-content">
        <div className="mx-auto max-w-6xl px-8 flex justify-end">
          <div className="flex gap-x-6 justify-center items-center">
            <label className='swap swap-rotate'>
                <input type="checkbox" onChange={handleTheme} />
                <BsSunFill className='swap-on h-4 w-4' />
                <BsMoonFill className='swap-off h-4 w-4' />
            </label>
            <p className="responsive-text">Hello, <span className="text-primary">{user.name}</span></p>
            <Link to='/' className="link link-hover responsive-text text-primary" onClick={logoutUser}>Logout</Link>
          </div>
        </div>
       </header>
  )
}

export default Header