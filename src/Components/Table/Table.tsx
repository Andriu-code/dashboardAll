import React from "react";
import "./Table.sass"

type Column = {
    key: string;
    label: string;
};

type Row<T = Record<string, string | number>> = T;

type TableProps<T = Row> = {
    columns: Column[];
    data: T[];
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
};

const Table = <T extends Row>({ columns, data, onView, onEdit, onDelete }: TableProps<T>) => {
    return (
        <div className="tableWrapper">
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {columns.map((col) => (
                                <td key={col.key}>
                                    {col.key === "status" ? (
                                        <span className={`${"status"} ${[row[col.key]]}`}>
                                            {row[col.key]}
                                        </span>
                                    ) : (
                                        row[col.key]
                                    )}
                                </td>
                            ))}
                            <td>
                                {onView && (
                                    <button
                                        className="viewBtn"
                                        onClick={() => onView(row)}
                                    >
                                        Ver
                                    </button>
                                )}
                                {onEdit && (
                                    <button
                                        className="editBtn"
                                        onClick={() => onEdit(row)}
                                    >
                                        Editar
                                    </button>
                                )}
                                {onDelete && (
                                    <button
                                        className="deleteBtn"
                                        onClick={() => onDelete(row)}
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
