import React, { useState, useEffect } from "react";
import "./ModalForm.sass";

type Field = {
    name: string;
    label: string;
    type?: "text" | "number" | "select" | "textarea";
    options?: string[]; // para selects
};

type ModalFormProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Record<string, any>) => void;
    title: string;
    fields: Field[];
    initialData?: Record<string, any>;
};

const ModalForm: React.FC<ModalFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    fields,
    initialData = {},
}) => {
    const [formData, setFormData] = useState<Record<string, any>>(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (name: string, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="modalCard">
                <h2>{title}</h2>
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div className="formGroup" key={field.name}>
                            <label>{field.label}</label>
                            {field.type === "select" ? (
                                <select
                                    value={formData[field.name] || ""}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                >
                                    <option value="">Seleccione</option>
                                    {field.options?.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            ) : field.type === "textarea" ? (
                                <textarea
                                    value={formData[field.name] || ""}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                />
                            ) : (
                                <input
                                    type={field.type || "text"}
                                    value={formData[field.name] || ""}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                />
                            )}
                        </div>
                    ))}
                    <div className="buttons">
                        <button type="submit" className="submitBtn">
                            Guardar
                        </button>
                        <button type="button" className="cancelBtn" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;
