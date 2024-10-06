import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import InsruSignUp from '../signup/InsruSignUp';


const HeroHeader = () => {
    const [showloginModel, setloginModel] = useState(false);

    return (
        <div className="relative h-[600px] w-full bg-cover bg-center" style={{ backgroundImage: 'url(https://s.udemycdn.com/teaching/billboard-desktop-v4.jpg)' }}>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 flex items-center justify-center h-full ">
                <div className="container mx-auto px-4">
                    <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Come teach with us</h1>
                    <p className="text-white text-lg md:text-xl mb-6">
                        Become an instructor and change lives — including your own
                    </p>
                    <Button onClick={() => setloginModel(true)} > Get started</Button>
                    {showloginModel && <InsruSignUp oncon={() => setloginModel(false)} />}
                </div>
            </div>
        </div >
    );
}
export default HeroHeader;
