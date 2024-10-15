import { FC } from "react";
import DentMarker from "./dentmark";
import { Defect, ImageData } from "src/ImageDefectLocator";

interface DefectLocatorProps {
    imageValue?: ImageData;
    addDefectToImage?: (defect: Defect) => void;
    customClass?: string;
}

const DefectLocatImage: FC<DefectLocatorProps> = ({ imageValue, addDefectToImage, customClass }) => {
    const handleAddDefect = addDefectToImage || (() => {});
    return (
        <div className="image-defect-locator">
            {/* Display the main image and defects if an image is selected */}
            {imageValue && (
                <div className="image-container">
                    <DentMarker imageValue={imageValue} addDefect={handleAddDefect} customClass={customClass || ""} />
                </div>
            )}
        </div>
    );
};

export default DefectLocatImage;
