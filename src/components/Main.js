import React from "react";
import Card from "./Card";


function Main(props) {

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__wrap">
                    <div onClick={props.onEditAvatar} className="profile__avatar" style={{backgroundImage: `url(${props.userAvatar})`}}>
                        <button className="profile__avatar-edit-btn"/>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{props.userName}</h1>
                        <button onClick={props.onEditProfile} className="button profile__button-edit" type="button"
                                aria-label="редактировать"/>
                        <p className="profile__job">{props.userDescription}</p>
                    </div>
                </div>
                <button onClick={props.onAddPlace} className="button profile__button-add" type="button"
                        aria-label="добавить"/>
            </section>
            <section className="cards">
                <ul className="cards__items">
                    {props.cards.map((card) => (
                        <Card
                            card={card}
                            onCardClick={props.onCardClick}/>
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main
