import supertest from 'supertest'
import bcrypt from 'bcrypt'
import { App } from '..'
import { Conn } from '../database/database'
import { paths } from '../includes/UlConst'
import User from "../models/User"
import { getFields } from '../utils/UlSequelizeUtils'
import { TJSONObject } from "../utils/UlTypes"
import { initialUsers } from './UlHelper'
import { val2Number } from '../utils/UlParse'

const api = supertest(App.app)

beforeEach(async () => {
   try {
      // Eliminar todos los usuarios
      await User.destroy({ where: {} })

      // Insertar nuevos usuarios
      for (let initialUser of initialUsers) {
         // Encriptar contraseña
         initialUser["password"] = await bcrypt.hash(initialUser["password"], val2Number(process.env.SALT_ROUNDS))
         await User.create(initialUser, { fields: getFields(User.rawAttributes, ['id']) })
      }
   } catch (error) {
      console.error(error)
   }
})

describe('Create an unexisting user', () => {
   test('Works as expected creating a new user', async () => {
      const usersAtStart = await User.findAll({ where: {} })

      const newUser: TJSONObject = {
         name: 'Pedro',
         email: 'pedro@mail.me',
         password: '1234'
      }

      let response = await api.post(paths.users)
         .send(newUser)
         .expect(201)
         .expect("Content-Type", /application\/json/)

      let { body } = response.body

      expect(body.bcreado).toBeDefined()
      expect(body.bcreado).toBe(true)

      const usersAtEnd = await User.findAll({ where: {} })

      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
   })
})

// Ejecutar después de que se hayan ejecutado todos los tests
afterAll(() => {
   App.server.close()
   Conn.close()
})