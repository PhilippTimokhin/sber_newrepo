import React from "react";

interface AlertProps {
    onDelete(id: number): void;
    id: number;
    title: string;
    close: () => void;
}
const AlertDialog: React.FunctionComponent<AlertProps> = ({onDelete, id, title, close}) => {
    return (
        <div className="showModal">
            <span className="showModal__text">Are you sure u want to delete: {title}? 😭</span>
            <div className="showModal__buttons">
                <button
                    className="showModal__y"
                    onClick={() => {
                        onDelete(id);
                        close();
                    }}
                >
                    Yes
                </button>
                <button className="showModal__n" onClick={close}>
                    No
                </button>
            </div>
        </div>
    );
};

export default AlertDialog;
