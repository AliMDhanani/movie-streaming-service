import Link from "next/link";
import { HiOutlineSearch, HiBell } from "react-icons/hi";

const Header = () => {
  return (
    <header>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://fontmeme.com/permalink/221018/7a8bf8a66c33bd9f6922f5ed5d88126f.png"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">Series</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">Popular</li>
          <li className="headerLink">Watch List</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <HiOutlineSearch className="hidden h-6 w-6 sm:inline text-white font-extrabold" />
        <p className="hidden lg:inline text-white">Kids</p>
        <HiBell className="h-6 w-6 text-white font-extrabold"/>
        <Link href="/account">
            <img src="https://www.svgrepo.com/show/170303/avatar.svg" alt="" className="cursor-pointer rounded h-10 w-10" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
