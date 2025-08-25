

export default function Comment({ post }) {
  return (
    <div className="ml-128 mt-16 space-y-6">
      {post.map((p) => (
        <div key={p.id} className="border rounded-lg p-4 bg-white shadow">
          <h1 className="font-bold text-lg mb-2">Caption: {p.caption}</h1>

          <div className="space-y-2">
            {p.post_comments && p.post_comments.length > 0 ? (
              p.post_comments.map((c) => (
                <div
                  key={c.id}
                  className="bg-green-50 rounded-lg p-2 text-green-900"
                >
                  {c.comment}
                </div>
              ))
            ) : (
              <span className="text-gray-500">No comments yet</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
