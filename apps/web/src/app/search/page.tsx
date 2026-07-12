'use client';

import { useMemo, useState } from 'react';
import { searchContent } from '../../lib/mvp-data';

export default function SearchPage() {
  const [query, setQuery] = useState('focus');
  const results = useMemo(() => searchContent(query), [query]);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        color: '#0f172a',
        padding: '32px 20px 80px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ marginBottom: 8 }}>Search</h1>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search podcasts, episodes, or channels"
          style={{
            width: '100%',
            maxWidth: 560,
            padding: '12px 14px',
            borderRadius: 999,
            border: '1px solid #cbd5e1',
            marginBottom: 20,
          }}
        />

        <div
          style={{
            display: 'grid',
            gap: 20,
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          }}
        >
          <section style={{ background: '#fff', borderRadius: 18, padding: 18 }}>
            <h3>Podcasts</h3>
            {results.podcasts.map((podcast: (typeof results.podcasts)[number]) => (
              <div key={podcast.id} style={{ padding: '6px 0' }}>
                {podcast.title}
              </div>
            ))}
          </section>
          <section style={{ background: '#fff', borderRadius: 18, padding: 18 }}>
            <h3>Episodes</h3>
            {results.episodes.map((episode: (typeof results.episodes)[number]) => (
              <div key={episode.id} style={{ padding: '6px 0' }}>
                {episode.title}
              </div>
            ))}
          </section>
          <section style={{ background: '#fff', borderRadius: 18, padding: 18 }}>
            <h3>Channels</h3>
            {results.channels.map((channel: string) => (
              <div key={channel} style={{ padding: '6px 0' }}>
                {channel}
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
