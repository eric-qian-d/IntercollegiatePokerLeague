module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define(
    "School",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        field: "name"
      },
      domain: {
        unique: true,
        type: DataTypes.STRING,
        set(val) {
          this.setDataValue('domain', val ? val.toLowerCase() : val);
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
    },
    {
      tableName: 'schools',
    }

  )
  return School;
}
