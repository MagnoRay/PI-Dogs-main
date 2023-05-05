/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const request = require('supertest');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  id: '9bdf37a5-68e6-44fe-84e9-390ce21ec725',
  name: 'Pug',
  height: ['10','15'],
  weight: ['15','20'],
  life_span: '10 - 12 years',
  image: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg'
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});

// Test Agregado

describe('Test de rutas dogs', ()=>{

  describe('POST /newdog', ()=>{
    it('debe devolver el estado 400 y el texto correspondiente si alguno de los parámetros obligatorios no se envía', async()=>{
      const res = await request(app).post('/newdog');
      expect(res.statusCode).to.equals(400);
      expect(res.text).to.equals('Completar todos los campos');
    });
    it('debe devolver 200 si guarda correctamento el dog', ()=>{
     agent.post('/newdog').expect(200);
    });
  });
  
  describe('GET /temp', ()=>{
    it('se espera una respuesta 200 al obtener los temperamentos', ()=>{
      agent.get('/temp').expect(200)
    });
  });
  
  describe('GET /dogs/:idRace', ()=>{
    it('se espera una respuesta 200 si se pasa un id', ()=>{
      agent.get('/dogs/9bdf37a5-68e6-44fe-84e9-390ce21ec725').expect(200)
    });
  });

})