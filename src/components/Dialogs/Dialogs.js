import React from 'react'
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {


    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map((d) => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = state.messages.map((m) => <Message message={m.message}/>);
    let newMessageBody = state.newMessageBody;

    let onSendMessageClick = () => {
        props.sendMessage();
        //props.store.dispatch(sendMessageCreator())
    }

    let onNewMessageSend = (event) => {
        let body = event.target.value;
        props.updateNewMessageBody(body);
        //props.store.dispatch(updateNewMessageBodyCreator(body))
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <textarea
                            value={ newMessageBody }
                            onChange={ onNewMessageSend }
                            placeholder='enter your message'>
                        </textarea>
                    </div>
                    <div><button onClick={ onSendMessageClick }>send</button></div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs