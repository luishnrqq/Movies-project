import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Headerstyle.css'

export default function Home() {
    const navigate = useNavigate();

    // const redirectToLists = () =>{
    //     navigate('/Lista');
    // }
    return (
        <div>
            <header>
                <nav>
                <h2>🎥Movie Diary🟢🔴🔵</h2>
                <ul className='nav-list'>
                    <li><a href='/'>Profile</a></li>
                    <li><a href='/'>Lists</a></li>
                </ul>
                </nav>
            </header>
        </div>
    )
}