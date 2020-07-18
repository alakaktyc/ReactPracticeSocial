import React from 'react';
import classes from './Post.module.css'

const Post = (props) => {
    return (
        <div className={classes.dialog}>
            {props.message}
            <div>
                <span>likes {props.likesCount}</span>
            </div>
        </div>
    )
}
export default Post