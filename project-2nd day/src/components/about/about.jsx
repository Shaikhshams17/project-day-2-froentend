const About = () => {
    return (
        <div className="max-w-4xl mx-auto p-10 md:p-16 lg:p-20 bg-gradient-to-br from-blue-50 to-blue-900 backdrop-blur-lg shadow-2xl border border-gray-300 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-50"></div>
            
            <h1 className="text-center text-5xl md:text-6xl font-bold text-white relative z-10 drop-shadow-lg animate-fade-in">About C4B</h1>
            
            <p className="text-center text-lg md:text-xl text-gray-200 mt-6 relative z-10 px-4">
                C4B is an innovative platform focused on building cutting-edge solutions. We strive to 
                create impactful experiences through technology, collaboration, and creativity.
            </p>
            
            <div className="mt-8 flex justify-center relative z-10">
                <button className="px-6 py-3 text-lg font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-all duration-300 rounded-lg shadow-lg">
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default About;
