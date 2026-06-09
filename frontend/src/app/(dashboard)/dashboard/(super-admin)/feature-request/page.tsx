import FeedbackTable from '../_components/FeedbackTable';

export const metadata = { title: 'Feature Requests' };

export default function Page() {
  return <FeedbackTable type="feature-request" title="Feature Requests" />;
}
