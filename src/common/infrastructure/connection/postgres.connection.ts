import { Connection } from '@common/root/domain/constants';
import { CONFIG_DATABASE_POSTGRES } from '../database';

export const POSTGRES_CONNECTIONS = () => ([
  CONFIG_DATABASE_POSTGRES(
    Connection.auth.database,
    Connection.auth.name,
    Connection.auth.collection,
  ),
  CONFIG_DATABASE_POSTGRES(
    Connection.user.database,
    Connection.user.name,
    Connection.user.collection,
  ),
  CONFIG_DATABASE_POSTGRES(
    Connection.skill.database,
    Connection.skill.name,
    Connection.skill.collection,
  ),
  CONFIG_DATABASE_POSTGRES(
    Connection.project.database,
    Connection.project.name,
    Connection.project.collection,
  ),
  CONFIG_DATABASE_POSTGRES(
    Connection.presentation.database,
    Connection.presentation.name,
    Connection.presentation.collection,
  ),
  CONFIG_DATABASE_POSTGRES(
    Connection.personal.database,
    Connection.personal.name,
    Connection.personal.collection,
  ),
  CONFIG_DATABASE_POSTGRES(
    Connection.experience.database,
    Connection.experience.name,
    Connection.experience.collection,
  ),
  CONFIG_DATABASE_POSTGRES(
    Connection.education.database,
    Connection.education.name,
    Connection.education.collection,
  ),
  CONFIG_DATABASE_POSTGRES(
    Connection.curriculum.database,
    Connection.curriculum.name,
    Connection.curriculum.collection,
  ),
  CONFIG_DATABASE_POSTGRES(
    Connection.course.database,
    Connection.course.name,
    Connection.course.collection,
  ),
  CONFIG_DATABASE_POSTGRES(
    Connection.certification.database,
    Connection.certification.name,
    Connection.certification.collection,
  ),
]);