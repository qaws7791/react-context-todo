import { ReactNode, useCallback } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
interface openPopupProps {
  title: string;
  contents: ReactNode;
  type?: "alert" | "confirm";
}

const usePopup = () => {
  const createContainer = useCallback(() => {
    const container = document.getElementById("popupContainer");
    if (container) return container;
    const containerDiv = document.createElement("div");
    containerDiv.id = "popupContainer";
    document.body.appendChild(containerDiv);
    return containerDiv;
  }, []);

  const openPopup = useCallback(
    ({ title, contents, type = "alert" }: openPopupProps) => {
      const root = createRoot(createContainer());
      return new Promise<boolean>((resolve) => {
        const handleConfirm = () => {
          root.unmount();
          resolve(true);
        };

        const handleCancel = () => {
          root.unmount();
          resolve(false);
        };
        root.render(
          <div>
            <div className="popup-bg" onClick={handleCancel}></div>
            <div className="popup">
              <h2 className="popup-title">{title}</h2>
              <div className="popup-contents">{contents}</div>
              <div className="popup-btns">
                {type === "confirm" && (
                  <button className="popup-btn" onClick={handleCancel}>
                    취소
                  </button>
                )}
                <button
                  className="popup-btn popup-btn--fill"
                  onClick={handleConfirm}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        );
      });
    },
    [createContainer]
  );

  return [openPopup] as const;
};

export default usePopup;
