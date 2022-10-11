//Determines the value posted for a given id -> action
const getPostedValue = function (payload, id, action) {

    try {
        const state_value = payload['state']['values'][id][action];
        const value_type = state_value['type'];

        switch (value_type) {
            case 'static_select':
            return state_value['selected_option']['value'];
            case 'datepicker':
            return state_value['selected_date'];
            case 'users_select':
            return state_value['selected_user'];
            case 'multi_users_select':
            return state_value['selected_users'];
            case 'plain_text_input':
            return state_value['value'];
            default:
            return '';
        }
    } catch (e) {
        return '';
    }
}

//Gets a list of Slack values for mentions
//Defaults to "," for seperator
const getSlackValues = function (id_list) {

    var list = [];
    for (let i = 0; i < id_list.length; i++) {
        list.push('<@' + id_list[i] + '>');
    }

    return list.join(',');
}

const getSlackValue = function (id) {
    const id_list = [
        id
    ];
    return getSlackValues(id_list);
}

//Globally available functionality
module.exports = { getPostedValue, getSlackValues, getSlackValue };