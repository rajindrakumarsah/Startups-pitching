// Importing the Navbar component
import Navbar from "@/components/Navbar";

// Layout component that wraps around every page or route
export default function Layout({
  children, // React children passed to the layout (e.g., page content)
}: Readonly<{
  children: React.ReactNode; // Ensures 'children' is a valid React node and read-only
}>) {
  return (
    // Main wrapper for the app, applying global font style
    <main className="font-work-sans">
      {/* Persistent Navbar rendered on all pages */}
      <Navbar />

      {/* Render dynamic page content below the navbar */}
      {children}
    </main>
  );
}
