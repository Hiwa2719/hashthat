import React from "react";

const HashItem = ({hash})=> {
    return (
        <tr>
            <td className="border-1">{hash.text}</td>
            <td className="border-1">{hash.hash}</td>
            <td className="border-1">{hash.created_date}</td>
        </tr>
    )
}

export default HashItem
