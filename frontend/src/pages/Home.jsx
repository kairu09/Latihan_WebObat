import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">Apotek Online</div>
        <ul className="flex gap-6">
          <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
          <li><Link to="/katalog-obat" className="hover:text-yellow-400">Katalog</Link></li>
          <li><Link to="/about" className="hover:text-yellow-400">Tentang</Link></li>
          <li><Link to="/contact" className="hover:text-yellow-400">Kontak</Link></li>
          <li><Link to="/admin/login" className="hover:text-yellow-400 bg-blue-600 px-3 py-1 rounded">Admin</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 text-white flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Selamat Datang di Apotek Online
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Temukan obat yang Anda butuhkan dengan mudah.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/katalog-obat"
            className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-md hover:bg-yellow-500 transition duration-200 font-semibold"
          >
            Lihat Katalog Obat
          </Link>
          <Link
            to="/admin/login"
            className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-100 transition duration-200 font-semibold border border-white"
          >
            Kelola Obat (Admin)
          </Link>
        </div>
      </header>

     
    </div>
  );
};

export default Home;
