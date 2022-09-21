import React from "react";
import NumberFormat from "react-number-format";

export const FormatNumber = ({value, prefix, suffix}) => {
    return <NumberFormat
        value={value ?? 0}
        prefix={prefix}
        suffix={suffix}
        decimalSeparator={"."}
        displayType={"text"}
        thousandSeparator={","}
        renderText={(value) => <div>{value}</div>}
    />
}