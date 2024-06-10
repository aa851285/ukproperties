'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Properties');

    if (!table.thumbnail) {
      console.log('Adding column: thumbnail');
      await queryInterface.addColumn('Properties', 'thumbnail', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    } else {
      console.log('Column thumbnail already exists');
    }

    if (!table.gallery) {
      console.log('Adding column: gallery');
      await queryInterface.addColumn('Properties', 'gallery', {
        type: Sequelize.JSON,
        allowNull: true,
      });
    } else {
      console.log('Column gallery already exists');
    }
  },

  down: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Properties');

    if (table.thumbnail) {
      console.log('Removing column: thumbnail');
      await queryInterface.removeColumn('Properties', 'thumbnail');
    }

    if (table.gallery) {
      console.log('Removing column: gallery');
      await queryInterface.removeColumn('Properties', 'gallery');
    }
  }
};
