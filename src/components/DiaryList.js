import React from "react";

function DiaryList({ entries, onEdit, onDelete }) {
    return (
        <table className="table table-striped mt-4">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>날짜</th>
                    <th>날씨</th>
                    <th>관리</th>
                </tr>
            </thead>
            <tbody>
                {entries.map((entry, index) => (
                    <tr key={entry.id}>
                        <td>{index + 1}</td>
                        <td>{entry.title}</td>
                        <td>{entry.content}</td>
                        <td>{entry.date}</td>
                        <td>{entry.weather}</td>
                        <td>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => onEdit(entry)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => onDelete(entry.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DiaryList;
