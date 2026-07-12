export default function RegisterPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        color: '#0f172a',
        padding: '32px 20px 80px',
      }}
    >
      <div
        style={{
          maxWidth: 460,
          margin: '0 auto',
          background: '#fff',
          borderRadius: 24,
          padding: 28,
          boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
        }}
      >
        <h1 style={{ marginTop: 0 }}>Create account</h1>
        <p style={{ color: '#64748b' }}>Join to save your listening history and bookmarks.</p>
        <form style={{ display: 'grid', gap: 12 }}>
          <input
            placeholder="Name"
            style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid #cbd5e1' }}
          />
          <input
            placeholder="Email"
            style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid #cbd5e1' }}
          />
          <input
            placeholder="Password"
            type="password"
            style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid #cbd5e1' }}
          />
          <button
            type="button"
            style={{
              padding: '12px 14px',
              borderRadius: 10,
              border: 0,
              background: '#111827',
              color: '#fff',
            }}
          >
            Create account
          </button>
        </form>
      </div>
    </main>
  );
}
