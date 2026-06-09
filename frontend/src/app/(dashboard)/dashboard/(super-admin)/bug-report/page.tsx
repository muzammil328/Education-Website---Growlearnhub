import FeedbackTable from '../_components/FeedbackTable';

export const metadata = { title: 'Bug Reports' };

export default function Page() {
  return <FeedbackTable type="bug-report" title="Bug Reports" />;
}
