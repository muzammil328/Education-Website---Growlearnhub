import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1e40af',
          borderRadius: '24px',
          padding: '48px 64px',
          margin: '32px',
          border: '4px solid #3b82f6',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
            }}
          >
            📝
          </div>
          <span
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          >
            Online MCQ Test
          </span>
        </div>
        <p
          style={{
            fontSize: '24px',
            color: '#bfdbfe',
            margin: 0,
            textAlign: 'center',
          }}
        >
          Practice & Learn with Interactive Quizzes
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginTop: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '12px 24px',
            borderRadius: '12px',
            color: 'white',
            fontSize: '18px',
            fontWeight: 500,
          }}
        >
          ✓ Instant Feedback
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '12px 24px',
            borderRadius: '12px',
            color: 'white',
            fontSize: '18px',
            fontWeight: 500,
          }}
        >
          ✓ Track Progress
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '12px 24px',
            borderRadius: '12px',
            color: 'white',
            fontSize: '18px',
            fontWeight: 500,
          }}
        >
          ✓ All Subjects
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
