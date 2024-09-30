import { Key, useState } from "react";
// import Konva from "konva"; // Import Konva directly
// import { Stage, Layer, Image as KonvaImage } from "react-konva";
// import useImage from "use-image";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faExclamation } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon

const DentMarker = (props: any) => {
    // const [image] = useImage(props.src); // Use image path from props
    const [image] = props.src;
    const [hoveredDentIndex, setHoveredDentIndex] = useState<number | null>(null);

    const handleClick = (e: any) => {
        const stage = e.target.getStage();
        const pointerPosition = stage.getPointerPosition();

        // Prompt user for custom text
        const dentText = prompt("Enter description for the dent:") || "No description";

        // Add the dent with custom text
        const newDefect = { ...pointerPosition, note: dentText };
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
            {/* Konva Stage */}
            {/* <Stage width={800} height={600} onClick={handleClick} style={{ position: "relative" }}>
                <Layer>
                    <KonvaImage image={image} width={800} height={600} />
                </Layer>
            </Stage> */}
            <div style={{ width: "800px", height: "600px", position: "relative" }} onClick={handleClick}>
                <div>
                    <img src={image as any} style={{ width: "800px", height: "600px" }} />
                </div>
            </div>

            {/* Overlay the icons as HTML elements */}
            {props.defects.map((dent: { x: number; y: number }, index: number) => (
                <div
                    key={index}
                    className="defect-marker"
                    style={{
                        position: "absolute",
                        left: `${dent.x - 12}px`, // Adjust to center the icon
                        top: `${dent.y - 12}px` // Adjust to center the icon // Ensure it appears above the canvas
                    }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="circle pulse defect-icon ">
                        {/* <FontAwesomeIcon icon={faExclamation} /> */}
                        <p>test</p>
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
                    index: Key
                ) => {
                    // const tempText = new Konva.Text({
                    //     text: dent.note,
                    //     fontSize: 12,
                    //     width: 150, // Max width for wrapping text
                    //     padding: 10,
                    //     wrap: "word"
                    // });

                    // const textHeight = tempText.getHeight();
                    const textWidth = 100;
                    const boxWidth = Math.max(textWidth + 20, 150); // Ensure a minimum width
                    const boxHeight = 100; // Adjust height based on text content

                    const boxX = dent.x + 10; // Adjust x for padding
                    const boxY = dent.y - boxHeight - 10; // Adjust y for text above the dent

                    // Calculate adjusted positions to prevent overflow
                    const adjustedX = Math.min(Math.max(boxX, 0), 800 - boxWidth);
                    const adjustedY = Math.min(Math.max(boxY, 0), 600 - boxHeight);

                    return (
                        <div key={index}>
                            {hoveredDentIndex === index && (
                                <div
                                    style={{
                                        position: "absolute",
                                        left: adjustedX,
                                        top: adjustedY
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
