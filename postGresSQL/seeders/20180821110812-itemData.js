'use strict';

const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {

    let Data = JSON.parse(fs.readFileSync('data.json','utf8'))

    return queryInterface.bulkInsert('Data', Data, {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
