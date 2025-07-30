import Image from "next/image";

export default function PostCreation() {
  return (
    <section className="w-full max-w-md mx-auto bg-white rounded-xl shadow p-4 mb-4 flex flex-col gap-4 glow-border">
      <div className="flex items-center gap-3">
        <Image
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="Your avatar"
          width={40}
          height={40}
          className="rounded-full border"
        />
        <input
          type="text"
          placeholder="Share what's happening on your farm..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 bg-gray-50"
          disabled
        />
      </div>
      <div className="flex gap-3 justify-end">
        <button className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium cursor-not-allowed" disabled>
          Add Photo
        </button>
        <button className="bg-green-600 text-white px-6 py-1 rounded-full text-sm font-semibold shadow cursor-not-allowed" disabled>
          Post
        </button>
      </div>
      <p className="text-xs text-gray-400 text-right">(Posting coming soon!)</p>
    </section>
  );
} 