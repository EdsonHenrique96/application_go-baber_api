import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmetService from '../services/CreateAppointmentServices';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (_request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { providerId, date } = request.body;

  const formatedDate = parseISO(date);

  const CreateAppointmet = new CreateAppointmetService();

  const createdAppointment = await CreateAppointmet.execute({
    date: formatedDate,
    providerId,
  });

  return response.json(createdAppointment);
});

export default appointmentsRouter;
