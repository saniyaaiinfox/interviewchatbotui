'use client';

import { useRef, useState } from 'react';
import { PiFilePdf, PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Text } from 'rizzui';
import {
  CreateUserInput,
  createUserSchema,
} from '@/utils/validators/create-user.schema';
import { useModal } from '@/app/shared/modal-views/use-modal';
import {
  permissions,
  roles,
  statuses,
} from '@/app/shared/roles-permissions/utils';
import { DatePicker } from '@/components/ui/datepicker';
import UploadButton from '@/app/shared/upload-button';
import FileUpload, { FileInput } from '@/app/shared/file-upload';
import Upload from '@/components/ui/upload';
import SimpleBar from 'simplebar-react';
import {
  CreateApplicationInput,
  createApplicationSchema,
} from '@/utils/validators/create-application.schema';

export default function CreateApplication() {
  const defaultValues: Omit<
    CreateApplicationInput,
    'meetingSchedule' | 'dob'
  > & {
    meetingSchedule: Date | undefined;
    dob: Date | undefined;
  } = {
    candidateFiles: [],
    candidateName: '',
    meetingSchedule: undefined,
    dob: undefined,
    job: '',
  };
  const { closeModal } = useModal();
  const [reset, setReset] = useState(defaultValues);
  const [isLoading, setLoading] = useState(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<CreateApplicationInput> = (data) => {
    // set timeout ony required to display loading state of the create category button
    const formattedData = {
      ...data,
      createdAt: new Date(),
    };
    setLoading(true);
    setTimeout(() => {
      console.log('formattedData', formattedData);
      setLoading(false);
      setReset({
        ...defaultValues,
      });
      closeModal();
    }, 600);
  };

  return (
    <Form<CreateApplicationInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createApplicationSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new Application
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Candidate Name"
              placeholder="Enter Candidate's full name"
              {...register('candidateName')}
              className="col-span-full"
              error={errors.candidateName?.message}
            />

            <Input
              label="Job"
              placeholder="Enter Job title"
              className="col-span-full"
              {...register('job')}
              error={errors.job?.message}
            />
            <Controller
              name="dob"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <DatePicker
                  inputProps={{ label: 'DOB' }}
                  placeholderText="Select Date"
                  dateFormat="dd/MM/yyyy"
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                />
              )}
            />
            <Controller
              name="meetingSchedule"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <DatePicker
                  inputProps={{ label: 'Schedule Meeting' }}
                  placeholderText="Select Date"
                  dateFormat="dd-MMM-yy hh:mm a"
                  onChange={onChange}
                  showTimeInput
                  onBlur={onBlur}
                  popperPlacement="right-start"
                  selected={value}
                />
              )}
            />
            <Controller
              name="candidateFiles"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <div className="col-span-full">
                  <Upload
                    label={'Candidate Files'}
                    ref={imageRef}
                    accept={'pdf'}
                    multiple={false}
                    onChange={(event) => {
                      const uploadedFiles = (event.target as HTMLInputElement)
                        .files;
                      const newFiles = Object.entries(uploadedFiles as object)
                        .map((file) => {
                          if (file[1]) return file[1];
                        })
                        .filter((file) => file !== undefined);
                      onChange(newFiles);
                    }}
                    className="mb-6 min-h-[280px] justify-center border-dashed bg-gray-50 dark:bg-transparent"
                  />
                  {value?.length > 1 ? (
                    <Text className="mb-2 text-gray-500">
                      {value?.length} files
                    </Text>
                  ) : null}

                  {value?.length > 0 && (
                    <SimpleBar className="max-h-[280px]">
                      <div className="grid grid-cols-1 gap-4">
                        {value?.map((file: File, index: number) => (
                          <div
                            className="flex min-h-[58px] w-full items-center rounded-xl border border-muted px-3 dark:border-gray-300"
                            key={file.name}
                          >
                            <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-muted bg-gray-50 object-cover px-2 py-1.5 dark:bg-transparent">
                              <PiFilePdf className="h-5 w-5" />
                            </div>
                            <div className="truncate px-2.5">{file.name}</div>
                            {/* <ActionIcon
                              onClick={() => handleImageDelete(index)}
                              size="sm"
                              variant="flat"
                              color="danger"
                              className="ms-auto flex-shrink-0 p-0 dark:bg-red-dark/20"
                            >
                              <PiTrashBold className="w-6" />
                            </ActionIcon> */}
                          </div>
                        ))}
                      </div>
                    </SimpleBar>
                  )}
                </div>
              )}
            />

            <div className="col-span-full flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={closeModal}
                className="w-full @xl:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto"
              >
                Create Application
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
