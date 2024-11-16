import React, { useState, useEffect } from "react";
import DiaryFormModal from "./DiaryFormModal";
import DiaryList from "./DiaryList";
import "./App.css";

const API_URL = "https://672d8ee1fd8979715642c8e9.mockapi.io/diary";

function App() {
    const [diaryEntries, setDiaryEntries] = useState([]);
    const [editingEntry, setEditingEntry] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // 데이터 불러오기
    useEffect(() => {
        fetchDiaryEntries();
    }, []);

    const fetchDiaryEntries = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setDiaryEntries(data);
        } catch (error) {
            console.error("Failed to fetch diary entries:", error);
        }
    };

    const handleAddOrUpdate = async (entry) => {
        try {
            if (entry.id) {
                // Update
                await fetch(`${API_URL}/${entry.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(entry),
                });
            } else {
                // Add
                await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(entry),
                });
            }
            fetchDiaryEntries();
            setShowModal(false); // 모달 닫기
        } catch (error) {
            console.error("Failed to add or update diary entry:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("이 일기를 삭제하시겠습니까?")) return;
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            fetchDiaryEntries();
        } catch (error) {
            console.error("Failed to delete diary entry:", error);
        }
    };

    return (
        <div className="container">
            <h2>
                <b>
                    <span style={{ fontSize: "100px" }}>📒</span> Daily Diary
                </b>
            </h2>
            <button
                className="btn btn-primary mb-3"
                onClick={() => {
                    setEditingEntry(null); // 새 데이터 추가 모드
                    setShowModal(true);
                }}
            >
                새 일기 추가
            </button>
            <DiaryList
                entries={diaryEntries}
                onEdit={(entry) => {
                    setEditingEntry(entry); // 수정할 데이터 설정
                    setShowModal(true); // 모달 열기
                }}
                onDelete={handleDelete}
            />
            <DiaryFormModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleAddOrUpdate}
                editingEntry={editingEntry}
            />
        </div>
    );
}

export default App;
