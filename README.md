<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

### Arquitectura hexaginal - Aplicación de gestión de datos para hoja de vida simple

Esta aplicación es un ejemplo de un sistema de gestión de datos para tu hoja de vida que sigue la arquitectura hexagonal. La aplicación permite crear, leer, actualizar y eliminar registros, así como conectarse a multiples bases de datos y ejemplos de repositorio con mongo, mysql y postgres.


### Arquitectura hexagonal
La arquitectura hexagonal, también conocida como Ports and Adapters, es un patrón de diseño que busca mantener una separación clara de las responsabilidades en una aplicación, facilitando la adaptabilidad, escalabilidad y mantenibilidad del software. La arquitectura se organiza en tres capas principales:

Dominio: Esta capa contiene las entidades del dominio, que representan los conceptos clave del negocio y sus relaciones, así como la lógica de negocio asociada. Estas entidades son independientes de la infraestructura y la implementación, lo que permite centrarse en las reglas y restricciones del negocio.

Aplicación: Esta capa contiene los casos de uso, que representan las acciones o funcionalidades que la aplicación puede realizar. Los casos de uso coordinan la comunicación entre los puertos de entrada (interfaces que representan las acciones que se pueden realizar desde el exterior) y los puertos de salida (interfaces que representan las acciones que la aplicación puede realizar hacia el exterior, como interactuar con bases de datos o servicios externos).

Infraestructura: Esta capa contiene los adaptadores y la implementación de los puertos de salida, así como la configuración y la interacción con servicios externos. Los adaptadores son responsables de convertir las solicitudes externas en llamadas a los casos de uso y de convertir las respuestas de los casos de uso en respuestas comprensibles para los sistemas externos.

La arquitectura hexagonal se adhiere a los principios SOLID:

1. Single Responsibility Principle (SRP): Cada capa tiene una responsabilidad única y bien definida, lo que evita la mezcla de responsabilidades y facilita el mantenimiento del código.

2. Open/Closed Principle (OCP): Las entidades y los casos de uso están abiertos a la extensión pero cerrados a la modificación. Si se necesita agregar una nueva funcionalidad, se puede hacer extendiendo los casos de uso o creando nuevos adaptadores sin modificar el código existente.

3. Liskov Substitution Principle (LSP): Los adaptadores y las implementaciones de los puertos deben ser sustituibles sin afectar el comportamiento del sistema, lo que permite cambiar fácilmente entre diferentes implementaciones de infraestructura o servicios externos.

4. Interface Segregation Principle (ISP): Los puertos de entrada y salida definen interfaces pequeñas y específicas para cada funcionalidad, lo que facilita la implementación de adaptadores y evita depender de interfaces innecesariamente grandes.

5. Dependency Inversion Principle (DIP): Las dependencias entre las capas se invierten mediante la inyección de dependencias, lo que permite a las capas de dominio y aplicación depender de abstracciones en lugar de implementaciones concretas.

Recurso extraido de : https://github.com/DanielEspanadero/arquitectura-hexagonal-java/blob/main/README.md

## Base de datos
si necesitas montar una base de datos en docker aqui puedes encontrar un ejemplo: https://github.com/Julianrios84/databases-docker

## Docker
```bash
$ docker compose up --build -d
```

## Instalación 

```bash
$ yarn install
```

## Variables de entorno

```bash
$ mv .env.example .env
```

## Correr la aplicación

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
