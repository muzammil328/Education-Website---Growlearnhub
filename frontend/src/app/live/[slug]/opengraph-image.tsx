import { ImageResponse } from 'next/og';
import { fetchMcqBySlug } from './metadata';
import { Para } from '@muzammil328/ui';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mcq = await fetchMcqBySlug(slug);

  const question = mcq?.question ?? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const bookName = mcq?.bookName ?? '';
  const chapterName = mcq?.chapterName ?? '';
  const correctLetter = mcq ? String.fromCharCode(65 + mcq.correctOption) : '';
  const correctAnswer = mcq?.options?.[mcq.correctOption] ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0f172a',
          fontFamily: 'system-ui, sans-serif',
          padding: '48px 56px',
        }}
      >
        {/* Header bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px',
          }}>📝</div>
          <span style={{ fontSize: '22px', fontWeight: 700, color: '#60a5fa', letterSpacing: '-0.01em' }}>
            GrowLearnHub
          </span>
          <span style={{ fontSize: '16px', color: '#475569', marginLeft: '4px' }}>· MCQ Practice</span>
        </div>

        {/* Question card */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1e293b',
          borderRadius: '20px',
          border: '1px solid #334155',
          padding: '36px 40px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{
              backgroundColor: '#1d4ed8', color: 'white', borderRadius: '8px',
              padding: '4px 12px', fontSize: '13px', fontWeight: 600,
            }}>Q</div>
            {bookName && (
              <span style={{ fontSize: '13px', color: '#64748b', backgroundColor: '#0f172a', borderRadius: '6px', padding: '3px 10px' }}>
                {bookName}
              </span>
            )}
            {chapterName && (
              <span style={{ fontSize: '13px', color: '#64748b', backgroundColor: '#0f172a', borderRadius: '6px', padding: '3px 10px' }}>
                {chapterName}
              </span>
            )}
          </div>

          <Para style={{
            fontSize: question.length > 100 ? '24px' : '28px',
            fontWeight: 700,
            color: '#f1f5f9',
            lineHeight: 1.4,
            margin: '0 0 28px 0',
            flex: 1,
          }}>
            {question.length > 140 ? question.slice(0, 137) + '…' : question}
          </Para>

          {correctAnswer && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              backgroundColor: '#052e16', border: '1px solid #166534',
              borderRadius: '12px', padding: '14px 20px',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: '#16a34a', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: 700, flexShrink: 0,
              }}>{correctLetter}</div>
              <span style={{ fontSize: '16px', color: '#86efac', fontWeight: 600 }}>
                {correctAnswer.length > 80 ? correctAnswer.slice(0, 77) + '…' : correctAnswer}
              </span>
              <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#4ade80', fontWeight: 600 }}>✓ Correct</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <span style={{ fontSize: '14px', color: '#475569' }}>growlearnhub.com</span>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['Instant Feedback', 'All Subjects', 'Free'].map(tag => (
              <span key={tag} style={{
                fontSize: '13px', color: '#94a3b8',
                backgroundColor: '#1e293b', borderRadius: '6px',
                padding: '4px 10px', border: '1px solid #334155',
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
