const { execute_sql } = require('./f3-database');
const { getPostedValue, getSlackValues, getSlackValue } = require('./helper-functions');

const getLocations = async() => {
  return execute_sql("SELECT a.channel_id, a.ao FROM aos a WHERE backblast = 1 ORDER BY a.ao");
};

const commandBackblast = async ({ ack, client, payload, body }) => {
  try {

    console.log('Got command backblast');

    await ack();

    //Generate select options for each location
    var locations = await getLocations();

    console.log('Body = ' + JSON.stringify(body));

    var ao_options = [];
    for (let i = 0; i < locations.length; i++) {
      let loc_name = locations[i].ao.replace('_', ' ');

      ao_options.push(
        {
            "text": {
                "type": "plain_text",
                "text": loc_name,
                "emoji": true
            },
            "value": locations[i].channel_id
        }
      );
    }

    //Default for date picker (today's date)
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let today_date = yyyy + '-' + mm + '-' + dd;
    let user_id = body.user_id;

    console.log('Client = ' + JSON.stringify(client));

    await client.views.open(
      {
        trigger_id: payload.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'command_backblast_callback',
          title: {
            type: 'plain_text',
            text: 'Create a Backblast',
          },
          submit: {
            type: 'plain_text',
            text: 'Submit',
          },
          blocks: [
            {
              "type": "input",
              "block_id": "title",
              "element": {
                "type": "plain_text_input",
                "action_id": "title",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Snarky Title?"
                }
              },
              "label": {
                "type": "plain_text",
                "text": "Title"
              }
            },
            {
              "type": "input",
              "block_id": "the_ao",
              "element": {
                "type": "static_select",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Select the AO"
                },
                "action_id": "channels_select-action",
                "options": ao_options
              },
              "label": {
                "type": "plain_text",
                "text": "The AO"
              }
            },
            {
              "type": "input",
              "block_id": "date",
              "element": {
                "type": "datepicker",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Select a date"
                },
                "action_id": "datepicker-action",
                "initial_date": today_date
              },
              "label": {
                "type": "plain_text",
                "text": "Workout Date"
              }
            },
            {
              "type": "input",
              "block_id": "the_q",
              "element": {
                "type": "users_select",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Tag the Q"
                },
                "initial_user": user_id,
                "action_id": "users_select-action"
              },
              "label": {
                "type": "plain_text",
                "text": "The Q"
              }
            },
            {
              "type": "input",
              "block_id": "the_pax",
              "element": {
                "type": "multi_users_select",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Tag the PAX"
                },
                "action_id": "multi_users_select-action"
              },
              "label": {
                "type": "plain_text",
                "text": "The PAX"
              }
            },
            {
              "type": "input",
              "block_id": "fngs",
              "element": {
                "type": "plain_text_input",
                "action_id": "fng-action",
                "initial_value": "None",
                "placeholder": {
                  "type": "plain_text",
                  "text": "FNGs"
                }
              },
              "label": {
                "type": "plain_text",
                "text": "List untaggable names separated by commas (FNGs, Willy Lomans, etc.)"
              }
            },
            {
              "type": "input",
              "block_id": "count",
              "element": {
                "type": "plain_text_input",
                "action_id": "count-action",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Total PAX count including FNGs"
                }
              },
              "label": {
                "type": "plain_text",
                "text": "Count"
              }
            },
            {
              "type": "input",
              "block_id": "conditions",
              "element": {
                "type": "plain_text_input",
                "action_id": "plain_text_conditions-action",
                "initial_value": "Gloomy",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Weather conditions"
                }
              },
              "label": {
                "type": "plain_text",
                "text": "Conditions",
                "emoji": true
              }
            },
            {
              "type": "input",
              "block_id": "thang",
              "element": {
                "type": "plain_text_input",
                "multiline": true,
                "action_id": "plain_text_input-action",
                "initial_value": "COP: \nTHE THANG: \nCOT:",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Tell us what happened\n\n"
                }
              },
              "label": {
                "type": "plain_text",
                "text": "Thang"
              }
            },
          ]
        },
    });
    
  } catch (error) {
    console.log('Command error found!');
    console.error(error);
  }
};

//Create the object
const getPost = function (body, payload) {
  
  console.log('Posted Form!');
  const user_id = body['user']['id'];

  const the_title = getPostedValue(payload, 'title', 'title');

  const location_id = getPostedValue(payload, 'the_ao', 'channels_select-action');
  console.log('Location = ' + location_id);

  const the_date = getPostedValue(payload, 'date', 'datepicker-action');
  console.log('Date = ' + the_date);

  const the_q = getPostedValue(payload, 'the_q', 'users_select-action');
  console.log('Q = ' + the_q);

  const the_pax_list = getPostedValue(payload, 'the_pax', 'multi_users_select-action');
  console.log('Pax = ' + the_pax_list);

  const the_fngs = getPostedValue(payload, 'fngs', 'fng-action');
  console.log('FNGs = ' + the_fngs);

  const the_count = getPostedValue(payload, 'count', 'count-action');
  console.log('Count = ' + the_count);

  const the_conditions = getPostedValue(payload, 'conditions', 'plain_text_conditions-action');
  console.log('Conditions = ' + the_conditions);

  const the_thang = getPostedValue(payload, 'thang', 'plain_text_input-action');
  console.log('Thang = ' + the_thang);
  
  const text_to_post = 'BACKBLAST! ' + the_title + '\n' +
    'Date: ' + the_date + '\n' +
    'AO: <#' + location_id + '>\n' +
    'Q: ' + getSlackValue(the_q) + '\n' +
    'PAX: ' + getSlackValues(the_pax_list) + '\n' +
    'FNG: ' + the_fngs + '\n' +
    'Total: ' + the_count + '\n' +
    'Conditions: ' + the_conditions + '\n' +
    'The Thang: \n' +
    the_thang;
  
  const post_object = {
    channel: 'C02B2AZ0JKZ',
    text: text_to_post,
  };
  return post_object;

}

const postToBackblast = async ({ ack, client, body, payload }) => {
  console.log('Posting to backblast...');
  try {
    await ack();

    const the_post = getPost(body, payload);
    const result = await client.chat.postMessage(the_post);
  
  } catch (error) {
    console.error(error);
  }
}; 

module.exports = { commandBackblast, postToBackblast }; 