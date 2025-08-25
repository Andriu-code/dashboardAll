import React, { useState, useEffect } from "react";
import "./ModalForm.sass";

type Field = {
    name: string;
    label: string;
    type?: "text" | "number" | "select" | "textarea";
    options?: string[];
};

type ModalFormProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Record<string, unknown>) => void;
    title: string;
    fields: Field[];
    initialData?: Record<string, unknown>;
};

const ModalForm: React.FC<ModalFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    fields,
    initialData = {},
}) => {
    const [formData, setFormData] = useState<Record<string, string>>(
        (initialData as Record<string, string>) || {}
    );

    useEffect(() => {
        setFormData((initialData as Record<string, string>) || {});
    }, [initialData]);

    const handleChange = (name: string, value: string) => {
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
                            <label htmlFor={field.name}>{field.label}</label>

                            {field.type === "select" ? (
                                <select
                                    id={field.name}
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
                                    id={field.name}
                                    value={formData[field.name] || ""}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                />
                            ) : (
                                <input
                                    id={field.name}
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
