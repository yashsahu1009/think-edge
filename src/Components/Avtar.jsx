export function Avatar({ src, alt }) {
    return (
      <img
        className="w-12 h-12 rounded-full border border-gray-300"
        src={src || "/default-avatar.png"}
        alt={alt || "User Avatar"}
      />
    );
  }
  