import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-bold">Task Manager</h1>
        <div className="space-x-4">
          <Link href="/" className="text-white font-semibold hover:text-blue-400">Home</Link>
          <Link href="/about" className="text-white font-semibold hover:text-blue-400">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
