module.exports = (sequelize, Sequelize) => {
  const Ekey = sequelize.define("ekey", {
    ekeyID: {
      type: Sequelize.STRING
    },
    besitzer: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    berechtigung: {
      type: Sequelize.STRING
    },
    notiz: {
      type: Sequelize.STRING
    }
  });

  return Ekey;
};
