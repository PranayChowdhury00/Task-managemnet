const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 min-h-[200px]">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <div>
                        <h2 className="text-lg font-bold">Task Manager</h2>
                        <p className="text-sm">Your tasks, organized.</p>
                    </div>
                    <nav className="flex flex-col md:flex-row mt-2">
                        <a href="/about" className="hover:text-gray-300 mx-2">
                            About
                        </a>
                        <a href="/contact" className="hover:text-gray-300 mx-2">
                            Contact
                        </a>
                        <a href="/privacy" className="hover:text-gray-300 mx-2">
                            Privacy Policy
                        </a>
                    </nav>
                </div>
                <div className="border-t border-gray-700 pt-4">
                    <p className="text-center text-sm">
                        © {new Date().getFullYear()} Your Company Name. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
