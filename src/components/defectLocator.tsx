import { CSSProperties, FC } from "react";
import DentMarker from "./dentmark";
import { Defect, ImageData } from "src/ImageDefectLocator";

interface DefectLocatorProps {
    imageValue?: ImageData;
    addDefectToImage?: (defect: Defect) => void;
    customClass?: string;
    style?: CSSProperties;
    isMarker?: boolean;
}

const DefectLocatImage: FC<DefectLocatorProps> = ({ imageValue, addDefectToImage, customClass, style, isMarker }) => {
    const handleAddDefect = addDefectToImage || (() => {});
    return (
        <div className="image-defect-locator" style={style}>
            {/* Display the main image and defects if an image is selected */}
            {imageValue && (
                <div className="image-container">
                    <DentMarker
                        imageValue={imageValue}
                        addDefect={handleAddDefect}
                        customClass={customClass || ""}
                        isMarker={isMarker || false}
                    />
                </div>
            )}
        </div>
    );
};

export default DefectLocatImage;
