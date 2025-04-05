import React from 'react';
import img from '../assets/Download_free_png_of_PNG__Student_cute_white_background_happiness_about_png__cartoon__cute__face__and_person_12791455-removebg-preview.png';

const MotivationalQuote = () => {
    return (
        <div className="flex items-center justify-center p-8 ">
            <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto space-x-8">
                {/* Text Section */}
                <div className="flex-1 text-center md:text-left animate__animated animate__fadeIn animate__delay-1s">
                    <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-10 rounded-lg text-white text-3xl md:text-4xl lg:text-5xl font-extrabold max-w-xl mx-auto shadow-lg">
                        "Success is not the key to happiness. Happiness is the key to success. Keep learning and Keep coding."
                    </div>
                </div>

                {/* Image Section */}
                <div className="flex-1 flex justify-center items-center mt-8 md:mt-0  ">
                    <img src={img} alt="Motivational Image" className="w-60 md:w-72 lg:w-80 rounded-lg  " />
                </div>
            </div>
        </div>
    );
};

export default MotivationalQuote;
