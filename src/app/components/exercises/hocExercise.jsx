import React, { useState } from "react";
import PropTypes from "prop-types";
import CollapseWrapper from "../common/collapse";
import Card from "../common/Card";

const SimpleComponent = ({ onLogin, onLogOut, isAuth }) => isAuth ? (
    <button className="btn btn-primary m-2" onClick={onLogOut}>
        Выйти из системы
    </button>
    ) : (
    <button className="btn btn-primary m-2" onClick={onLogin}>
        Войти
    </button>
);

SimpleComponent.defaultProps = {
    isAuth: false
};

SimpleComponent.propTypes = {
    onLogin: PropTypes.func.isRequired,
    onLogOut: PropTypes.func.isRequired,
    isAuth: PropTypes.bool
};

const modifiedHOC = (Component) => () => {
    const [, setIsAuth] = useState(false);
    const isAuth = JSON.parse(localStorage.getItem("user"));

    const onLogin = () => {
        localStorage.setItem("user", JSON.stringify(true));
        setIsAuth(true);
    };
    const onLogOut = () => {
        localStorage.setItem("user", JSON.stringify(false));
        setIsAuth(false);
    };

    return (
        <>
            <Card><Component {...{ isAuth, onLogin, onLogOut }} /></Card>
        </>
    );
};

const HocExercise = () => {
    const ModifiedSimpleComponent = modifiedHOC(SimpleComponent);

    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                Вам необходимо реализовать компонент{" "}
                <code>SimpleComponent</code>, который:
            </p>
            <ul>
                <li>
                    Имеет параметры:<code>onLogin</code>, <code>onLogOut</code>,{" "}
                    <code>isAuth</code>
                </li>
                <li>
                    Отображайте кнопку <code>Войти</code>, если пользователь НЕ
                    авторизован.
                </li>
                <li>
                    Отображает кнопку с содержанием{" "}
                    <code>Выйти из системы</code>, если пользователь
                    авторизован.
                </li>
                <li>
                    При нажатии на кнопки вызываются методы <code>onLogin</code>{" "}
                    и <code>onLogOut</code>
                </li>
            </ul>
            <p className="mt-3">
                Вам необходимо <code>HOC</code>, который модицифицует компонент{" "}
                <code>SimpleComponent</code> следующим образом:
            </p>
            <ul>
                <li>
                    Добавляет обертку в виде карточки boostrap (использовать
                    существующий HOC)
                </li>
                <li>
                    Передает параметр <code>isAuth</code>, который является
                    результатом проверки наличия записи с названием{" "}
                    <code>user</code> в <code>localStorage</code>
                </li>
                <li>
                    Передает параметр <code>onLogin</code> и{" "}
                    <code>onLogOut</code> для управления записью с названием{" "}
                    <code>user</code> в <code>localStorage</code>
                </li>
            </ul>

            <ModifiedSimpleComponent />
        </CollapseWrapper>
    );
};

export default HocExercise;
