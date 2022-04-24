function Animal(props) {
    // Получаем текущий час на часах
    const hours = new Date().getHours()
    console.log(props.isNocturnal !== 'false')
    // Проверяем, ночь ли сейчас
    const isNight = hours > 22 || hours < 6;
    // В зависимости от времени суток разные животные либо спят, либо бодрствуют
    const isSleeping = (isNight && !(props.isNocturnal !== 'false')) || (!isNight && (props.isNocturnal !== 'false'));

    return (
        <div className="animal">
            <div className="icon">{isSleeping ? '💤' : props.icon}</div>
            <div className="info">
                <h3>{props.name}</h3>
                <span>Рост: {props.height}</span>
            </div>
        </div>
    );
}

ReactDOM.render((
    <>
        <h2>Африка</h2>
        <Animal icon="🦒" name="Жираф" height="4 метра" isNocturnal={false} />
        <Animal icon="🦔" name="Ёж" height="15 сантиметров" isNocturnal={true}/>
        <Animal icon="🦨" name="Скунс" height="никто не мерял" isNocturnal={true}/>
    </>
), document.querySelector('#root'));
