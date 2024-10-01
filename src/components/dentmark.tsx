import { useState } from "react";

const DentMarker = (props: any) => {
    const [hoveredDentIndex, setHoveredDentIndex] = useState<number | null>(null);

    const handleClick = (e: any) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position relative to the image
        const y = e.clientY - rect.top; // y position relative to the image

        // Prompt user for custom text
        const dentText = prompt("Enter description for the dent:") || "No description";

        // Add the dent with custom text
        const newDefect = { x, y, note: dentText };
        props.addDefect(newDefect);
    };

    const handleMouseEnter = (index: number) => {
        setHoveredDentIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredDentIndex(null);
    };

    return (
        <div style={{ position: "relative" }}>
            <img src={props.src} alt="Dent marker" style={{ width: "800px", height: "600px" }} onClick={handleClick} />
            {/* Overlay the icons as HTML elements */}
            {props.defects.map((dent: { x: number; y: number }, index: number) => (
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
            {props.defects.map(
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

                    const boxX = dent.x + 10;
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
