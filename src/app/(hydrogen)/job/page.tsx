import { metaObject } from '@/config/site.config';
import JobDashboard from '@/app/shared/job';

export const metadata = {
  ...metaObject('Job Dashboard'),
};

export default function JobDashboardPage() {
  return <JobDashboard />;
}
