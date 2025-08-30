import React from "react";
import './SimpleCard.sass'


type SimpleCardProps = {
    title: string,
    value: string
}
const SimpleCard: React.FC<SimpleCardProps> = ({ title, value }) => {
    return (
        <div className="simple-card">
            <h3 className="title">{title}</h3>
            <p className="value">{value}</p>
        </div>
    )
}

export default SimpleCard
