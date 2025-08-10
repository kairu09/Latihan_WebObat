export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">Nama Brand</div>
        <ul className="flex gap-6">
          <li><a href="#home" className="hover:text-yellow-400">Home</a></li>
          <li><a href="#about" className="hover:text-yellow-400">About</a></li>
          <li><a href="#services" className="hover:text-yellow-400">Services</a></li>
          <li><a href="#contact" className="hover:text-yellow-400">Contact</a></li>
        </ul>
      </nav>

      {/* Landing Section */}
      <header
        id="home"
        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white flex flex-col items-center justify-center text-center p-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Judul Landing Page</h1>
        <p className="text-lg md:text-xl">Deskripsi singkat di sini...</p>
      </header>

      {/* Template Kosong untuk Tambahan */}
      <section className="py-12 px-6 bg-gray-100">
        {/* Tambahkan kontenmu di sini */}
        <h2 className="text-2xl font-semibold mb-4">Section Kosong</h2>
        <p className="text-gray-700">Isi sesuai kebutuhan proyekmu...</p>
      </section>
    </div>
  );
}
