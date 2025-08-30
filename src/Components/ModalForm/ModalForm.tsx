import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./ModalForm.sass";

type Field = {
    name: string;
    label: string;
    type?: "text" | "number" | "select" | "textarea" | "file";
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
    const { handleSubmit, control, reset, watch } = useForm({
        defaultValues: initialData,
    });

    const [preview, setPreview] = useState<Record<string, string>>({});

    const watchedFiles = watch(); // ver los cambios en los inputs

    // Reseteamos el formulario cuando cambie initialData
    useEffect(() => {
        reset(initialData);
    }, [initialData, reset]);

    // Actualizar previsualización de imágenes
    useEffect(() => {
        const newPreview: Record<string, string> = {};
        fields.forEach((field) => {
            if (field.type === "file" && watchedFiles[field.name]) {
                const file = watchedFiles[field.name] as File;
                newPreview[field.name] = URL.createObjectURL(file);
            }
        });
        setPreview(newPreview);

        // Limpiar URLs al desmontar o cambiar archivo
        return () => {
            Object.values(newPreview).forEach((url) => URL.revokeObjectURL(url));
        };
    }, [watchedFiles, fields]);

    const submitHandler = (data: Record<string, unknown>) => {
        // data[field.name] -> File para campos de tipo file
        onSubmit(data);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="modalCard">
                <h2>{title}</h2>
                <form onSubmit={handleSubmit(submitHandler)}>
                    {fields.map((field) => (
                        <div className="formGroup" key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>

                            <Controller
                                name={field.name}
                                control={control}
                                defaultValue={initialData[field.name] || ""}
                                render={({ field: controllerField }) => {
                                    if (field.type === "select") {
                                        return (
                                            <select {...controllerField} id={field.name} value={controllerField.value as string}>
                                                <option value="">Seleccione</option>
                                                {field.options?.map((opt) => (
                                                    <option key={opt} value={opt}>
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                        );
                                    }

                                    if (field.type === "textarea") {
                                        return (
                                            <textarea
                                                {...controllerField}
                                                id={field.name}
                                                value={controllerField.value as string}
                                            />
                                        );
                                    }

                                    if (field.type === "file") {
                                        return (
                                            <>
                                                <input
                                                    type="file"
                                                    id={field.name}
                                                    accept="image/*"
                                                    onChange={(e) => controllerField.onChange(e.target.files?.[0])}
                                                />
                                                {preview[field.name] && (
                                                    <img
                                                        src={preview[field.name]}
                                                        alt="Preview"
                                                        style={{ marginTop: "0.5rem", maxHeight: "150px", borderRadius: "8px" }}
                                                    />
                                                )}
                                            </>
                                        );
                                    }

                                    return <input {...controllerField} id={field.name} value={controllerField.value as string} />;
                                }}
                            />
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
