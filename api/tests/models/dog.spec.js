const { Dog, Temperament, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {

      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
    // Test agregado
    describe('height', () => {

      it('should throw an error if height is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid height')))
          .catch(() => done());
      });

      it('should work when its a valid height', () => {
        Dog.create({ height: ['10','15'] });
      });
    });

    describe('weight', () => {

      it('should throw an error if weight is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid weight')))
          .catch(() => done());
      });

      it('should work when its a valid weight', () => {
        Dog.create({ weight: ['12','18'] });
      });
    });

    describe('life_span', () => {

      it('should throw an error if life_span is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid life_span')))
          .catch(() => done());
      });

      it('should work when its a valid life_span', () => {
        Dog.create({ life_span: '10 - 12 years' });
      });
    });

    describe('image', () => {

      it('should throw an error if image is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid image')))
          .catch(() => done());
      });

      it('should work when its a valid image', () => {
        Dog.create({ image: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg' });
      });
    });
  });
});

describe('Temperament model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Temperament.sync({ force: true }));
    describe('name', () => {

      it('should throw an error if name is null', (done) => {
        Temperament.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when its a valid name', () => {
        Temperament.create({ name: 'Clever' });
      });
    });
  });
});