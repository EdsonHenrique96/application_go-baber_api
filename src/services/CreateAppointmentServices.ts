import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface CreateAppointmentServiceDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentReposotory: AppointmentsRepository) {
    this.appointmentsRepository = appointmentReposotory;
  }

  public execute({ provider, date }: CreateAppointmentServiceDTO): Appointment {
    const parsedDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      parsedDate,
    );

    if (findAppointmentInSameDate) {
      throw new Error('This appointment already booked');
    }

    const appointmentCreated = this.appointmentsRepository.create(
      provider,
      parsedDate,
    );

    return appointmentCreated;
  }
}

export default CreateAppointmentService;
