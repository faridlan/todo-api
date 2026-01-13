/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestModule } from './test.module';
import { TestService } from './test.service';
import { WebErrorResponse, WebSuccessResponse } from './helpers/response';
import { TodoResponse } from './helpers/todo-response';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { setupValidation } from 'src/common/pipes/global-validation.pipe';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

describe('Todo API (E2E)', () => {
  let app: INestApplication;
  let testService: TestService;
  let logger: Logger;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalFilters(new HttpExceptionFilter());
    setupValidation(app);

    await app.init();

    testService = app.get(TestService);
    logger = app.get(WINSTON_MODULE_PROVIDER);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /api/todos', () => {
    beforeEach(async () => {
      await testService.deleteTodo();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/todos')
        .send({ title: '' });

      const body = response.body as WebErrorResponse;

      expect(response.status).toBe(400);
      expect(body.errors).toBeDefined();
    });

    it('should create a new todo', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/todos')
        .send({
          title: 'New Todo',
          description: 'New Description',
        });

      const body = response.body as WebSuccessResponse<TodoResponse>;

      logger.info(body);

      expect(response.status).toBe(200);
      expect(body.data.id).toBeDefined();
      expect(body.data.title).toBe('New Todo');
      expect(body.data.completed).toBe(false);
      expect(body.data.createdAt).toBeDefined();
      expect(body.data.updatedAt).toBeDefined();
    });
  });

  describe('GET /api/todos', () => {
    beforeEach(async () => {
      await testService.deleteTodo();
      await testService.createTodo();
    });

    it('should get all todos', async () => {
      const response = await request(app.getHttpServer()).get('/api/todos');

      const body = response.body as WebSuccessResponse<TodoResponse[]>;

      logger.info(body);

      expect(response.status).toBe(200);
      expect(body.data.length).toBeGreaterThan(0);
      expect(body.data[0].id).toBeDefined();
      expect(body.data[0].completed).toBeDefined();
      expect(body.data[0].createdAt).toBeDefined();
      expect(body.data[0].updatedAt).toBeDefined();
    });
  });

  describe('PATCH /api/todos/:todoId', () => {
    beforeEach(async () => {
      await testService.deleteTodo();
      await testService.createTodo();
    });

    it('should be rejected if request is invalid', async () => {
      const todo = await testService.getTodo();

      const response = await request(app.getHttpServer())
        .patch(`/api/todos/${todo?.id}`)
        .send({
          title: '',
          description: '',
          completed: '',
        });

      const body = response.body as WebErrorResponse;

      expect(response.status).toBe(400);
      expect(body.errors).toBeDefined();
    });

    it('should be rejected if todo is not found', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/todos/invalid-id')
        .send({
          title: 'New Todo',
          completed: true,
        });

      const body = response.body as WebErrorResponse;

      logger.info(body);

      expect(response.status).toBe(404);
      expect(body.errors).toBeDefined();
    });

    it('should update todo', async () => {
      const todo = await testService.getTodo();

      const response = await request(app.getHttpServer())
        .patch(`/api/todos/${todo?.id}`)
        .send({
          title: 'New Todo',
          description: 'New Description Update',
          completed: true,
        });

      const body = response.body as WebSuccessResponse<TodoResponse>;

      logger.info(body);

      expect(response.status).toBe(200);
      expect(body.data.completed).toBe(true);
      expect(body.data.updatedAt).toBeDefined();
    });
  });

  describe('DELETE /api/todos/:todoId', () => {
    beforeEach(async () => {
      await testService.deleteTodo();
      await testService.createTodo();
    });

    it('should delete todo', async () => {
      const todo = await testService.getTodo();

      const response = await request(app.getHttpServer()).delete(
        `/api/todos/${todo?.id}`,
      );

      const body = response.body as WebSuccessResponse<boolean>;

      expect(response.status).toBe(200);
      expect(body.data).toBe(true);
    });

    it('should be rejected if todo is not found', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/api/todos/8f2e5140-7a89-4360-9ef8-b7c38f152f66',
      );

      const body = response.body as WebErrorResponse;

      expect(response.status).toBe(404);
      expect(body.errors).toBeDefined();
    });
  });
});
