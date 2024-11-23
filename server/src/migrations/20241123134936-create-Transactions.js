'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('Transactions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        amount: {
          type: Sequelize.DECIMAL,
          allowNull: false,
        },
        operationType: {
          type: Sequelize.ENUM(['INCOME', 'EXPENSE']),
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addConstraint('Transactions', {
          fields: ['amount'],
          type: 'check',
          where: { amount: { [Sequelize.Op.gt]: 0 } },
        })
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  },
};
