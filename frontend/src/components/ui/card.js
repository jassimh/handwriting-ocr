export function Card({ children }) {
  return <div className="p-4 shadow-lg rounded-lg bg-white">{children}</div>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}