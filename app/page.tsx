export default function Home() {
  return (
    <main className="space-y-12 p-6">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Your Trusted Online Medicine Shop 💊</h1>
        <p className="text-gray-600">
          Buy authentic over-the-counter medicines at your doorstep.
        </p>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border p-4 rounded">Pain Relief</div>
          <div className="border p-4 rounded">Cold & Flu</div>
          <div className="border p-4 rounded">Vitamins</div>
          <div className="border p-4 rounded">Skin Care</div>
        </div>
      </section>

      {/* Featured Medicines */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Featured Medicines</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border p-4 rounded">Paracetamol</div>
          <div className="border p-4 rounded">Vitamin C</div>
          <div className="border p-4 rounded">Cough Syrup</div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Why MediStore?</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>100% genuine OTC medicines</li>
          <li>Cash on Delivery</li>
          <li>Fast & reliable delivery</li>
          <li>Trusted sellers</li>
        </ul>
      </section>
    </main>
  );
}
