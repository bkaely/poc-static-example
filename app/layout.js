export const metadata = {
  title: "poc-static-example",
  description: "A proof-of-concept static Next.js site hosted on GitHub Pages",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
