const Sequelize = require('sequelize');

// const db = new Sequelize('postgres://localhost:5432/wikistack');

const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    status: {
        type: Sequelize.ENUM('open', 'closed')
      }
});

Page.beforeValidate((page) => {
    let title = page.title;

    if (!page.slug) {
        page.slug = title.replace(/\s+/g, '_').replace(/\W/g, '').toLowerCase();
    }
})

const User = db.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
        isEmail: true,
        allowNull: false
      }
  });

Page.belongsTo(User, {as: 'author'});

module.exports = {
    db, Page, User
  };