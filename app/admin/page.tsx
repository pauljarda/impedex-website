export default function AdminPage() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#4b5668]">
        Overview
      </p>

      <h1 className="mt-2 text-3xl font-black text-[#041b4a]">
        Admin Dashboard
      </h1>

      <p className="mt-3 max-w-2xl text-[#4b5668]">
        This is the main admin area. From here, you will manage repair tickets,
        products, and other tools for the IMPEDEX platform.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-black/10 bg-white/45 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_26px_rgba(0,0,0,0.08)]">
          <h2 className="text-xl font-bold text-[#041b4a]">Repair Tickets</h2>
          <p className="mt-2 text-sm text-[#4b5668]">
            Track incoming repair requests and manage statuses.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white/45 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_26px_rgba(0,0,0,0.08)]">
          <h2 className="text-xl font-bold text-[#041b4a]">Products</h2>
          <p className="mt-2 text-sm text-[#4b5668]">
            Add and manage second-hand products displayed on the website.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white/45 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_26px_rgba(0,0,0,0.08)]">
          <h2 className="text-xl font-bold text-[#041b4a]">Future Tools</h2>
          <p className="mt-2 text-sm text-[#4b5668]">
            Stats, order flow, service history, and other business tools can go here.
          </p>
        </div>
      </div>
    </div>
  );
}