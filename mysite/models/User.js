const {Sequelize, DataTypes} = require('sequelize');

module.exports = function(sequelize){
     // User 객체
    return sequelize.define('User', {
        no: {   // 객체 속성 이름
            field: 'no',    // table 컬럼
            type: DataTypes.BIGINT(11),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            field: 'name',
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            field: 'email',
            type: DataTypes.STRING(200),
            allowNull: false
        },
        password: {
            field: 'password',
            type: DataTypes.STRING(45),
            allowNull: false
        },
        gender: {
            field: 'gender',
            type: DataTypes.ENUM(['female', 'male']),
            allowNull: false
        },
        role: {
            field: 'role',
            type: DataTypes.ENUM(['USER', 'ADMIN']),
            allowNull: true,
            defaultValue: 'USER'
        }
    }, {
        underscored: true,
        freezeTableName: true,
        timestamp: true,
        createAt: false,
        updateAt: false,
        tablename: 'user'
    });
}



