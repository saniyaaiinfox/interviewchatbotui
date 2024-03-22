'use server';
import { routes } from '@/config/routes';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/auth-options';

export default async function Page() {
  //should be same as in next auth options
  const hardcodedUsers = {
    admin: {
      email: 'admin@admin.com',
    },
    hrManager: {
      email: 'hr_manager@hrmanager.com',
    },
    hr: {
      email: 'hr@hr.com',
    },
    candidate: {
      email: 'candidate@candidate.com',
    },
  } as const;

  const session = await getServerSession(authOptions);

  const userEmail = session?.user?.email;

  if (userEmail === hardcodedUsers.hr.email) {
    redirect(routes.fileManager.dashboard);
  }
  if (userEmail === hardcodedUsers.hrManager.email) {
    redirect(routes.interview.dashboard);
  }

  redirect(routes.fileManager.dashboard);
}
