import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const redirectToLists = () =>{
        navigate('/Lista');
    }
    return (
        <div>
            <header>
                <nav>
                <h2>Movie Diary</h2>
                <ul>
                    <li onClick={()=>redirectToLists()} >Movies</li>
                    <li>Lists</li>
                </ul>
                </nav>
            </header>
            <p>Welcome to the MovieDiary, a place to savall the movies that you love and create a to watch list</p>

        </div>
    )
}