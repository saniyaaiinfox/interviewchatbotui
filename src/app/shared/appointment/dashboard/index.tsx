import AppointmentStats from '@/app/shared/appointment/dashboard/appointment-stats';
import UpcomingAppointmentTable from '@/app/shared/appointment/dashboard/upcoming-appointment-table';
import AppointmentDiseases from '@/app/shared/appointment/dashboard/appointment-diseases';
import Department from '@/app/shared/appointment/dashboard/department';
import TotalInterviews from '@/app/shared/appointment/dashboard/total-interviews';
import Patients from '@/app/shared/appointment/dashboard/patients';
import PatientAppointment from '@/app/shared/appointment/dashboard/patient-appointment';
import ScheduleList from '@/app/shared/appointment/dashboard/schedule-list';
import AppointmentTodo from '@/app/shared/appointment/dashboard/appointment-todo';

export default function AppointmentDashboard() {
  return (
    <div className="grid grid-cols-12  gap-6 @container @[59rem]:gap-7">
      <AppointmentStats className="col-span-full" />
      <TotalInterviews className="col-span-full @[90rem]:col-span-7" />
      <ScheduleList className="col-span-full @[59rem]:col-span-6 @[90rem]:col-span-5" />
      <AppointmentTodo className="col-span-full @[59rem]:col-span-6 @[90rem]:col-span-4" />
      {/* <Patients className="col-span-full @[59rem]:col-span-6 @[90rem]:col-span-4" /> */}
      <Department className="col-span-full @[90rem]:col-span-7" />
      <UpcomingAppointmentTable className="col-span-full" />
      {/* <PatientAppointment className="col-span-full @[59rem]:col-span-6 @[90rem]:col-span-7 @[90rem]:col-start-auto @[90rem]:row-start-auto" />
      <AppointmentDiseases className="col-span-full @[59rem]:col-span-6 @[90rem]:col-span-5" /> */}
    </div>
  );
}
