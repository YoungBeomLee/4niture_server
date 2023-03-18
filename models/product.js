module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define("Product", {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER(50),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(30),//integer로 수정할수도있음
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
    });
    return product;
  };
  