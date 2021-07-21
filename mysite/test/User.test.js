const dotenv = require('dotenv');
const path = require('path');
const assert = require('assert').strict;

dotenv.config({path: path.join(path.resolve(__dirname, '..'), 'config/db.env')})

describe('Model User', function(){
    let models = null;

    before(async function(){
        models = require('../models');
    });

    it('Fetch User(no=10)', async function(){
        const user = await models.User.findOne({
            where: {
                no: 10
            }
        });
        assert.equal(user.no, 10);
    });

    after(async function(){
    });
})