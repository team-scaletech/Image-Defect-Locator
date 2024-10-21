import { FC, useState } from "react";
import { Defect, ImageData } from "src/ImageDefectLocator";

interface DefectLocatorProps {
    imageValue: ImageData;
    addDefect: (defect: Defect) => void;
    customClass: string;
    isMarker: boolean;
}
const DentMarker: FC<DefectLocatorProps> = ({ imageValue, addDefect, customClass, isMarker }) => {
    const [hoveredDentIndex, setHoveredDentIndex] = useState<number | null>(null);

    const handleClick = (e: any) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position relative to the image
        const y = e.clientY - rect.top; // y position relative to the image

        // Prompt user for custom text
        const dentText = prompt("Enter description for the dent:") || "No description";

        // Add the dent with custom text
        const newDefect = { x, y, note: dentText };

        addDefect(newDefect);
    };

    const handleMouseEnter = (index: number) => {
        setHoveredDentIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredDentIndex(null);
    };

    return (
        <div style={{ position: "relative" }} className={customClass}>
            {imageValue.src ? (
                <img
                    src={imageValue.src}
                    alt="Dent marker"
                    style={{ width: "800px", height: "600px" }}
                    onClick={isMarker ? handleClick : undefined}
                />
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="256" height="256" viewBox="0 0 256 256">
                    <defs></defs>
                    <g
                        style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1
                        }}
                        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                    >
                        <path
                            d="M 74.453 48.627 c -5.538 0 -11.075 -2.107 -15.291 -6.324 c -6.11 -6.11 -7.768 -14.99 -5.024 -22.629 H 25.502 H 6.058 C 2.712 19.675 0 22.387 0 25.733 v 16.322 L 23.834 62.37 c 2.278 1.942 5.573 2.119 8.047 0.434 l 14.382 -9.801 c 2.33 -1.588 5.408 -1.531 7.677 0.141 l 27.15 20.001 V 47.865 v -0.294 C 78.934 48.263 76.696 48.627 74.453 48.627 z"
                            style={{
                                stroke: "none",
                                strokeWidth: 1,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "rgb(193,229,244)",
                                fillRule: "nonzero",
                                opacity: 1
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                        />
                        <circle
                            cx="27.942"
                            cy="37.942"
                            r="6.072"
                            style={{
                                stroke: "none",
                                strokeWidth: 1,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "rgb(255,240,169)",
                                fillRule: "nonzero",
                                opacity: 1
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                        />
                        <path
                            d="M 85.446 16.02 c -6.061 -6.061 -15.922 -6.061 -21.983 0 s -6.061 15.923 0 21.984 c 3.031 3.031 7.011 4.546 10.992 4.546 c 3.98 0 7.962 -1.515 10.992 -4.545 C 88.383 35.068 90 31.164 90 27.012 C 90 22.86 88.383 18.956 85.446 16.02 z M 81.891 19.575 c 1.987 1.986 3.081 4.627 3.081 7.436 c 0 1.95 -0.538 3.813 -1.525 5.438 L 69.019 18.021 C 73.062 15.579 78.403 16.087 81.891 19.575 z M 67.018 34.449 c -3.486 -3.487 -3.997 -8.829 -1.554 -12.873 L 79.89 36.003 C 75.847 38.446 70.505 37.935 67.018 34.449 z"
                            style={{
                                stroke: "none",
                                strokeWidth: 1,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "rgb(226,147,147)",
                                fillRule: "nonzero",
                                opacity: 1
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                        />
                        <path
                            d="M 0 40.043 v 32.425 c 0 3.346 2.712 6.058 6.058 6.058 h 68.974 c 3.346 0 6.058 -2.712 6.058 -6.058 v -1.335 L 53.94 51.132 c -2.27 -1.672 -5.348 -1.729 -7.677 -0.141 L 31.88 60.792 c -2.473 1.686 -5.769 1.508 -8.047 -0.434 L 0 40.043 z"
                            style={{
                                stroke: "none",
                                strokeWidth: 1,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "rgb(150,234,156)",
                                fillRule: "nonzero",
                                opacity: 1
                            }}
                            transform=" matrix(1 0 0 1 0 0) "
                            strokeLinecap="round"
                        />
                    </g>
                </svg>
            )}
            {/* Overlay the icons as HTML elements */}
            {imageValue.defects &&
                imageValue.defects.map((dent: { x: number; y: number }, index: number) => (
                    <div
                        key={index}
                        className="defect-marker"
                        style={{
                            position: "absolute",
                            left: `${dent.x - 12}px`, // Adjust to center the icon
                            top: `${dent.y - 12}px` // Adjust to center the icon
                        }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="circle pulse defect-icon ">
                            <h2 className="exclamation-icon">!</h2>
                        </div>
                    </div>
                ))}
            {imageValue.defects &&
                imageValue.defects.map(
                    (
                        dent: {
                            note: string;
                            x: number;
                            y: number;
                        },
                        index: number
                    ) => {
                        // Measure the width of the note text
                        const textWidth = dent.note.length * 8; // Estimate width based on character length
                        const boxWidth = Math.min(Math.max(textWidth + 20, 150), 200); // Limit the width
                        const boxHeight = 100; // Fixed height or calculate based on text

                        const boxX = dent.x + 6;
                        const boxY = dent.y - boxHeight;

                        const adjustedX = Math.min(Math.max(boxX, 0), 800 - boxWidth);
                        const adjustedY = Math.min(Math.max(boxY, 0), 600 - boxHeight);

                        return (
                            <div key={index}>
                                {hoveredDentIndex === index && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: adjustedX,
                                            top: adjustedY,
                                            width: boxWidth,
                                            height: boxHeight
                                        }}
                                        className="defect-marker-description"
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className="marker-description-wrapper">
                                            <p className="marker-description">{dent.note}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    }
                )}
        </div>
    );
};

export default DentMarker;
