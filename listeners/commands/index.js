const { commandBackblast, postToBackblast } = require('./command-backblast');

module.exports.register = (app) => {
  console.log('Calling command.');
  app.command('/backblast', commandBackblast);
  app.view({ callback_id: 'command_backblast_callback' }, postToBackblast);
};