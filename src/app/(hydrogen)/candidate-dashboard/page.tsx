import CandidateDashboard from '@/app/shared/candidate/dashboard';
import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject(),
};

export default function CandidateDashboardPage() {
  return <CandidateDashboard />;
}
