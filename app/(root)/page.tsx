// Importing components and utilities
import SearchForm from "@/components/SearchForm";                         // Search bar component for filtering startups
import StartupCard, { StartupTypeCard } from "@/components/StartupCard"; // Component to display individual startup info
import { STARTUPS_QUERY } from "@/sanity/lib/queries";                   // GROQ query to fetch startups from Sanity
import { sanityFetch, SanityLive } from "@/sanity/lib/live";            // Utility to fetch data from Sanity + live preview
import { auth } from "@/auth";                                           // Custom authentication handler

// Default async component that renders the homepage
export default async function Home({
  searchParams, // Extracting search parameters from the URL (e.g., ?query=...)
}: {
  searchParams: Promise<{ query?: string }>; // Expecting searchParams to be a Promise resolving to an object with optional query
}) {
  // Resolve search parameters and extract query string
  const query = (await searchParams).query;
  const params = { search: query || null }; // Prepare query param for backend fetch, default to null

  // Get user session (if logged in)
  const session = await auth();
  console.log(session?.id); // Log session ID (for debugging or analytics)

  // Fetch startup posts from Sanity using the query and params
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      {/* Hero Section */}
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} /> {/* Render the search input form */}
      </section>

      {/* List of Startups Section */}
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"} {/* Conditional title based on search */}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            // If there are posts, render each StartupCard
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            // Fallback UI when no startups are found
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive /> {/* Enables real-time preview/editing if Sanity live mode is on */}
    </>
  );
}
