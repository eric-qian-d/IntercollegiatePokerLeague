const models = require("./");

module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    "Team",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      HURanking : {
        type: DataTypes.INTEGER,
        field: 'hu_ranking',
        defaultValue: 1200
      },
      captainId: {
        type: DataTypes.UUID,
      }
    },
    // Team.associate = models => {
    //   Team.hasMany(models.User);
    // },
    {
      tableName: 'teams',
    }
  )
  return Team;
}
