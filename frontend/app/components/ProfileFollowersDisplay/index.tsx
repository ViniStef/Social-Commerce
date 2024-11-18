import style from "~/styles/style.module.scss";
import unfollow from "~/assets/images/person-x-fill.svg";
import {Form} from "@remix-run/react";

type ProfileFollowersDisplayProps = {
    profileImg: string;
    name: string;
}

export default function ProfileFollowersDisplay( {profileImg, name}: ProfileFollowersDisplayProps) {
    return (
        <li className={style.follows__item}>
            <div className={style.follows__user}>
                <img className={style.follows__image} src={profileImg} alt=""/>
                <div className={style.user__details}>
                    <p className={style.follows__name}>{name}</p>
                </div>

            </div>
            <Form method={"post"}>
                <button className={style.unfollow__button}><img className={style.unfollow__image}
                                                                src={unfollow} alt=""/></button>
            </Form>

            <div className={style.follows__split}></div>

        </li>
    )
}