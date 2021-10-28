import React from "react";
import PropTypes from "prop-types";
import CollapseWrapper from "../common/collapse";

const ChildrenComponent = ({ children }) => {
    let i = 0;
    return React.Children.map(children, (child) => {
        const config = {
            ...child.props,
            value: `${i}. ${child.props.value}`
        };
        i++;
        return React.cloneElement(child, config);
    });
};

const ChildrenExercise = () => {
    React.Children.map();
    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                У вас есть компоненты Списка. Вам необходимо к каждому из них
                добавить порядковый номер, относительно того, как они
                располагаются на странице. Вы можете использовать как{" "}
                <code>React.Children.map</code> так и{" "}
                <code>React.Children.toArray</code>
            </p>
            <ChildrenComponent>
                <Component value="Компонент списка" />
                <Component value="Компонент списка" />
                <Component value="Компонент списка" />
            </ChildrenComponent>
        </CollapseWrapper>
    );
};

const Component = ({ value }) => {
    return <div>{value}</div>;
};

Component.propTypes = {
    value: PropTypes.string.isRequired
};

export default ChildrenExercise;
