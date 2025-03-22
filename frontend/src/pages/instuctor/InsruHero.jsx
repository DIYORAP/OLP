import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const HeroHeader = () => {
    const [showloginModel, setloginModel] = useState(false);
    const valuePropsData = [
        {
            imgSrc: "https://s.udemycdn.com/teaching/value-prop-teach-v3.jpg",
            imgSrcSet: "https://s.udemycdn.com/teaching/value-prop-teach-v3.jpg 1x, https://s.udemycdn.com/teaching/value-prop-teach-2x-v3.jpg 2x",
            title: "Teach your way",
            text: "Publish the course you want, in the way you want, and always have control of your own content.",
        },
        {
            imgSrc: "https://s.udemycdn.com/teaching/value-prop-inspire-v3.jpg",
            imgSrcSet: "https://s.udemycdn.com/teaching/value-prop-inspire-v3.jpg 1x, https://s.udemycdn.com/teaching/value-prop-inspire-2x-v3.jpg 2x",
            title: "Inspire learners",
            text: "Teach what you know and help learners explore their interests, gain new skills, and advance their careers.",
        },
        {
            imgSrc: "https://s.udemycdn.com/teaching/value-prop-get-rewarded-v3.jpg",
            imgSrcSet: "https://s.udemycdn.com/teaching/value-prop-get-rewarded-v3.jpg 1x, https://s.udemycdn.com/teaching/value-prop-get-rewarded-2x-v3.jpg 2x",
            title: "Get rewarded",
            text: "Expand your professional network, build your expertise, and earn money on each paid enrollment.",
        },
    ];
    return (
        <>
            <div className="relative h-[600px] w-full bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn2.vectorstock.com/i/1000x1000/44/76/blackboard-inscribed-with-scientific-formulas-vector-16084476.jpg)' }}>
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative z-10 flex items-center justify-center h-full ">
                    <div className="container mx-auto px-4">
                        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Come teach with us</h1>
                        <p className="text-white text-lg md:text-xl mb-6">
                            Become an instructor and change lives — including your own
                        </p>
                        <Link to="/login">   <Button > Get started</Button></Link>
                    </div>
                </div>
            </div >



            <div className="container mx-auto text-center py-12">
                <h2 className="text-4xl font-serif mb-8">So many reasons to start</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {valuePropsData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <img
                                src={item.imgSrc}
                                srcSet={item.imgSrcSet}
                                alt={item.title}
                                width="100"
                                height="100"
                                className="mb-4"
                                loading="lazy"
                            />
                            <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-lg text-gray-600">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container mx-auto text-center py-12">
                <h2 className="text-5xl font-serif mb-4">Become an instructor today</h2>
                <p className="text-xl mb-8">
                    Join one of the world’s largest online learning marketplaces.
                </p>
                <Link to='/login'>
                    <Button onClick={() => setloginModel(true)}
                        type="button"
                        className="bg-slate-950 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300"
                    >
                        Get started
                    </Button>
                </Link>
            </div>
        </>
    );
}
export default HeroHeader;
