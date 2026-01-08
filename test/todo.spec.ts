/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let logger: Logger;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('POST /api/todos', () => {
    beforeEach(async () => {
      await testService.deleteTodo();
    });
    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/todos')
        .send({ title: '' });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should create a new todo', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/todos')
        .send({ title: 'New Todo' });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.title).toBe('New Todo');
      expect(response.body.data.completed).toBe(false);
      expect(response.body.data.createdAt).toBeDefined();
      expect(response.body.data.updatedAt).toBeDefined();
    });
  });

  describe('GET /api/todos', () => {
    beforeEach(async () => {
      await testService.deleteTodo();
      await testService.createTodo();
    });

    it('should get all todos', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/todos')
        .send({ title: 'New Todo' });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data[0].id).toBeDefined();
      expect(response.body.data[0].completed).toBeDefined();
      expect(response.body.data[0].createdAt).toBeDefined();
      expect(response.body.data[0].updatedAt).toBeDefined();
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
          completed: '',
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if todo is not found', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/api/todos/salah`)
        .send({
          title: 'New Todo',
          completed: true,
        });

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able update todo', async () => {
      const todo = await testService.getTodo();
      const response = await request(app.getHttpServer())
        .patch(`/api/todos/${todo?.id}`)
        .send({
          title: 'New Todo',
          completed: true,
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.title).toBe('New Todo');
      expect(response.body.data.completed).toBe(true);
      expect(response.body.data.createdAt).toBeDefined();
      expect(response.body.data.updatedAt).toBeDefined();
    });
  });

  describe('DELETE /api/todos/:todoId', () => {
    beforeEach(async () => {
      await testService.deleteTodo();
      await testService.createTodo();
    });
    it('should be able deleting todo', async () => {
      const todo = await testService.getTodo();
      const response = await request(app.getHttpServer()).delete(
        `/api/todos/${todo?.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);
    });

    it('should be rejected if todo is not found', async () => {
      const response = await request(app.getHttpServer()).delete(
        `/api/todos/8f2e5140-7a89-4360-9ef8-b7c38f152f66`,
      );

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });
  });
});
