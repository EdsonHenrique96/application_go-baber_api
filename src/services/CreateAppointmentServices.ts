import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface CreateAppointmentServiceDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    provider,
    date,
  }: CreateAppointmentServiceDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const parsedDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      parsedDate,
    );

    if (findAppointmentInSameDate) {
      throw new Error('This appointment already booked');
    }

    /**
     * Não é necessario o `await` aquie, porque o `.create()` não salva no banco,
     * apenas cria o objeto a ser salvo.
     * Quem vai salvar de fato é o método abaixo `.save()`
     */
    const appointment = appointmentsRepository.create({
      provider,
      date: parsedDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
