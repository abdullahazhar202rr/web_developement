'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ModeToggle } from '../ModeToggle'
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from 'next-themes';
import Button from '../Button'
import NProgressLink from '../Nprogresslink'
import { HiMenu, HiX } from 'react-icons/hi'
import Link from 'next/link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const { theme } = useTheme();

  return (
    <nav>
      <div
        key={theme}
        className="absolute z-10 border-b-2 border-[gray] dark:text-white w-full flex justify-between items-center px-6 py-4 dark:border-none"
      >
        {/* Logo */}
        <Link className="text-lg font-bold flex gap-3 items-center" href="/">
          <Image src='/favicon.ico' width={30} height={20} className='rounded-full' alt='icon' />
          <p>Abdullah Azhar</p>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8">
          <li><NProgressLink href="/" className="hover:text-gray-400">Home</NProgressLink></li>
          <li><NProgressLink href="/#about" className="hover:text-gray-400">About</NProgressLink></li>
          <li><NProgressLink href="/#projects" className="hover:text-gray-400">Projects</NProgressLink></li>
          <li><NProgressLink href="/contact" className="hover:text-gray-400">Contact</NProgressLink></li>
          <li><NProgressLink href="/reviews" className="hover:text-gray-400">Reviews</NProgressLink></li>
        </ul>

        {/* Right Side: View CV + ModeToggle */}
        <div className='hidden lg:flex justify-center items-center gap-4  pr-4'>
          <a href="/Abdullah_Azhar.pdf" target='_blank'>
            <Button text='View CV' />
          </a>
          <ModeToggle />
        </div>

        {/* Mobile/Tablet Hamburger */}
        <div className="lg:hidden flex items-center gap-4">
          <ModeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl focus:outline-none"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-[image:var(--background)] dark:bg-black px-4 py-6 flex flex-col items-start space-y-4 z-20">
          <NProgressLink href="/" onClick={() => setMenuOpen(false)} className="hover:text-gray-400">Home</NProgressLink>
          <NProgressLink href="/#about" onClick={() => setMenuOpen(false)} className="hover:text-gray-400">About</NProgressLink>
          <NProgressLink href="/#projects" onClick={() => setMenuOpen(false)} className="hover:text-gray-400">Projects</NProgressLink>
          <NProgressLink href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-gray-400">Contact</NProgressLink>
          <NProgressLink href="/reviews" onClick={() => setMenuOpen(false)} className="hover:text-gray-400">Review</NProgressLink>
          <NProgressLink href="/donate" onClick={() => setMenuOpen(false)} className="hover:text-gray-400">Support</NProgressLink>
          <a href="/Abdullah_Azhar.pdf" target='_blank' onClick={() => setMenuOpen(false)}>
            <Button text='View CV' />
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar