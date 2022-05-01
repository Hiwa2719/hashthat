import React from "react";
import HashItem from './HashItem'


const HashTable = ({hashes}) => {
    if (!hashes) return <h1>You didn't save any hash</h1>
    return (
        <div className="hash-table">
            <table className="w-100">
                <thead>
                <tr className="text-center bg-success">
                    <th>Text</th>
                    <th>Hash</th>
                    <th>created date</th>
                </tr>
                </thead>
                <tbody>
                {
                    hashes.map((hash, index) => <HashItem key={index} hash={hash}/>)
                }
                </tbody>
            </table>
        </div>
    )
}


export default HashTable
