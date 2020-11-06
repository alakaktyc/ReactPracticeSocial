import React from 'react'
import userPhoto from '../../assets/images/ava.png'
import classes from './Users.module.css'
import {NavLink} from "react-router-dom";
import * as axios from "axios/index";

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map(page => {
                    return <span className={props.currentPage === page && classes.selectedPage}
                                 onClick={() => {
                                     props.onPageChanged(page)
                                 }}
                    >{page}</span>
                })}

            </div>
            {
                props.users.map(user => <div key={user.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                                <img className={classes.userPhoto}
                                     src={user.photos.small !== null
                                         ? user.photos.small
                                         : userPhoto}/>
                            </NavLink>

                        </div>
                        <div>
                            {user.followed
                                ? <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                    props.toggleFollowingProgress(true, user.id);
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                                        {
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": "474cf373-eda8-4883-8f1f-6bfd5e4b1d3f"
                                            }

                                        })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.unfollow(user.id);
                                            }
                                            props.toggleFollowingProgress(false, user.id);
                                        });


                                }}>unfollow</button>

                                : <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                    props.toggleFollowingProgress(true, user.id);
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {},
                                        {
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": "474cf373-eda8-4883-8f1f-6bfd5e4b1d3f"
                                            }

                                        })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.follow(user.id)
                                            }
                                            props.toggleFollowingProgress(false, user.id);
                                        });
                                }}>follow</button>}

                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{'user.location.country'}</div>
                            <div>{'user.location.city'}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

export default Users