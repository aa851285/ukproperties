module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('Property', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('sell', 'let'),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gallery: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    });
  
    return Property;
  };
  