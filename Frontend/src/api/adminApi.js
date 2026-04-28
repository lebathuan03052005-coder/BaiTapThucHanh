const BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

export async function fetchUsers() {
  const res = await fetch(`${BASE}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function fetchHotels() {
  const res = await fetch(`${BASE}/hotels`);
  if (!res.ok) throw new Error("Failed to fetch hotels");
  return res.json();
}

export default { fetchUsers, fetchHotels };
