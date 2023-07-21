import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'src/common/domain/constants';

export const CONFIG_DATABASE = (url, connectionName) => {
  console.log(process.env.URI_MONGODB);
  return MongooseModule.forRoot(url, {
    connectionName: connectionName,
  });
};

export const CONFIG_DATABASE_USERS = () => {
  console.log(process.env.URI_MONGODB_USERS);
  return MongooseModule.forRoot(process.env.URI_MONGODB_USERS, {
    connectionName: Connection.user.name,
  });
};

export const CONFIG_DATABASE_SKILLS = () => {
  console.log(process.env.URI_MONGODB_SKILLS);
  return MongooseModule.forRoot(process.env.URI_MONGODB_SKILLS, {
    connectionName: Connection.skill.name,
  });
};

export const CONFIG_DATABASE_PROJECTS = () => {
  console.log(process.env.URI_MONGODB_PROJECTS);
  return MongooseModule.forRoot(process.env.URI_MONGODB_PROJECTS, {
    connectionName: Connection.projects.name,
  });
};

export const CONFIG_DATABASE_PRESENTATIONS = () => {
  console.log(process.env.URI_MONGODB_PRESENTATIONS);
  return MongooseModule.forRoot(process.env.URI_MONGODB_PRESENTATIONS, {
    connectionName: Connection.presentations.name,
  });
};

export const CONFIG_DATABASE_PERSONALS = () => {
  console.log(process.env.URI_MONGODB_PERSONALS);
  return MongooseModule.forRoot(process.env.URI_MONGODB_PERSONALS, {
    connectionName: Connection.personals.name,
  });
};

export const CONFIG_DATABASE_EXPERIENCES = () => {
  console.log(process.env.URI_MONGODB_EXPERIENCES);
  return MongooseModule.forRoot(process.env.URI_MONGODB_EXPERIENCES, {
    connectionName: Connection.experiences.name,
  });
};

export const CONFIG_DATABASE_EDUCATIONS = () => {
  console.log(process.env.URI_MONGODB_EDUCATIONS);
  return MongooseModule.forRoot(process.env.URI_MONGODB_EDUCATIONS, {
    connectionName: Connection.educations.name,
  });
};

export const CONFIG_DATABASE_CURRICULUMS = () => {
  console.log(process.env.URI_MONGODB_CURRICULUMS);
  return MongooseModule.forRoot(process.env.URI_MONGODB_CURRICULUMS, {
    connectionName: Connection.curriculums.name,
  });
};

export const CONFIG_DATABASE_COURSES = () => {
  console.log(process.env.URI_MONGODB_COURSES);
  return MongooseModule.forRoot(process.env.URI_MONGODB_COURSES, {
    connectionName: Connection.courses.name,
  });
};

export const CONFIG_DATABASE_CERTIFICATIONS = () => {
  console.log(process.env.URI_MONGODB_CERTIFICATIONS);
  return MongooseModule.forRoot(process.env.URI_MONGODB_CERTIFICATIONS, {
    connectionName: Connection.certifications.name,
  });
};
