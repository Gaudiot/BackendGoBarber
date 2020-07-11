import AppError from '@shared/errors/AppError';

import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: 'lijedoij',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('lijedoij');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 0, 13, 22);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: 'lijedoij',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: 'lijedoij',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
