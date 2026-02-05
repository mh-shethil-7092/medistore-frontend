"use client";

export default function HealthTips() {
  const tips = [
    { title: "Stay Hydrated", desc: "Drink at least 8 glasses of water daily for better skin and digestion." },
    { title: "Check Expiry", desc: "Always check the date on the back of the medicine pack before use." },
    { title: "Consult Experts", desc: "Even for OTC meds, consult a pharmacist if you have allergies." }
  ];

  return (
    <section className="bg-blue-600/10 border border-blue-500/30 p-8 rounded-2xl">
      <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">Daily Health Tips 💡</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {tips.map((tip, i) => (
          <div key={i} className="text-center space-y-2">
            <h4 className="font-bold text-white">{tip.title}</h4>
            <p className="text-sm text-zinc-400">{tip.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}