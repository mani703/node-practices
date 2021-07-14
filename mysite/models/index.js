const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    'webdb', 'webdb', 'webdb', {
        host: '192.168.80.117',
        port: 3307,
        dialect: 'mysql'
    }
);

const User = require('./User')(sequelize);
         
// User 객체와 테이블 sync를 맞춘다
User.sync({
    force: false,   // force: true - 테이블을 생성하고 이미 존재하는 경우 먼저 삭제합니다.
    alter: false    // alter: true - 테이블의 현재 상태(열이 있는 열, 데이터 유형이 무엇인지 등)를 확인한 다음 
                    //               테이블에서 필요한 변경을 수행하여 모델과 일치하도록 합니다.
});

module.exports = { User }