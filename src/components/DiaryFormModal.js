import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function DiaryFormModal({ show, onClose, onSubmit, editingEntry }) {
    const [formState, setFormState] = useState({
        id: "",
        title: "",
        content: "",
        date: "",
        day: "",
        weather: "",
    });

    useEffect(() => {
        if (editingEntry) {
            setFormState(editingEntry);
        } else {
            clearForm();
        }
    }, [editingEntry]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formState);
    };

    const clearForm = () => {
        setFormState({
            id: "",
            title: "",
            content: "",
            date: "",
            day: "",
            weather: "",
        });
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{formState.id ? "일기 수정" : "새 일기 추가"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>제목:</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={formState.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>내용:</label>
                        <textarea
                            name="content"
                            className="form-control"
                            value={formState.content}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>날짜:</label>
                        <input
                            type="date"
                            name="date"
                            className="form-control"
                            value={formState.date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>날씨:</label>
                        <input
                            type="text"
                            name="weather"
                            className="form-control"
                            value={formState.weather}
                            onChange={handleChange}
                        />
                    </div>
                    <Button variant="primary" type="submit">
                        {formState.id ? "수정" : "추가"}
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default DiaryFormModal;
