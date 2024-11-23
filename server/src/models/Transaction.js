module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transactions',
    {
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: true,
          isPositive(value) {
            if (value <= 0) {
              throw new Error('amiunt must be positive');
            }
          },
        },
      },
      operationType: {
        // TODO move to constants
        type: DataTypes.ENUM(['INCOME', 'EXPENSE']),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.Users, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Transaction;
};
