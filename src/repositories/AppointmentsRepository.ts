import { Repository, EntityRepository } from 'typeorm';

import Appointment from '../models/Appointment';

/**
 * O typeorm já possui um repositório com seus métodos de interação com o db.
 * Esse Repositório criado nesse arquivo só é necessário quando
 * vocêr quer extender as funcs do repositório nativo do typeorm, como é o caso
 * da func abaixo findByDate().
 */

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
