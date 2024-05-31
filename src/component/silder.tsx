import React, { useState } from 'react';

export default function Slider() {
    // Khai báo state để theo dõi chỉ số của hình ảnh hiện tại
    const [currentSlide, setCurrentSlide] = useState(0);

    // Mảng chứa đường dẫn của các hình ảnh
    const images = [
        "https://wallpapers.com/images/featured/devil-may-cry-5-w422eq37u74ho9tm.jpg",
        "https://c4.wallpaperflare.com/wallpaper/539/484/958/dmc-devil-may-cry-vergil-hd-wallpaper-preview.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFgGxPRQvZWqgz9VO_YVEsVfe5LVJhaMnAQ&s",
        "https://wallpapercg.com/download/devil-may-cry--19432.jpg",
        "https://i.pinimg.com/originals/3f/51/58/3f51581c3f6bd990b20dfbca8ce8056c.jpg"
    ];

    // Hàm xử lý sự kiện khi nhấp nút "Previous"
    const handlePrev = () => {
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
    };

    // Hàm xử lý sự kiện khi nhấp nút "Next"
    const handleNext = () => {
        setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
    };

    return (
        <>
            <div className="relative w-full" data-carousel="slide">
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    {images.map((image, index) => (
                        <div key={index} className={`${currentSlide === index ? '' : 'hidden'} duration-700 ease-in-out`} data-carousel-item>
                            <img src={image} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                    {images.map((_, index) => (
                        <button key={index} type="button" className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'}`} aria-current={currentSlide === index ? 'true' : 'false'} aria-label={`Slide ${index + 1}`} onClick={() => setCurrentSlide(index)}></button>
                    ))}
                </div>
                <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev onClick={handlePrev}>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next onClick={handleNext}>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
        </>
    );
}
