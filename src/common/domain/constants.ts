export const Connection = {
  auth: {
    name: 'DB_AUTH',
    database: 'resume_users',
    collection: 'auth'
  },
  user: {
    name: 'DB_USER',
    database: 'resume_users',
    collection: 'users',
  },
  personal: {
    name: 'DB_PERSONAL',
    database: 'resume_personals',
    collection: 'personals',
  },
  education: {
    name: 'DB_EDUCATION',
    database: 'resume_educations',
    collection: 'educations',
  },
  experience: {
    name: 'DB_EXPERIENCE',
    database: 'resume_experiences',
    collection: 'experiences',
  },
  skill: {
    name: 'DB_SKILL',
    database: 'resume_skills',
    collection: 'skills',
  },
  certification: {
    name: 'DB_CERTIFICATION',
    database: 'resume_certifications',
    collection: 'certifications',
  },
  course: {
    name: 'DB_COURSE',
    database: 'resume_courses',
    collection: 'courses',
  },
  project: {
    name: 'DB_PROJECT',
    database: 'resume_projects',
    collection: 'projects',
  },
  presentation: {
    name: 'DB_PRESENTATION',
    database: 'resume_presentations',
    collection: 'presentations',
  },
  curriculum: {
    name: 'DB_CURRICULUM',
    database: 'resume_principal',
    collection: 'curriculums',
  },
};


/* MYSQL */ 

/*
CREATE USER 'newuser'@'%' IDENTIFIED BY 'password';
CREATE DATABASE basededatos;  
GRANT ALL PRIVILEGES ON `basededatos` . * TO 'newuser'@'%';
FLUSH PRIVILEGES;
*/

/*
CREATE DATABASE curriculum_users CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE DATABASE curriculum_skills CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE DATABASE curriculum_projects CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE DATABASE curriculum_presentations CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE DATABASE curriculum_personals CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE DATABASE curriculum_experiences CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE DATABASE curriculum_educations CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE DATABASE curriculum_principal CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE DATABASE curriculum_courses CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE DATABASE curriculum_certifications CHARACTER SET utf8 COLLATE utf8_general_ci;

*/ 

/* POSTGRES  */

/* 
  CREATE USER example_user WITH PASSWORD 'user_12345'; 
  GRANT ALL PRIVILEGES ON DATABASE "example_db" to example_user;
*/

/*
CREATE DATABASE curriculum_users  ENCODING 'utf-8';
CREATE DATABASE curriculum_skills  ENCODING 'utf-8';
CREATE DATABASE curriculum_projects  ENCODING 'utf-8';
CREATE DATABASE curriculum_presentations  ENCODING 'utf-8';
CREATE DATABASE curriculum_personals  ENCODING 'utf-8';
CREATE DATABASE curriculum_experiences  ENCODING 'utf-8';
CREATE DATABASE curriculum_educations  ENCODING 'utf-8';
CREATE DATABASE curriculum_principal  ENCODING 'utf-8';
CREATE DATABASE curriculum_courses  ENCODING 'utf-8';
CREATE DATABASE curriculum_certifications  ENCODING 'utf-8';

*/