module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        product_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        product_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        category: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        color: {
            type: dataTypes.STRING,
            allowNull: false
        },
        size: {
            type: dataTypes.STRING,
            allowNull: false
        },
        image: {
             type: dataTypes.STRING,
             allowNull: false
        },
    };
    let config = {
        tableName: 'products',
        timestamps: false,
    }
    // const Actor = sequelize.define(alias, cols, config); 

    // Actor.associate = function (models) {
    //     Actor.belongsToMany(models.Movie, { // models.Movie -> Movies es el valor de alias en movie.js
    //         as: "movies",
    //         through: 'actor_movie',
    //         foreignKey: 'actor_id',
    //         otherKey: 'movie_id',
    //         timestamps: false
    //     })
    // }
    const Product = sequelize.define(alias, cols, config)
    
    return Product
};