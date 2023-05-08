import React from "react";
import ButtonScreen from "../fullScreenButton";

interface TitleDefault {
    title: any;
}

const Title = (props: TitleDefault) => {
    const { title } = props;
    return (
        <div className="dash-title">
            <span style={{ marginTop: 10, marginBottom: 10, fontSize: 18 }}>{title}</span>
            {/* <ButtonScreen /> */}
        </div>
    );
};

export default Title;
