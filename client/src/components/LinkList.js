import React from "react";
import {Link} from "react-router-dom";

export const LinkList = ({links}) => {
    if (!links.length) {
        return (
            <p className={'center'}>There are not any links</p>
        )
    }
    return (
        <table>
            <thead>
            <tr>
                <th>N</th>
                <th>Original link</th>
                <th>Short link</th>
                <th>Go...</th>
            </tr>
            </thead>
            <tbody>
            {links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Open</Link>
                        </td>
                    </tr>
                )
            })}

            </tbody>
        </table>
    )
}
