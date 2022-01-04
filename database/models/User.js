module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        first_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
  
        gender: {
            type: dataTypes.STRING,
            allowNull: false
        },
        date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        // create_at: {
        //     type: dataTypes.DATE,
        // },
        // update_at: {
        //     type: dataTypes.DATE,
        // }
        // category_id: {
        //     type: dataTypes.DECIMAL(3,1),
        //     allowNull: false
        // },
        image: {
             type: dataTypes.STRING,
             allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    

    // Category.associate = function (models) {
    //     Category.belongsToMany(models.Category, { // models.Movie -> Movies es el valor de alias en movie.js
    //         as: "category",
    //         through: 'category_user',
    //         foreignKey: 'category_id',
    //         otherKey: 'user_id',
    //         timestamps: false
    //     })
    //}

    const User = sequelize.define(alias, cols, config)

    return User
};