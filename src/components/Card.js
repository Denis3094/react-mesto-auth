import React from "react";

function Card(props) {

    const handleClick = () => {
        props.onCardClick(props.card);
    }

    return (
        <li className="cards__item" id={props.card._id}>
            <button className="button cards__button-remove" type="button" aria-label="удалить"/>
            <img onClick={handleClick} className="cards__img" src={props.card.link} alt={props.card.name}/>
            <div className="cards__desc">
                <h2 className="cards__title">{props.card.name}</h2>
                <div className="like-wrapper">
                    <button className="button cards__button-like" type="button" aria-label="нравится"/>
                    <span className="cards__like-count">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
)
}

export default Card