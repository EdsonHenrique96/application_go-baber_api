import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface CreateAppointmentServiceDTO {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    providerId,
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
     * apenas cria o objeto a ser salvo(cria instância do model/Appointment ,
     * neste caso).
     * Quem vai salvar de fato é o método abaixo `.save()`
     */
    const appointment = appointmentsRepository.create({
      provider_id: providerId,
      date: parsedDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
