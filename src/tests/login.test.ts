import supertest from "supertest";
import { App } from "..";
import { Conn } from "../database/database";
import { paths } from "../includes/UlConst";
import { TJSONObject } from "../utils/UlTypes";

const api = supertest(App.app)

describe('The token is given to the user with correct credentials', () => {
   test('Works as expected giving the token', async () => {
      let userInfo: TJSONObject = {
         email: 'Pedro@mail.me',
         password: '1234'
      }

      const response = await api.post(paths.login)
         .send(userInfo)
         .expect(200)
         .expect("Content-Type", /application\/json/)

      let body = response.body.body

      expect(body.token).toBeDefined()
      expect(typeof body.token).toBe('string')


   })
})

// Ejecutar después de que se hayan ejecutado todos los tests
afterAll(() => {
   App.server.close()
   Conn.close()
})