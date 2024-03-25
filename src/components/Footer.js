import React from 'react';
import { Link } from 'react-router-dom';
import { SlSocialLinkedin } from "react-icons/sl";
import { PiGithubLogo } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
import { BsSend } from "react-icons/bs";
import Lottie from "lottie-react";
import footer_animation from "../utils/footer_animation.json";

export const Footer = () => {

    const links = [
            {
              id: 1,
              name: "Dashboard",
              path: "/dashboard",
            },
            {
              id: 2,
              name: "Notes",
              path: "/notes",
            },
            {
              id: 3,
              name: "Tasks",
              path: "/tasks",
            },
            {
              id: 4,
              name: "Favs",
              path: "/favs",
            },
            {
              id: 5,
              name: "profile",
              path: "/profile",
            },
          ];


  return (
    <div className='text-white px-16'>
        <div className='flex items-center justify-between p-4'>
            <div className=''>
            <h2 className='text-3xl italic'>InkUp</h2>
            <h3 className=''>Ready to connect with like-minded people?</h3>
                <div className='flex justify-evenly items-center'>
                    <Link to={`/signup`}>
                        <button className='bg-[#04d9ff] hover:bg-opacity-70 border border-[#04d9ff] px-6 py-2 my-4 rounded'>Sign up</button>
                    </Link>
                    <Link to={`/login`}>
                        <button className='hover:bg-[#04d9ff] border border-[#04d9ff] px-6 py-2 my-4 rounded'>Login</button>
                    </Link>
                </div>
            </div>
            <div className='w-1/2'>
                <Lottie animationData={footer_animation} className='h-60' />
            </div>
        </div>
        <section className='flex justify-between items-start p-4 mt-4'>
            <div>
                <h3 className="">
                    Send developer a quick message.
                </h3>
                <div className="">
                    <form
                    action="https://getform.io/f/21cdcb0c-8796-4bdc-9960-4bf1ad3b01a9"
                    method="POST"
                    className="flex"
                    >
                        <input
                            type="text"
                            name="message"
                            placeholder="Enter your message"
                            className="pt-2 pb-1 pl-4 my-1 bg-transparent focus:outline-none border-b w-96"
                        />
                        <button className="hover:scale-105 hover:text-lg hover:text-[#04d9ff] duration-300 absolute left-[30%] mt-3">
                            <BsSend size={20} />
                        </button>
                    </form>
                </div>
            </div>
            <div>
                <h3>Navigate to:</h3>
                <ul>
                    {links.map(({ id, name, path }) => (
                        <li
                            key={id}
                            path={path}
                            className="hover:opacity-55 hover:scale-105 duration-300 my-3 text-sm"
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h3 className="">
                <span className="">Let's chat! </span>
                <span>&#9786;</span>
                </h3>
                <div className="flex py-2">
                    <a
                        href="https://www.linkedin.com/in/fadila-ali-574b13183/"
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 hover:scale-105 hover:text-[#04d9ff] duration-300"
                    >
                        <SlSocialLinkedin />
                    </a>
                    <a
                        href="https://github.com/Fadila-Ali"
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 hover:scale-105 hover:text-[#04d9ff] duration-300"
                    >
                        <PiGithubLogo />
                    </a>
                    <a
                        href="https://twitter.com/fadila_ali_"
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 hover:scale-105 hover:text-[#04d9ff] duration-300"
                    >
                        <RiTwitterXFill />
                    </a>
                </div>
            </div>
        </section>
        <div className="text-center text-xs p-4">
            <p>
                <i>Copyright InkUp &#9400; 2024</i>
            </p>
        </div>
    </div>
  )
}
