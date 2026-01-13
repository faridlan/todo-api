import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

export function setupValidation(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.flatMap((error) =>
          Object.values(error.constraints ?? {}).map((message) => ({
            message,
          })),
        );

        return new BadRequestException({ errors: formattedErrors });
      },
    }),
  );
}
