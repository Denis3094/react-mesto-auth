import React from "react";
import Card from "./Card";
import api from "../utils/api";


function Main(props) {

    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getProfile(), api.getInitialCards()])
            .then(([info, cards]) => {
                setUserName(info.name)
                setUserDescription(info.about)
                setUserAvatar(info.avatar)
                setCards(cards)
            })
            .catch(err => {
                console.log(err)
            });
    }, [])

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__wrap">
                    <div onClick={props.onEditAvatar} className="profile__avatar"
                         style={{backgroundImage: `url(${userAvatar})`}}>
                        <button className="profile__avatar-edit-btn"/>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{userName}</h1>
                        <button onClick={props.onEditProfile} className="button profile__button-edit" type="button"
                                aria-label="редактировать"/>
                        <p className="profile__job">{userDescription}</p>
                    </div>
                </div>
                <button onClick={props.onAddPlace} className="button profile__button-add" type="button"
                        aria-label="добавить"/>
            </section>
            <section className="cards">
                <ul className="cards__items">
                    {cards.map(card => (
                        <Card
                            card={card}
                            onCardClick={props.onCardClick}
                            key={card._id}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main
