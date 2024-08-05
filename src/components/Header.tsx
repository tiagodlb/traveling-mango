import { LogIn } from 'lucide-react'
import { Component } from 'react'
import { Link } from 'react-router-dom'

import logo from '@/assets/mango.svg'

export class Header extends Component {
  render() {
    return (
      <header className="top-0 flex h-24 items-center justify-end gap-4 border-b px-4 md:px-6 bg-[#FAFAFA] shadow-md">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-lg lg:gap-8 ">
          <Link
            to="#"
            className="flex w-36 h-full items-center justify-center text-lg font-semibold md:text-base"
          >
            <img src={logo} alt="logo" className="w-[6rem] h-[6rem] scale-90 transform-gpu" />
            <span>Traveling Mango</span>
          </Link>
          <Link
            to="/"
            className="text-[#0F172A] transition-colors hover:text-foreground hover:text-[#334155] focus:outline-none"
          >
            Inicio
          </Link>
          <Link
            to="/destinos"
            className="text-[#0F172A] transition-colors hover:text-foreground hover:text-[#334155] focus:outline-none "
          >
            Destinos
          </Link>
          <Link
            to="/atrativos"
            className="text-[#0F172A] transition-colors hover:text-foreground hover:text-[#334155] focus:outline-none"
          >
            Atrativos
          </Link>
          {/* INCOMPLETE
          <Link
            to="/sobre"
            className="text-[#0F172A] transition-colors hover:text-foreground hover:text-[#334155] focus:outline-none"
          >
            Sobre
          </Link>
          <Link to="/favoritos" className="text-[#0F172A] transition-colors hover:text-foreground hover:text-[#334155] focus:outline-none">
            Favoritos
          </Link> */}
        </nav>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2">
          {localStorage.email ? (
            <span>{`Bem-vindo ${localStorage.email}`}</span>
          ) : (
            <Link to={'/entrar'} className="flex gap-2 items-center hover:text-[#334155]">
              <LogIn />
              <span>Entrar</span>
            </Link>
          )}
        </div>
      </header>
    )
  }
}

export default Header
