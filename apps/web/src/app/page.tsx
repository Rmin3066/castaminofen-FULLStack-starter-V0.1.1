import Link from 'next/link';
import { getHomeData } from '../lib/mvp-data';

export default function HomePage() {
  const { featuredPodcasts, latestEpisodes, continueListening, categories, channels } =
    getHomeData();

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '32px 20px 80px' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#64748b',
              }}
            >
              Podcast Platform MVP
            </p>
            <h1 style={{ margin: '4px 0 0', fontSize: 32 }}>Discover and play great audio</h1>
          </div>
          <nav style={{ display: 'flex', gap: 12 }}>
            <Link
              href="/podcasts"
              style={{
                padding: '10px 14px',
                border: '1px solid #dbe4f0',
                borderRadius: 999,
                background: '#fff',
              }}
            >
              Podcasts
            </Link>
            <Link
              href="/episodes"
              style={{
                padding: '10px 14px',
                border: '1px solid #dbe4f0',
                borderRadius: 999,
                background: '#fff',
              }}
            >
              Episodes
            </Link>
            <Link
              href="/search"
              style={{
                padding: '10px 14px',
                border: '1px solid #dbe4f0',
                borderRadius: 999,
                background: '#fff',
              }}
            >
              Search
            </Link>
            <Link
              href="/login"
              style={{
                padding: '10px 14px',
                borderRadius: 999,
                background: '#111827',
                color: '#fff',
              }}
            >
              Login
            </Link>
          </nav>
        </header>

        <section
          style={{ display: 'grid', gap: 16, gridTemplateColumns: '1.4fr 0.8fr', marginBottom: 24 }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #111827, #2563eb)',
              color: '#fff',
              borderRadius: 24,
              padding: 28,
            }}
          >
            <p
              style={{
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.24em',
                opacity: 0.8,
              }}
            >
              Featured
            </p>
            <h2 style={{ margin: '8px 0 10px', fontSize: 28 }}>{featuredPodcasts[0]?.title}</h2>
            <p style={{ margin: 0, lineHeight: 1.6, maxWidth: 560 }}>
              {featuredPodcasts[0]?.description}
            </p>
          </div>
          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              padding: 24,
              boxShadow: '0 10px 30px rgba(15,23,42,0.08)',
            }}
          >
            <h3 style={{ marginTop: 0 }}>Continue listening</h3>
            {continueListening.map((episode) => (
              <div
                key={episode.id}
                style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}
              >
                <strong>{episode.title}</strong>
                <div style={{ color: '#64748b', fontSize: 14 }}>{episode.duration}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h3>Latest episodes</h3>
          <div
            style={{
              display: 'grid',
              gap: 16,
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            }}
          >
            {latestEpisodes.map((episode) => (
              <article
                key={episode.id}
                style={{
                  background: '#fff',
                  borderRadius: 18,
                  padding: 18,
                  boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
                }}
              >
                <p style={{ margin: 0, color: '#64748b', fontSize: 13 }}>{episode.podcastSlug}</p>
                <h4 style={{ margin: '6px 0 8px' }}>{episode.title}</h4>
                <p style={{ margin: 0, color: '#475569', lineHeight: 1.5 }}>
                  {episode.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ display: 'grid', gap: 20, gridTemplateColumns: '1fr 1fr 1fr' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: 18 }}>
            <h3>Categories</h3>
            {categories.map((category) => (
              <div key={category} style={{ padding: '6px 0' }}>
                {category}
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: 18, padding: 18 }}>
            <h3>Channels</h3>
            {channels.map((channel) => (
              <div key={channel} style={{ padding: '6px 0' }}>
                {channel}
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: 18, padding: 18 }}>
            <h3>Featured podcasts</h3>
            {featuredPodcasts.map((podcast) => (
              <div key={podcast.id} style={{ padding: '6px 0' }}>
                {podcast.title}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
