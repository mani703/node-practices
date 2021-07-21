const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql'
    }
);

const User = require('./User')(sequelize);
const Guestbook = require('./Guestbook')(sequelize);
const Gallery = require('./Gallery')(sequelize);
const Board = require('./Board')(sequelize);

User.hasMany(Board, {
    foreignKey: {
        name: 'userNo',
        allowNull: false,
        constraints: true,
        onDelete: 'CASCADE'
    }
});
Board.belongsTo(User);
         
// User 객체와 테이블 sync를 맞춘다
User.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true',      // force: true - 테이블을 생성하고 이미 존재하는 경우 먼저 삭제합니다.
    alter: process.env.TABLE_ALTER_SYNC === 'true'          // alter: true - 테이블의 현재 상태(열이 있는 열, 데이터 유형이 무엇인지 등)를 확인한 다음 
                                                            //               테이블에서 필요한 변경을 수행하여 모델과 일치하도록 합니다.
});
Guestbook.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true',
    alter: process.env.TABLE_ALTER_SYNC === 'true'
});
Gallery.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true',
    alter: process.env.TABLE_ALTER_SYNC === 'true'
});
Board.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true',
    alter: process.env.TABLE_ALTER_SYNC === 'true'
});

module.exports = { User, Guestbook, Gallery, Board }