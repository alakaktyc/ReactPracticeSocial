const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Alex'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Oleh'},
        {id: 4, name: 'Sasnka'},
        {id: 5, name: 'Viktor'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'MotherFucker'},
        {id: 3, message: 'Hello'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Sho'}
    ],
    newMessageBody: ''
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messages.push({id: 5, message: body});
            return state;
        default:
            return state;
    }
};

export const sendMessageCreator = () => ({type: SEND_MESSAGE});
export const updateNewMessageBodyCreator = (body) =>
    ({type: UPDATE_NEW_MESSAGE_BODY, body: body});

export default dialogsReducer;