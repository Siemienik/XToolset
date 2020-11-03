import React from 'react';

// https://tachyons.io/components/tables/basic/index.html
export default function Table(props) {
    return (
        <div className="pa0 pv4 pa4-ns">
            <div className="overflow-auto">
                <table className="f6 w-100 mw8 center" cellSpacing="0">
                    {props.children}
                </table>
            </div>
        </div>
    );
}

export function THead(props) {
    return (
        <thead>
            <tr>{props.children}</tr>
        </thead>
    );
}

export function THeadItem(props) {
    return <th className="fw6 bb b--light-gray tl pb3 pr3">{props.children}</th>;
}

export function TBody(props) {
    return <tbody className="lh-copy">{props.children}</tbody>;
}

export function TBodyRow(props) {
    return <tr data-qa-name={props.dataQaName}>{props.children}</tr>;
}

export function TBodyItem(props) {
    return (
        <td className="pv3 pr3 bb b--light-gray" data-qa-name={props.dataQaName}>
            {props.children}
        </td>
    );
}
