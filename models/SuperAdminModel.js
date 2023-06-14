// panggil config buat sequelize nya
const { sequelize } = require('../config')
// import dari sequelize
const { DataTypes } = require('sequelize')

// bikin 1 class untuk logic2 buat ambil data dari db / insert data ke table db
class SuperAdminModel {
  // bikin variabel model yang untuk mendefinisikan table yang ada di db
  #model = sequelize.define('superAdmin', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'superAdmin',
    underscored: true,
    updatedAt: false
  })

  async insertData(username, password) {
    const insertedData = await this.#model.create({ username, password })
    return insertedData
  }

  async getData(username) {
    const data = await this.#model.findOne({
      where: {
        username
      },
      attributes: ['username', 'password', 'id'],
      raw: true
    })

    return data
  }

  // untuk passport
  async getDataByPk(superAdminId) {
    const data = await this.#model.findByPk(superAdminId, {
      attributes: ['username', 'password', 'id'],
      raw: true
    })

    return data
  }
}

// inisiasi model nya di sequelize dan bikin variabel baru
const superAdminModel = new SuperAdminModel()

// exports data SuperAdminModel yang sudah di inisiasi
module.exports = { superAdminModel }